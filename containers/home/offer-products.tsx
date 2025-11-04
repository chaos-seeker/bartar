'use client';

import { useEffect, useState, useRef } from 'react';
import { ProductCard } from '@/components/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const OfferProducts = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const products = [
    {
      id: '1',
      title: 'Apple AirPods Pro',
      image: '/images/global/product-1.png',
      price: 189.0,
      originalPrice: 249.0,
      rating: 3,
      soldCount: 1203,
      discount: 24,
    },
    {
      id: '2',
      title: 'Invisible Flora Gorge',
      image: '/images/global/product-2.png',
      price: 72.0,
      originalPrice: 95.0,
      rating: 5,
      soldCount: 856,
      discount: 20,
    },
    {
      id: '3',
      title: 'Premium Wireless',
      image: '/images/global/product-3.png',
      price: 129.0,
      originalPrice: 179.0,
      rating: 4,
      soldCount: 654,
      discount: 28,
    },
    {
      id: '4',
      title: 'Smart Watch Series 8',
      image: '/images/global/product-4.png',
      price: 299.0,
      originalPrice: 399.0,
      rating: 5,
      soldCount: 2103,
      discount: 25,
    },
    {
      id: '5',
      title: 'Portable Bluetooth',
      image: '/images/global/product-5.png',
      price: 59.0,
      originalPrice: 89.0,
      rating: 4,
      soldCount: 432,
      discount: 34,
    },
    {
      id: '6',
      title: 'Gaming Mouse RGB',
      image: '/images/global/prroduct-6.png',
      price: 45.0,
      originalPrice: 69.0,
      rating: 5,
      soldCount: 789,
      discount: 35,
    },
    {
      id: '7',
      title: 'USB-C Hub 7 in 1',
      image: '/images/global/product-7.png',
      price: 39.0,
      originalPrice: 59.0,
      rating: 4,
      soldCount: 321,
      discount: 34,
    },
    {
      id: '8',
      title: 'Wireless Charging',
      image: '/images/global/product-8.png',
      price: 29.0,
      originalPrice: 49.0,
      rating: 4,
      soldCount: 567,
      discount: 41,
    },
    {
      id: '9',
      title: 'Mechanical Keyboard',
      image: '/images/global/product-9.png',
      price: 89.0,
      originalPrice: 129.0,
      rating: 5,
      soldCount: 945,
      discount: 31,
    },
    {
      id: '10',
      title: 'HD Webcam 1080p',
      image: '/images/global/product-10.png',
      price: 69.0,
      originalPrice: 99.0,
      rating: 4,
      soldCount: 612,
      discount: 30,
    },
    {
      id: '11',
      title: 'Laptop Stand Pro',
      image: '/images/global/product-11.png',
      price: 35.0,
      originalPrice: 55.0,
      rating: 4,
      soldCount: 478,
      discount: 36,
    },
    {
      id: '12',
      title: 'Noise Cancelling',
      image: '/images/global/product-12.png',
      price: 159.0,
      originalPrice: 219.0,
      rating: 5,
      soldCount: 1567,
      discount: 27,
    },
    {
      id: '13',
      title: 'Smart LED Bulb',
      image: '/images/global/product-13.png',
      price: 25.0,
      originalPrice: 39.0,
      rating: 4,
      soldCount: 834,
      discount: 36,
    },
    {
      id: '14',
      title: 'Portable SSD 1TB',
      image: '/images/global/product-14.png',
      price: 119.0,
      originalPrice: 169.0,
      rating: 5,
      soldCount: 1245,
      discount: 30,
    },
    {
      id: '15',
      title: 'Fitness Tracker',
      image: '/images/global/product-15.png',
      price: 79.0,
      originalPrice: 119.0,
      rating: 4,
      soldCount: 923,
      discount: 34,
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
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="text-center text-xl lg:text-2xl font-bold">
            today offer products
          </h2>
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
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onProgress={(swiper, progress) => setProgress(progress)}
          spaceBetween={10}
          slidesPerView={1.5}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mx-auto mt-0 flex w-full items-center gap-4 rounded-full bg-white p-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="text-greyscale-600 hover:text-primary flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous slide"
            disabled={progress === 0}
          >
            <ChevronLeft className="size-6" />
          </button>

          <div className="relative h-0.5 flex-1 overflow-hidden bg-gray-200">
            <div
              className="bg-greyscale-900 absolute top-0 left-0 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="text-greyscale-600 hover:text-primary flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next slide"
            disabled={progress === 1}
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
