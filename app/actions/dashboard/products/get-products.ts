import Product from '@/models/product';
import connectDB from '@/lib/mongodb';
import { TProduct } from '@/types/product';

export interface GetProductsResponse {
  data: TProduct[];
}

export async function getProducts(): Promise<GetProductsResponse> {
  await connectDB();
  const products = (await Product.find()) as TProduct[];
  return { data: products };
}
