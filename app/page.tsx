import { Hero } from '@/containers/routes/home/hero';
import { Categories } from '@/containers/routes/home/categories';
import { OfferProducts } from '@/containers/routes/home/offer-products';
import { Perfume } from '@/containers/routes/home/perfume';
import { Gadget } from '@/containers/routes/home/gadget';
import { Home as HomeSection } from '@/containers/routes/home/home';
import { AnimatedSection } from '@/components/animated-section';
import { getProducts } from '@/actions/dashboard/products/get-products';

export default async function Page() {
  const fetchProducts = await getProducts();

  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <Categories />
      </AnimatedSection>
      <AnimatedSection>
        <OfferProducts products={fetchProducts} />
      </AnimatedSection>
      <AnimatedSection>
        <Perfume products={fetchProducts} />
      </AnimatedSection>
      <AnimatedSection>
        <Gadget products={fetchProducts} />
      </AnimatedSection>
      <AnimatedSection>
        <HomeSection products={fetchProducts} />
      </AnimatedSection>
    </>
  );
}
