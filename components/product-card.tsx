'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { useKillua } from 'killua';
import { cartSlice } from '@/slices/cart';
import { favoriteSlice } from '@/slices/favorite';
import { cn } from '@/utils/cn';
import { TProduct } from '@/types/product';
import toast from 'react-hot-toast';

export const ProductCard = (props: TProduct) => {
  const price = parseFloat(props.price);
  const discount = props.discount ? parseFloat(props.discount) : 0;
  const originalPrice = discount > 0 ? price / (1 - discount / 100) : null;
  const cart = useKillua(cartSlice);
  const favorite = useKillua(favoriteSlice);
  const isInCart = cart.selectors.isItemInCart(props._id);
  const isFavorite = favorite.selectors.isItemInFavorite(props._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.reducers.addToCart(props);
    toast.success('product added to cart');
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.reducers.removeFromCart(props._id);
    toast.success('product removed from cart');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      favorite.reducers.removeFromFavorite(props._id);
      toast.success('product removed from favorites');
    } else {
      favorite.reducers.addToFavorite(props);
      toast.success('product added to favorites');
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden border border-gray-200 bg-white">
      <div className="relative aspect-square w-full">
        <Link
          href={`/products/${props._id}`}
          className="relative block h-full w-full"
        >
          <div className="relative h-full w-full overflow-hidden bg-gray-100">
            <Image
              src={props.image!}
              alt={props.title}
              fill
              className="object-contain p-4"
            />
          </div>
          {discount > 0 && (
            <div className="bg-error absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-medium text-white">
              {discount}% OFF
            </div>
          )}
        </Link>
        <button
          onClick={handleToggleFavorite}
          type="button"
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart
            className={cn(
              'size-5 transition-colors',
              isFavorite
                ? 'fill-error text-error'
                : 'text-greyscale-400 hover:text-error',
            )}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/products/${props._id}`}>
          <h3
            className={cn(
              'text-greyscale-900 hover:text-primary line-clamp-2 font-medium transition-colors',
            )}
          >
            {props.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-greyscale-900 text-lg font-bold">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-error lg:text-mdp line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border-2 bg-white transition-all',
              isInCart
                ? 'text-error hover:border-error hover:bg-error hover:text-white'
                : 'text-primary hover:border-primary hover:bg-primary hover:text-white',
            )}
          >
            {isInCart ? (
              <Trash2 className="size-5" />
            ) : (
              <Plus className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
