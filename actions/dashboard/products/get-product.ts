'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import { unstable_noStore as noStore } from 'next/cache';

export async function getProduct(id: string) {
  noStore();
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) {
    return null;
  }
  return JSON.parse(JSON.stringify(product));
}
