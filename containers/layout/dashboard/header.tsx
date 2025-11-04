'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header>
      <div className="container flex justify-end lg:justify-between gap-4 border-b py-5 lg:flex-row">
        <div className="border-primary border px-0.5 py-3 hidden lg:block">
          <Link
            href="/dashboard/products"
            className={cn(
              'm-1 px-4 py-2 whitespace-nowrap text-white',
              pathname === '/dashboard/products'
                ? 'bg-primary text-white'
                : 'text-primary bg-transparent',
            )}
          >
            products
          </Link>
          <Link
            href="/dashboard/users"
            className={cn(
              'm-1 px-4 py-2 whitespace-nowrap text-white',
              pathname === '/dashboard/users'
                ? 'bg-primary text-white'
                : 'text-primary bg-transparent',
            )}
          >
            users
          </Link>
          <Link
            href="/dashboard/orders"
            className={cn(
              'm-1 px-4 py-2 whitespace-nowrap text-white',
              pathname === '/dashboard/orders'
                ? 'bg-primary text-white'
                : 'text-primary bg-transparent',
            )}
          >
            orders
          </Link>
        </div>
        <AddProduct />
      </div>
    </header>
  );
}

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/layout/header-logo.png"
        alt="logo"
        width={100}
        height={100}
      />
    </Link>
  );
};

const AddProduct = () => {
  const modalAddProduct = useModal('add-product');
  const handleAddProduct = () => {
    modalAddProduct.show();
  };

  return (
    <button
      className="bg-primary px-4 py-2 whitespace-nowrap text-white"
      onClick={handleAddProduct}
    >
      add product
    </button>
  );
};
