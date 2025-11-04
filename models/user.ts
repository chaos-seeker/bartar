'use strict';
import { Schema, models, model } from 'mongoose';
import { TUser } from '@/types/user';

const UserSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = models.User || model<TUser>('User', UserSchema);

export default User;
