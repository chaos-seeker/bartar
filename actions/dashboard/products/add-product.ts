'use server';

import connectDB from '@/lib/mongodb';
import Product from '@/models/product';
import { TProduct } from '@/types/product';

export interface AddProductResponse {
  message: string;
  error?: string;
}

export async function addProduct(
  params: TProduct,
): Promise<AddProductResponse> {
  await connectDB();
  const product = new Product({
    title: params.title,
    price: parseFloat(params.price),
    discount: params.discount ? parseFloat(params.discount) : 0,
    stock: parseInt(params.stock, 10),
    image: params.image,
  });
  await product.save();
  return { message: 'product created successfully' };
}
