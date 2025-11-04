'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ModalAddProduct } from './modal-add-product';
import { useModal } from '@/hooks/modal';

export function Header() {
  return (
    <header>
      <div className="container flex justify-between gap-4 border-b py-5 lg:flex-row">
        <div className="flex w-full items-center justify-between">
          <Logo />
        </div>
        <AddProduct />
        <ModalAddProduct />
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
    <button className="bg-primary text-white px-4 py-2 whitespace-nowrap" onClick={handleAddProduct}>Add Product</button>
  );
};
