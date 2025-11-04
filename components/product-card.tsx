'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: number;
  discount?: number;
}

export const ProductCard = (props: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden bg-white border border-gray-200">
      <Link
        href={`/products/${props.id}`}
        className="relative aspect-square w-full"
      >
        <div className="relative h-full w-full overflow-hidden bg-gray-100">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-contain p-4"
          />
        </div>
        {props.discount && (
          <div className="bg-error absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-medium text-white">
            {props.discount}% OFF
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white shadow-sm"
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
      </Link>
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/products/${props.id}`}>
          <h3
            className={cn(
              'text-greyscale-900 hover:text-primary line-clamp-2 font-medium transition-colors',
            )}
          >
            {props.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={cn(
                  'text-lg',
                  index < props.rating ? 'text-yellow-400' : 'text-gray-300',
                )}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-greyscale-900 text-sm font-medium">
            {props.rating}
          </span>
          <span className="text-greyscale-400 text-sm">
            ({props.soldCount.toLocaleString()} sold)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-greyscale-900 text-xl font-bold">
              ${props.price.toFixed(2)}
            </span>
            {props.originalPrice && (
              <span className="text-error text-lg line-through">
                ${props.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            className={cn(
              'hover:bg-primary hover:border-primary flex size-10 items-center justify-center rounded-full border-2 bg-white transition-all hover:text-white',
            )}
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
