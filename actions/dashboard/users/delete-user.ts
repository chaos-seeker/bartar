'use server';

import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { unstable_noStore as noStore } from 'next/cache';

export async function deleteUser(
  id: string,
): Promise<{ message?: string; error?: string }> {
  noStore();
  await connectDB();
  await User.findByIdAndDelete(id);
  return { message: 'user deleted successfully' };
}
