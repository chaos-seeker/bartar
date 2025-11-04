'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';

export const ModalWelcome = () => {
  const modalWelcome = useModal('welcome');

  useEffect(() => {
    modalWelcome.show();
  }, []);

  const handleClose = () => {
    modalWelcome.hide();
  };

  return (
    <>
      <button
        type="button"
        className={cn(
          'fixed inset-0 z-40 cursor-default bg-black/10 backdrop-blur-xs transition-opacity',
          modalWelcome.isShow
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        onClick={handleClose}
        aria-label="close welcome overlay"
      />
      <div
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-[360px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto bg-white p-5 shadow-lg transition-all',
          modalWelcome.isShow
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="welcome modal"
      >
        <div className="mb-3 text-lg font-semibold">welcome! 👋</div>
        <p className="mb-4 text-sm leading-6 text-gray-700">
          this is a full‑stack e‑commerce app. use the quick links below to
          navigate faster.
        </p>

        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
          <Link
            href="/"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            home
          </Link>
          <Link
            href="/products/6909909b6d36a26008fcb5c6"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            single product
          </Link>
          <Link
            href="/explore"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            explore
          </Link>
          <Link
            href="/favorites"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            favorites
          </Link>
          <Link
            href="/cart"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            cart
          </Link>
          <Link
            href="/dashboard/products"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            manage products
          </Link>
          <Link
            href="/dashboard/users"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            manage users
          </Link>
          <Link
            href="/dashboard/orders"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            manage orders
          </Link>
          <Link
            href="/auth"
            className="border px-3 py-2 text-center transition-colors hover:bg-gray-50"
          >
            login
          </Link>
        </div>

        <div className="mb-4 rounded border p-3 text-sm leading-6 text-gray-700">
          <div className="mb-1 font-medium">technologies used:</div>
          <ul className="list-inside list-disc space-y-1">
            <li>next.js (app router)</li>
            <li>mongodb</li>
            <li>typescript</li>
            <li>tailwindcss</li>
            <li>@tanstack/react-query</li>
            <li>nuqs</li>
            <li>@bprogress/next</li>
            <li>react-hot-toast</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="bg-primary w-full hover:bg-primary/90 px-4 py-3 text-white transition-colors"
          >
            get started
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalWelcome;
