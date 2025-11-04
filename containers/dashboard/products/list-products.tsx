'use client';

import { getProducts } from '@/actions/dashboard/products/get-products';
import { cn } from '@/utils/cn';
import { TProduct } from '@/types/product';
import { useModal } from '@/hooks/modal';
import { useQueryState } from 'nuqs';
import { Edit, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/loading';

export const ListProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <section className={cn('container')}>
        <div className={cn('flex items-center justify-center p-8')}>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className={cn('container')}>
      <ProductsTable products={products} />
    </section>
  );
};

interface ProductsTableProps {
  products: TProduct[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  if (products.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-gray-200 bg-gray-50 p-8 text-center',
        )}
      >
        <p className={cn('text-gray-500')}>
          No products found. Add your first product!
        </p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto border border-gray-200')}>
      <table className={cn('w-full border-collapse')}>
        <thead>
          <tr className={cn('bg-gray-50')}>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
              )}
            >
              Image
            </th>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
              )}
            >
              Title
            </th>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
              )}
            >
              Price
            </th>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
              )}
            >
              Discount
            </th>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
              )}
            >
              Stock
            </th>
            <th
              className={cn(
                'border-b border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700',
              )}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={cn('transition-colors hover:bg-gray-50')}
            >
              <td
                className={cn(
                  'px-4 py-3',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                <div
                  className={cn(
                    'relative h-16 w-16 overflow-hidden rounded-lg',
                  )}
                >
                  <img
                    src={product.image!}
                    alt={product.title}
                    className={cn('h-full w-full object-cover')}
                  />
                </div>
              </td>
              <td
                className={cn(
                  'px-4 py-3 text-sm text-gray-900',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                {product.title}
              </td>
              <td
                className={cn(
                  'px-4 py-3 text-sm text-gray-900',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                {product.price.toLocaleString()}$
              </td>
              <td
                className={cn(
                  'px-4 py-3 text-sm text-gray-900',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                {product.discount ? `${product.discount}%` : '-'}
              </td>
              <td
                className={cn(
                  'px-4 py-3 text-sm text-gray-900',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                {product.stock}
              </td>
              <td
                className={cn(
                  'px-4 py-3',
                  index !== products.length - 1 && 'border-b border-gray-200',
                )}
              >
                <div className={cn('flex items-center justify-center gap-2')}>
                  <EditProductButton productId={product._id} />
                  <button
                    className={cn(
                      'rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50',
                    )}
                    aria-label="Delete product"
                  >
                    <Trash2 className={cn('h-5 w-5')} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface EditProductButtonProps {
  productId: string;
}

const EditProductButton = ({ productId }: EditProductButtonProps) => {
  const modalEditProduct = useModal('edit-product');
  const [, setProductId] = useQueryState('productId');

  const handleClick = () => {
    setProductId(productId);
    modalEditProduct.show();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50',
      )}
      aria-label="Edit product"
    >
      <Edit className={cn('h-5 w-5')} />
    </button>
  );
};
