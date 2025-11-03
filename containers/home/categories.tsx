import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const Categories = () => {
  const data = [
    {
      title: 'electronics',
      image: '/images/home/categories-1.png',
    },
    {
      title: 'beauty',
      image: '/images/home/categories-2.png',
    },
    {
      title: 'toys',
      image: '/images/home/categories-3.png',
    },
    {
      title: 'furniture',
      image: '/images/home/categories-4.png',
    },
    {
      title: 'shoes',
      image: '/images/home/categories-5.png',
    },
    {
      title: 'clothing',
      image: '/images/home/categories-6.png',
    },
    {
      title: 'sports',
      image: '/images/home/categories-7.png',
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid auto-rows-fr grid-cols-4 gap-4 lg:grid-cols-7">
          {data.map((item, index) => (
            <Link
              href={`/explore`}
              key={`${item.title}-${index}`}
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
              <h3 className="text-greyscale-900 text-center font-medium">
                {item.title}
              </h3>
            </Link>
          ))}
          <Link
            href={`/explore`}
            className="group flex flex-col items-center gap-2 transition-all lg:hidden"
          >
            <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-2 h-full w-full">
              <ArrowRight className="size-8" />
            </div>
            <h3 className="text-greyscale-900 text-center font-medium">more</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};
