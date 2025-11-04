'use server';

import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import { unstable_noStore as noStore } from 'next/cache';

export type ListedOrder = {
  _id: string;
  username: string;
  amount: number;
  createdAt: string;
};

export async function getOrders(): Promise<ListedOrder[]> {
  noStore();
  await connectDB();
  const orders = await Order.find({}, { username: 1, amount: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(orders));
}
