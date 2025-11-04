'use client';

import { getProducts } from '@/actions/dashboard/products/get-products';
import { cn } from '@/utils/cn';
import { TProduct } from '@/types/product';
import { useModal } from '@/hooks/modal';
import { useQueryState } from 'nuqs';
import { Edit, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/loading';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type CellContext,
} from '@tanstack/react-table';

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

const columnHelper = createColumnHelper<TProduct>();

const ProductsTable = ({ products }: ProductsTableProps) => {
  const columns = [
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (info: CellContext<TProduct, string | null | undefined>) => (
        <div className={cn('relative h-16 w-16 overflow-hidden rounded-lg')}>
          <img
            src={info.getValue() || ''}
            alt={info.row.original.title}
            className={cn('h-full w-full object-cover')}
          />
        </div>
      ),
    }),
    columnHelper.accessor('title', {
      header: 'title',
      cell: (info: CellContext<TProduct, string>) => (
        <span className={cn('text-sm text-gray-900 whitespace-nowrap')}>{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('price', {
      header: 'price',
      cell: (info: CellContext<TProduct, number>) => (
        <span className={cn('text-sm text-gray-900')}>
          {info.getValue().toLocaleString()}$
        </span>
      ),
    }),
    columnHelper.accessor('discount', {
      header: 'discount',
      cell: (info: CellContext<TProduct, number | undefined>) => (
        <span className={cn('text-sm text-gray-900')}>
          {info.getValue() ? `${info.getValue()}%` : '—'}
        </span>
      ),
    }),
    columnHelper.accessor('stock', {
      header: 'stock',
      cell: (info: CellContext<TProduct, number>) => (
        <span className={cn('text-sm text-gray-900')}>{info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'actions',
      cell: (info: CellContext<TProduct, unknown>) => (
        <div className={cn('flex items-center justify-center gap-2')}>
          <EditProductButton productId={info.row.original._id} />
          <button
            className={cn(
              'rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50',
            )}
            aria-label="Delete product"
          >
            <Trash2 className={cn('h-5 w-5')} />
          </button>
        </div>
      ),
    }),
  ] as ColumnDef<TProduct>[];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={cn('bg-gray-50')}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700',
                    header.id === 'actions' && 'text-center',
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={cn(
                'transition-colors hover:bg-gray-50',
                index !== table.getRowModel().rows.length - 1 &&
                  'border-b border-gray-200',
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={cn('px-4 py-3')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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

const EditProductButton = (props: EditProductButtonProps) => {
  const modalEditProduct = useModal('edit-product');
  const [, setProductId] = useQueryState('productId');
  const handleClick = () => {
    setProductId(props.productId);
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
