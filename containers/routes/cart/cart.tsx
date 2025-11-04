'use client';

import { cartSlice } from '@/slices/cart';
import { useKillua } from 'killua';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { userSlice } from '@/slices/user';
import { useState } from 'react';
import { createOrder } from '@/actions/orders/create-order';
import toast from 'react-hot-toast';

export function Cart() {
  const cart = useKillua(cartSlice);
  const user = useKillua(userSlice);
  const [isPaying, setIsPaying] = useState(false);
  const totalItems = cart.selectors.totalCartCount();
  const items = cart.get();
  const totals = items.reduce(
    (acc, item) => {
      const price = Number(item.price) || 0;
      const discount = Number((item as any).discount || 0) || 0;
      const discounted =
        discount > 0 ? price - (price * discount) / 100 : price;
      acc.original += price;
      acc.discounted += discounted;
      return acc;
    },
    { original: 0, discounted: 0 },
  );
  const savings = Math.max(0, totals.original - totals.discounted);

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
      <div className="container px-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b px-3 pb-6">
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
              <div className="flex flex-col gap-4 px-3 pb-4 lg:px-4">
                {items.map((item) => (
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
                        {(() => {
                          const price = Number(item.price) || 0;
                          const discount =
                            Number((item as any).discount || 0) || 0;
                          const discounted =
                            discount > 0
                              ? price - (price * discount) / 100
                              : price;
                          return (
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{discounted}$</p>
                              {discount > 0 && (
                                <p className="text-error text-sm line-through">
                                  {price}$
                                </p>
                              )}
                            </div>
                          );
                        })()}
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
              <div className="flex flex-col gap-2 border-t px-3 pt-4 lg:-mt-4 lg:border-t-0 lg:border-l lg:py-4 lg:pl-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    subtotal ({totalItems}) items
                  </p>
                  <p className="font-medium">{totals.discounted}$</p>
                </div>
                <div className="text-success flex items-center justify-between">
                  <p className="text-lg font-semibold">savings</p>
                  <p className="font-medium">{savings}$</p>
                </div>
                <button
                  disabled={isPaying}
                  onClick={async () => {
                    if (!user.selectors.isAuthenticated()) {
                      toast.error('please login first');
                      return;
                    }
                    try {
                      setIsPaying(true);
                      const currentUser = user.selectors.getUser();
                      const res = await createOrder({
                        username: String(currentUser?.username),
                        amount: totals.discounted,
                        productIds: items.map((i) => String(i._id)),
                      });
                      if (!res.ok) {
                        toast.error(res.error as string);
                        return;
                      }
                      toast.success('payment successful');
                      cart.reducers.clearCart();
                    } finally {
                      setIsPaying(false);
                    }
                  }}
                  className="bg-primary mt-3 w-full py-4 text-lg font-semibold text-white disabled:opacity-60"
                >
                  payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
