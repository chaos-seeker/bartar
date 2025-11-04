'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import { TProduct } from '@/types/product';

export interface UpdateProductResponse {
  message: string;
  error?: string;
}

export async function updateProduct(
  id: string,
  params: Partial<TProduct>,
): Promise<UpdateProductResponse> {
  await connectDB();
  const updateData: any = {};
  if (params.title) updateData.title = params.title;
  if (params.price) updateData.price = parseFloat(params.price);
  if (params.discount !== undefined)
    updateData.discount = params.discount ? parseFloat(params.discount) : 0;
  if (params.stock) updateData.stock = parseInt(params.stock, 10);
  if (params.image) updateData.image = params.image;
  await Product.findByIdAndUpdate(id, updateData);
  return { message: 'product updated successfully' };
}
