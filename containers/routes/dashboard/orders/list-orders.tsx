'use client';

import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { getOrders, type ListedOrder } from '@/actions/orders/get-orders';
import { Loading } from '@/components/loading';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type CellContext,
} from '@tanstack/react-table';
import Image from 'next/image';
// orders table uses the ListedOrder shape returned by the action

export const ListOrders = () => {
  const orders = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (orders.isLoading) {
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
      <OrdersTable orders={(orders.data ?? []) as ListedOrder[]} />
    </section>
  );
};

interface OrdersTableProps {
  orders: ListedOrder[];
}

const columnHelper = createColumnHelper<ListedOrder>();

const OrdersTable = (props: OrdersTableProps) => {
  const columns = [
    columnHelper.accessor('_id', {
      header: 'order id',
      cell: (info: CellContext<ListedOrder, string>) => (
        <span className={cn('text-sm text-gray-900')}>{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('username', {
      header: 'username',
      cell: (info: CellContext<ListedOrder, string>) => (
        <span className={cn('text-sm whitespace-nowrap text-gray-900')}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'amount',
      cell: (info: CellContext<ListedOrder, number>) => (
        <span className={cn('text-sm text-gray-900')}>{info.getValue()}$</span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: 'created at',
      cell: (info: CellContext<ListedOrder, string>) => (
        <span className={cn('text-sm text-gray-900')}>
          {new Date(info.getValue()).toLocaleString()}
        </span>
      ),
    }),
  ] as ColumnDef<ListedOrder>[];

  const table = useReactTable({
    data: props.orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (props.orders.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 p-8 text-center',
        )}
      >
        <Image
          src="/images/global/not-found.png"
          alt="No orders found"
          width={200}
          height={200}
        />
        <p className={cn('text-gray-500')}>No orders found.</p>
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
