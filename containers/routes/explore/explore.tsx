import { getProducts } from '@/actions/dashboard/products/get-products';
import { ProductCard } from '@/components/product-card';

export async function Explore() {
  const products = await getProducts();

  return (
    <section>
      <div className="container px-0">
        <div className="flex items-center justify-between border-b px-3 pb-6">
          <p className="text-lg font-bold">
            explore products ({products.length})
          </p>
        </div>
        <div className="container py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p) => (
              <div key={p._id}>
                <ProductCard {...(p as any)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
