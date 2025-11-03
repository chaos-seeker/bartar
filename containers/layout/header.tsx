'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, SearchIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  return (
    <header>
      <div className="container flex flex-col gap-4 border-b py-5 lg:flex-row">
        <div className="flex w-full items-center justify-between">
          <Link href="/">
            <Image
              src="/images/layout/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <div className="hidden lg:block">
            <Search />
          </div>
          <div className="flex items-center gap-3">
            <Favorite />
            <Cart />
            <Profile />
          </div>
        </div>
        <div className="lg:hidden">
          <Search />
        </div>
      </div>
    </header>
  );
}

const Cart = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Link
      href="/profile/favorites"
      className="hover:border-primary group relative flex size-11 items-center justify-center rounded-full border p-0.5 transition-all"
    >
      <ShoppingBag className="text-greyscale-900 group-hover:text-primary size-5.5" />
      <p className="bg-primary group-hover:bg-primary absolute -top-1 -right-1.5 flex items-center justify-center rounded-full border border-white px-[7px] py-[1px] text-xs font-medium text-white">
        {cartCount}
      </p>
    </Link>
  );
};

const Favorite = () => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  return (
    <Link
      href="/profile/favorites"
      className="hover:border-primary group relative flex size-11 items-center justify-center rounded-full border p-0.5 transition-all"
    >
      <Heart className="text-greyscale-900 group-hover:text-primary size-5.5" />
      <p className="bg-primary absolute -top-1 -right-1.5 flex items-center justify-center rounded-full border border-white px-[7px] py-[1px] text-xs font-medium text-white">
        {favoriteCount}
      </p>
    </Link>
  );
};

const Profile = () => {
  return (
    <Link href="/auth.login" className="flex hover:border-primary flex gap-1 group relative flex size-11 lg:w-auto lg:h-11 items-center justify-center rounded-full border p-2 transition-all">
      <UserIcon className="text-greyscale-900 group-hover:text-primary size-5.5" />
      <p className="font-medium hidden lg:block group-hover:text-primary">login/register</p>
    </Link>
  );
};

const Search = () => {
  return (
    <div className="focus-within:border-primary lg:w-[400px] flex h-12 items-center justify-center rounded-full border px-3 px-3.5 transition-all">
      <input
        type="text"
        placeholder="search products"
        className="group relative flex w-full items-center justify-center rounded-full border border-none transition-all outline-none"
      />
      <button>
        <SearchIcon className="text-greyscale-200 hover:text-primary size-5.5" />
      </button>
    </div>
  );
};
