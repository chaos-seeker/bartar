'use client';

import { useRef, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/dashboard/products/get-products';
import { TProduct } from '@/types/product';
import { Loading } from '@/components/loading';
import 'swiper/css';
import 'swiper/css/navigation';

export const Perfume = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const fetchProducts = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (fetchProducts.isLoading) {
    return (
      <div className="my-10 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="container space-y-6 sm:space-y-10 lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="relative h-[400px] overflow-hidden bg-[#EDE5D8] px-6 py-8 sm:h-[500px] sm:px-12 sm:py-10 lg:h-[600px] lg:px-16 lg:py-14">
          <div className="absolute top-8 left-6 z-30 inline-block bg-[#B77938] px-4 py-2 text-[10px] font-semibold tracking-[0.15em] text-white uppercase sm:top-10 sm:left-12 sm:px-5 sm:py-2.5 sm:text-xs lg:top-14 lg:left-16">
            Luxury Scent, Limited Deals
          </div>
          <div className="relative z-20 flex h-full flex-col justify-between pt-14 sm:pt-16">
            <div className="max-w-lg space-y-3 sm:space-y-6">
              <h2 className="text-3xl leading-[1.1] font-bold text-black sm:text-[3.5rem] lg:text-4xl xl:text-5xl">
                Up to 40% OFF
                <br />
                iconic fragrances
              </h2>
              <p className="hidden max-w-sm text-base leading-relaxed text-gray-600 sm:block sm:text-[1.05rem] lg:text-base">
                Discover the notes that turn heads before the offer fades
              </p>
            </div>
            <Link
              href="/perfume"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all hover:shadow-md sm:rounded-xl sm:px-7 sm:py-3.5 sm:text-[0.95rem] lg:px-6 lg:py-3 lg:text-sm"
            >
              View all
              <ArrowRight className="size-4 sm:size-5" />
            </Link>
          </div>
          <div className="absolute right-[30%] bottom-0 h-[350px] w-[350px] translate-y-[40%] rounded-full bg-[#D9C4A9] blur-[80px] sm:right-[35%] sm:h-[450px] sm:w-[450px] sm:blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-full w-[60%] sm:w-[55%]">
            <Image
              src="/images/home/perfume.png"
              alt="Luxury Perfume"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black lg:text-2xl">
              10 tops parfume
            </h3>
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
            spaceBetween={10}
            slidesPerView={1.2}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
            }}
            className="w-full pb-4"
          >
            {fetchProducts.data?.map((product: TProduct) => (
              <SwiperSlide key={product._id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
