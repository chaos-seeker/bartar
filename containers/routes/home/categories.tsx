'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Categories = () => {
  const data = [
    {
      title: 'electronics',
      image: '/images/home/categories-electronics.png',
    },
    {
      title: 'beauty',
      image: '/images/home/categories-beauty.png',
    },
    {
      title: 'toys',
      image: '/images/home/categories-toys.png',
    },
    {
      title: 'furniture',
      image: '/images/home/categories-furniture.png',
    },
    {
      title: 'shoes',
      image: '/images/home/categories-shoes.png',
    },
    {
      title: 'clothing',
      image: '/images/home/categories-clothing.png',
    },
    {
      title: 'sports',
      image: '/images/home/categories-sports.png',
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="grid auto-rows-fr grid-cols-4 gap-4 lg:grid-cols-7">
          {data.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <Link
                href={`/explore`}
                className="group flex flex-col items-center gap-2 transition-all"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
                    className="object-contain object-center p-2 transition-transform hover:scale-105"
                  />
                </div>
                <h3 className="text-greyscale-900 text-smp text-center font-medium">
                  {item.title}
                </h3>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: data.length * 0.1,
              ease: 'easeOut',
            }}
            className="lg:hidden"
          >
            <Link
              href={`/explore`}
              className="group flex h-full flex-col items-center gap-2 transition-all"
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 p-2 transition-all">
                <ArrowRight className="size-8 group-hover:scale-105 transition-all" />
              </div>
              <h3 className="text-greyscale-900 text-smp text-center font-medium">
                more
              </h3>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
