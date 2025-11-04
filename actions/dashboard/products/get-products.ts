'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import { TProduct } from '@/types/product';
import { unstable_noStore as noStore } from 'next/cache';

export async function getProducts(): Promise<TProduct[]> {
  noStore();
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}
