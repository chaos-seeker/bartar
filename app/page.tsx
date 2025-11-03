import { Hero } from '@/containers/home/hero';
import { Categories } from '@/containers/home/categories';
import { OfferProducts } from '@/containers/home/offer-products';
import { AnimatedSection } from '@/components/animated-section';

export default function Home() {
  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <Categories />
      </AnimatedSection>
      <AnimatedSection>
        <OfferProducts />
      </AnimatedSection>
    </>
  );
}
