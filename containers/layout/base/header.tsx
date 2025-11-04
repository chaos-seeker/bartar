'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, SearchIcon, UserIcon } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useKillua } from 'killua';
import { cartSlice } from '@/slices/cart';
import { favoriteSlice } from '@/slices/favorite';

export function Header() {
  return (
    <header>
      <div className="container flex flex-col gap-4 border-b py-5 lg:flex-row">
        <div className="flex w-full items-center justify-between">
          <Logo />
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

const Cart = () => {
  const cart = useKillua(cartSlice);
  const cartCount = cart.selectors.totalCartCount();

  return (
    <Link
      href="/cart"
      className="hover:border-primary group relative flex size-11 items-center justify-center rounded-full border p-0.5 transition-all"
    >
      <ShoppingBag className="text-greyscale-900 group-hover:text-primary size-5.5" />
      {cartCount > 0 && (
        <p className="bg-primary group-hover:bg-primary absolute -top-1 -right-1.5 flex items-center justify-center rounded-full border border-white px-[7px] py-px text-xs font-medium text-white">
          {cartCount}
        </p>
      )}
    </Link>
  );
};

const Favorite = () => {
  const favorite = useKillua(favoriteSlice);
  const favoriteCount = favorite.selectors.totalFavoriteCount();

  return (
    <Link
      href="/profile/favorites"
      className="hover:border-primary group relative flex size-11 items-center justify-center rounded-full border p-0.5 transition-all"
    >
      <Heart className="text-greyscale-900 group-hover:text-primary size-5.5" />
      {favoriteCount > 0 && (
        <p className="bg-primary absolute -top-1 -right-1.5 flex items-center justify-center rounded-full border border-white px-[7px] py-px text-xs font-medium text-white">
          {favoriteCount}
        </p>
      )}
    </Link>
  );
};

const Profile = () => {
  return (
    <Link
      href="/auth.login"
      className="hover:border-primary group relative flex size-11 items-center justify-center gap-1 rounded-full border p-2 transition-all lg:h-11 lg:w-auto"
    >
      <UserIcon className="text-greyscale-900 group-hover:text-primary size-5.5" />
      <p className="group-hover:text-primary hidden font-medium lg:block">
        login/register
      </p>
    </Link>
  );
};

const Search = () => {
  const router = useRouter();
  const [textQuery, setTextQuery] = useQueryState('text');
  const [searchText, setSearchText] = useState(textQuery || '');
  useEffect(() => {
    if (textQuery) {
      setSearchText(textQuery);
    }
  }, [textQuery]);
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      const trimmedText = searchText.trim();
      await setTextQuery(trimmedText);
      router.push(`/explore?text=${encodeURIComponent(trimmedText)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="focus-within:border-primary flex h-12 items-center justify-center rounded-full border px-3.5 transition-all lg:w-[400px]"
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search products"
        className="group relative flex w-full items-center justify-center rounded-full border border-none transition-all outline-none"
      />
      <button type="submit">
        <SearchIcon className="text-greyscale-200 hover:text-primary size-5.5" />
      </button>
    </form>
  );
};
