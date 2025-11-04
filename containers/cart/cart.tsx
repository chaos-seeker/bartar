'use client';

import { cartSlice } from '@/slices/cart';
import { useKillua } from 'killua';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export function Cart() {
  const cart = useKillua(cartSlice);
  const totalItems = cart.selectors.totalCartCount();
  const totalPrice = cart.selectors.totalCartPrice();
  const savings = totalPrice - cart.selectors.totalCartPrice();

  if (cart.selectors.cartIsEmpty()) {
    return (
      <section>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Image
            src="/images/global/not-found.png"
            alt="cart is empty"
            width={200}
            height={200}
          />
          <p className="text-greyscale-500 text-center">your cart is empty</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='container'>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-5">
            <p className="text-lg font-bold">total cart items ({totalItems})</p>
            <button
              onClick={() => cart.reducers.clearCart()}
              className="text-error hover:text-error/80 text-lg font-semibold transition-colors"
            >
              clear all
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gird-cols-1 grid grid-cols-1 lg:grid-cols-2">
              <div className="pb-4 lg:pr-4 flex flex-col gap-4">
                {cart.get().map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={item.image!}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="bg-greyscale-15 rounded-md p-3"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="font-medium">{item.price}$</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-error hover:text-error/80 text-lg font-semibold transition-colors"
                          onClick={() => cart.reducers.removeFromCart(item._id)}
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t lg:pl-4 pt-4 lg:border-l lg:py-4 lg:-mt-4 lg:border-t-0">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    subtotal ({totalItems}) items
                  </p>
                  <p className="font-medium">
                    {cart.selectors.totalCartPrice()}$
                  </p>
                </div>
                <div className="text-success flex items-center justify-between">
                  <p className="text-lg font-semibold">savings</p>
                  <p className="font-medium">{savings}$</p>
                </div>
                <button className="bg-primary mt-3 w-full py-4 text-lg font-semibold text-white">
                  checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
