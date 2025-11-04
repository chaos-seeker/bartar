'use server';

import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { unstable_noStore as noStore } from 'next/cache';

export type ListedUser = {
  _id: string;
  username: string;
  createdAt: string;
};

export async function getUsers(): Promise<ListedUser[]> {
  noStore();
  await connectDB();
  const users = await User.find({}, { username: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(users));
}
