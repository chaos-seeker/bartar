'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/product-card';

export const OfferProducts = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const products = [
    {
      id: '1',
      title: 'Apple AirPods Pro (2nd Gen)',
      image: '/images/global/product-1.png',
      price: 189.0,
      originalPrice: 249.0,
      rating: 4.55,
      soldCount: 1203,
      discount: 24,
    },
    {
      id: '2',
      title: 'MYSTICAL | Invisible FLORA GORGE',
      image: '/images/global/product-2.png',
      price: 72.0,
      originalPrice: 95.0,
      rating: 4.67,
      soldCount: 856,
      discount: 20,
    },
    {
      id: '3',
      title: 'Premium Wireless Headphones',
      image: '/images/global/product-3.png',
      price: 129.0,
      originalPrice: 179.0,
      rating: 4.3,
      soldCount: 654,
      discount: 28,
    },
    {
      id: '4',
      title: 'Smart Watch Series 8',
      image: '/images/global/product-4.png',
      price: 299.0,
      originalPrice: 399.0,
      rating: 4.8,
      soldCount: 2103,
      discount: 25,
    },
    {
      id: '5',
      title: 'Portable Bluetooth Speaker',
      image: '/images/global/product-5.png',
      price: 59.0,
      originalPrice: 89.0,
      rating: 4.2,
      soldCount: 432,
      discount: 34,
    },
    {
      id: '6',
      title: 'Gaming Mouse RGB',
      image: '/images/global/prroduct-6.png',
      price: 45.0,
      originalPrice: 69.0,
      rating: 4.6,
      soldCount: 789,
      discount: 35,
    },
    {
      id: '7',
      title: 'USB-C Hub 7 in 1',
      image: '/images/global/product-7.png',
      price: 39.0,
      originalPrice: 59.0,
      rating: 4.4,
      soldCount: 321,
      discount: 34,
    },
    {
      id: '8',
      title: 'Wireless Charging Pad',
      image: '/images/global/product-8.png',
      price: 29.0,
      originalPrice: 49.0,
      rating: 4.1,
      soldCount: 567,
      discount: 41,
    },
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const difference = midnight.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <section className="to-primary-300/30 bg-gradient-to-b from-white py-10">
      <div className="container flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="text-center text-xl font-bold">Today's flash deals</h2>
          <div className="flex w-fit items-center justify-center gap-1 rounded-full border border-gray-200 bg-white/50 p-2 backdrop-blur-sm">
            <div className="text-primary flex min-w-[60px] items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-1 font-medium tabular-nums">
              {formatTime(timeLeft.hours)}
            </div>
            <div className="text-primary flex min-w-[60px] items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-1 font-medium tabular-nums">
              {formatTime(timeLeft.minutes)}
            </div>
            <div className="text-primary flex min-w-[60px] items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-1 font-medium tabular-nums">
              {formatTime(timeLeft.seconds)}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
