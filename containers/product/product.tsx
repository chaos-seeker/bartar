'use client';

import { TProduct } from '@/types/product';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useKillua } from 'killua';
import { cartSlice } from '@/slices/cart';
import { favoriteSlice } from '@/slices/favorite';
import toast from 'react-hot-toast';

interface ProductProps {
  product: TProduct;
}

export function Product(props: ProductProps) {
  const price = Number(props.product.price) || 0;
  const discount = Number(props.product.discount) || 0;
  const priceWithDiscount =
    discount > 0 ? price - (price * discount) / 100 : price;
  const priceWithoutDiscount = price;
  const favorite = useKillua(favoriteSlice);
  const isFavorite = favorite.selectors.isItemInFavorite(props.product._id);
  const handleToggleFavorite = () => {
    if (isFavorite) {
      favorite.reducers.removeFromFavorite(props.product._id);
      toast.success('product removed from favorites');
    } else {
      favorite.reducers.addToFavorite(props.product);
      toast.success('product added to favorites');
    }
  };
  const cart = useKillua(cartSlice);
  const isInCart = cart.selectors.isItemInCart(props.product._id);
  const handleAddToCart = () => {
    cart.reducers.addToCart(props.product);
    toast.success('product added to cart');
  };
  const handleRemoveFromCart = () => {
    cart.reducers.removeFromCart(props.product._id);
    toast.success('product removed from cart');
  };

  return (
    <section className="container flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5">
      <div className="bg-greyscale-15 relative flex w-full justify-center p-2">
        <Image
          src={props.product.image!}
          alt={props.product.title}
          width={350}
          height={350}
          className="lg:size-[300px]"
        />
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
      <div className="flex flex-col gap-3 lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold lg:text-2xl">{props.product.title}</p>
          <div className="flex items-center gap-2">
            <p className="text-primary text-lg font-bold">
              {priceWithDiscount}$
            </p>
            <p className="text-error text-lg font-semibold line-through">
              {priceWithoutDiscount}$
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <p>{props.product.stock} items in stock</p>
          <button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            className={cn(
              'flex items-center justify-center gap-2 rounded-md p-4 transition-colors',
              isInCart
                ? 'bg-error text-white hover:opacity-90'
                : 'bg-primary text-white hover:opacity-90',
            )}
          >
            {isInCart ? (
              <>
                <Trash2 className="size-5" /> remove from cart
              </>
            ) : (
              <>
                <Plus className="size-5" /> add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
