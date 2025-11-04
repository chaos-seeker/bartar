'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';

export async function getProduct(id: string) {
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) {
    return null;
  }
  return JSON.parse(JSON.stringify(product));
}
