'use server';

import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import Product from '@/models/product';
import mongoose from 'mongoose';
import { TOrder } from '@/types/order';
import { unstable_noStore as noStore } from 'next/cache';

export async function createOrder(input: {
  username: string;
  amount: number;
  productIds: string[];
}) {
  noStore();
  await connectDB();
  if (!input.username || !(input.amount >= 0)) {
    return { ok: false, error: 'invalid order payload' } as const;
  }
  if (!Array.isArray(input.productIds) || input.productIds.length === 0) {
    return { ok: false, error: 'no products to purchase' } as const;
  }

  const session = await mongoose.startSession();
  let created: (TOrder & { _id: any }) | null = null;
  await session.withTransaction(async () => {
    for (const productId of input.productIds) {
      const res = await Product.updateOne(
        { _id: productId, stock: { $gt: 0 } },
        { $inc: { stock: -1 } },
        { session },
      );
      if (res.modifiedCount === 0) {
        throw new Error('insufficient stock');
      }
    }
    const arr = await Order.create(
      [
        {
          username: input.username,
          amount: input.amount,
        },
      ],
      { session },
    );
    created = arr[0] as any;
  });
  await session.endSession();
  if (!created) {
    return { ok: false, error: 'order creation failed' } as const;
  }
  type CreatedOrder = {
    _id: any;
    username: string;
    amount: number;
    createdAt: Date;
  };
  const c = created as unknown as CreatedOrder;
  return {
    ok: true,
    order: {
      _id: String(c._id),
      username: c.username,
      amount: c.amount,
      createdAt: c.createdAt,
    },
    message: 'payment successful and order stored',
  } as const;
}
