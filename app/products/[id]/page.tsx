import { getProduct } from "@/actions/dashboard/products/get-product";
import { Product } from "@/containers/product/product";
import { SimilarItems } from "@/containers/product/similar.-items";

interface Params {
  id: string;
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <>
      <Product product={product} />
      <SimilarItems />
    </>
  );
}
