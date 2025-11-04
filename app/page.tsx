import { Hero } from '@/containers/home/hero';
import { Categories } from '@/containers/home/categories';
import { OfferProducts } from '@/containers/home/offer-products';
import { Perfume } from '@/containers/home/perfume';
import { Gadget } from '@/containers/home/gadget';
import { Home as HomeSection } from '@/containers/home/home';
import { AnimatedSection } from '@/components/animated-section';

export default function Page() {
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
      <AnimatedSection>
        <Perfume />
      </AnimatedSection>
      <AnimatedSection>
        <Gadget />
      </AnimatedSection>
      <AnimatedSection>
        <HomeSection />
      </AnimatedSection>
    </>
  );
}
