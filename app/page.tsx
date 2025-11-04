import { Hero } from '@/containers/routes/home/hero';
import { Categories } from '@/containers/routes/home/categories';
import { OfferProducts } from '@/containers/routes/home/offer-products';
import { Perfume } from '@/containers/routes/home/perfume';
import { Gadget } from '@/containers/routes/home/gadget';
import { Home as HomeSection } from '@/containers/routes/home/home';
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
