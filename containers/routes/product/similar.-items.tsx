'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/dashboard/products/get-products';
import { ProductCard } from '@/components/product-card';
import { Loading } from '@/components/loading';
import { TProduct } from '@/types/product';

export function SimilarItems() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const products = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (products.isLoading) {
    return (
      <section className="container py-8">
        <div className="flex items-center justify-center p-8">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold lg:text-2xl">Similar items</h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-100 sm:size-11"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-100 sm:size-11"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        spaceBetween={12}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {products.data?.map((product: TProduct) => (
          <SwiperSlide key={product._id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
