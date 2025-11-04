'use client';

import { useEffect, useState, useRef } from 'react';
import { ProductCard } from '@/components/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/dashboard/products/get-products';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TProduct } from '@/types/product';
import { Loading } from '@/components/loading';

export const OfferProducts = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchProducts = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

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

  if (fetchProducts.isLoading) {
    return (
      <div className="my-10 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="to-primary-300/30 bg-linear-to-b from-white py-10">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="text-center text-xl font-bold lg:text-2xl">
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
          {fetchProducts.data?.map((product: TProduct) => (
            <SwiperSlide key={product._id}>
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
