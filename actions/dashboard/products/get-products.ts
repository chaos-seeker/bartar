'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';

export async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return [];
  }
}
