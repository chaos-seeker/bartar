'use client';

import Image from 'next/image';
import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section>
      <div className="container">
        <div className="bg-greyscale-900 relative flex w-full flex-col items-center lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 pt-10 text-white lg:items-start lg:pb-6 lg:pl-[100px]"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[300px] pt-7 text-center text-3xl font-semibold lg:max-w-[450px] lg:text-left lg:text-4xl"
            >
              And now the <span className="text-primary-300">future</span> just
              got be <span className="text-primary-300">faster</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground max-w-[300px] text-center lg:max-w-[600px] lg:text-left"
            >
              iPhone 17 with the new A19 Bionic redefining power and precision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/"
                className="bg-blur-sm mt-3 flex w-[200px] items-center justify-center gap-3 bg-white/20 p-3 text-white"
              >
                <ShoppingBagIcon className="size-5" />
                <p>Buy Now</p>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex h-full items-end bg-[url('/images/home/hero-bg.png')] bg-cover bg-center bg-no-repeat"
          >
            <Image
              src="/images/home/hero-iphone.png"
              alt="hero"
              width={350}
              height={350}
              className="md:[700px] h-full sm:w-[500px] lg:w-[800px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
