'use server';

import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

function buildPasswordHash(password: string, salt?: string) {
  const saltBuf = salt ? Buffer.from(salt, 'hex') : randomBytes(16);
  return scrypt(password, saltBuf, 64).then((buf) => ({
    salt: saltBuf.toString('hex'),
    hash: (buf as Buffer).toString('hex'),
  }));
}

function verifyPassword(stored: string, password: string) {
  const [saltHex, hashHex] = stored.split(':');
  return buildPasswordHash(password, saltHex).then(({ hash }) => {
    const a = Buffer.from(hashHex, 'hex');
    const b = Buffer.from(hash, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

export async function loginOrRegister(input: {
  username: string;
  password: string;
}) {
  const username = input.username.trim();
  const password = input.password;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  await connectDB();

  const existing = await User.findOne({ username });
  if (!existing) {
    const { salt, hash } = await buildPasswordHash(password);
    const user = await User.create({ username, password: `${salt}:${hash}` });
    return {
      ok: true,
      status: 'registered' as const,
      user: { _id: String(user._id), username: user.username },
    };
  }

  const isValid = await verifyPassword(existing.password, password);
  if (!isValid) {
    return { error: 'invalid password' };
  }

  return {
    ok: true,
    status: 'logged_in' as const,
    user: { _id: String(existing._id), username: existing.username },
  };
}
