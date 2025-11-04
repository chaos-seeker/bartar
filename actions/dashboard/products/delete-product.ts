'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';

export async function deleteProduct(id: string) {
  await connectDB();
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return {
      error: 'Product not found',
    };
  }
  return {
    message: 'Product deleted successfully',
  };
}
