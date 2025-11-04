'use server';

import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import { unstable_noStore as noStore } from 'next/cache';

export async function resetOrders() {
  noStore();
  await connectDB();
  await Order.deleteMany({});
  return { ok: true, message: 'orders collection cleared' } as const;
}
