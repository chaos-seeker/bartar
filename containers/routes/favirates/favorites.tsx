'use client';

import { favoriteSlice } from '@/slices/favorite';
import { useKillua } from 'killua';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';
import toast from 'react-hot-toast';

export function Favorites() {
  const favorite = useKillua(favoriteSlice);
  const items = favorite.get();
  const totalItems = favorite.selectors.totalFavoriteCount();

  if (favorite.selectors.favoriteIsEmpty()) {
    return (
      <section>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Image
            src="/images/global/not-found.png"
            alt="favorites is empty"
            width={200}
            height={200}
          />
          <p className="text-greyscale-500 text-center">
            your favorites is empty
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container px-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b px-3 pb-6">
            <p className="text-lg font-bold">total favorites ({totalItems})</p>
            <button
              onClick={() => {
                favorite.reducers.clearFavorite();
                toast.success('favorites cleared');
              }}
              className="text-error hover:text-error/80 text-lg font-semibold transition-colors"
            >
              clear all
            </button>
          </div>
          <div className="container pb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {items.map((item) => (
                <div key={item._id}>
                  <ProductCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
