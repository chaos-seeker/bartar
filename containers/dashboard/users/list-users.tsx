'use client';

import { cn } from '@/utils/cn';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '@/actions/dashboard/users/get-users';
import { deleteUser } from '@/actions/dashboard/users/delete-user';
import { Loading } from '@/components/loading';
import { toast } from 'react-hot-toast';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type CellContext,
} from '@tanstack/react-table';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export const ListUsers = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (users.isLoading) {
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
      <UsersTable users={users.data ?? []} />
    </section>
  );
};

type ListedUser = { _id: string; username: string; createdAt: string };

interface UsersTableProps {
  users: ListedUser[];
}

const columnHelper = createColumnHelper<ListedUser>();

const UsersTable = (props: UsersTableProps) => {
  const columns = [
    columnHelper.accessor('username', {
      header: 'username',
      cell: (info: CellContext<ListedUser, string>) => (
        <span className={cn('text-sm whitespace-nowrap text-gray-900')}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: 'created at',
      cell: (info: CellContext<ListedUser, string>) => (
        <span className={cn('text-sm text-gray-900')}>
          {new Date(info.getValue()).toLocaleString()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'actions',
      cell: (info: CellContext<ListedUser, unknown>) => (
        <div className={cn('flex items-center justify-center gap-2')}>
          <DeleteUserButton userId={info.row.original._id} />
        </div>
      ),
    }),
  ] as ColumnDef<ListedUser>[];

  const table = useReactTable({
    data: props.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (props.users.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 p-8 text-center',
        )}
      >
        <Image
          src="/images/global/not-found.png"
          alt="No users found"
          width={200}
          height={200}
        />
        <p className={cn('text-gray-500')}>No users found.</p>
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

interface DeleteUserButtonProps {
  userId: string;
}

const DeleteUserButton = (props: DeleteUserButtonProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message as string);
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || 'failed to delete user');
    },
  });

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      mutation.mutate(props.userId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className={cn(
        'rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50',
      )}
      aria-label="Delete user"
    >
      {mutation.isPending ? (
        <Loading
          className={cn('[&_span]:bg-error h-5 w-5 [&_span]:size-2.5')}
        />
      ) : (
        <Trash2 className={cn('h-5 w-5')} />
      )}
    </button>
  );
};
