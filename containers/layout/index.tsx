import { Footer } from './footer';
import { Header } from './header';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className='py-6'>{props.children}</main>
      <Footer />
    </>
  );
}
