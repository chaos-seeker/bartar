'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useKillua } from 'killua';
import { cartSlice } from '@/slices/cart';
import { favoriteSlice } from '@/slices/favorite';
import { userSlice } from '@/slices/user';
import toast from 'react-hot-toast';

export function Header() {
  return (
    <header>
      <div className="container flex flex-col gap-4 border-b py-5 lg:flex-row">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Favorite />
            <Cart />
            <Profile />
          </div>
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
      href="/favorites"
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
  const user = useKillua(userSlice);
  const isAuthenticated = user.selectors.isAuthenticated();
  const username = user.selectors.getUsername();
  const router = useRouter();
  if (!user.isReady) return; 

  return (
    <button
      onClick={() => {
        if (isAuthenticated) {
          user.reducers.clearUser();
          toast.success('logged out successfully');
        } else {
          router.push('/auth');
        }
      }}  
      className="hover:border-primary group relative flex size-11 items-center justify-center gap-1 rounded-full border py-2 lg:px-4 transition-all lg:h-11 lg:w-auto"
    >
      <UserIcon className="text-greyscale-900 group-hover:text-primary size-5.5" />
      <p className="group-hover:text-primary hidden font-medium lg:block">
        {isAuthenticated ? 'logout' : 'login'}
      </p>
    </button>
  );
};
