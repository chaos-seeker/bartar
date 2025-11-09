
import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import LayoutBase from '@/containers/layout/base';
import { PropsWithChildren } from 'react';
import LayouDashboard from '@/containers/layout/dashboard';
import { Providers } from './providers';
import { ModalWelcome } from '@/containers/layout/base/modal-welcome';
import { headers } from 'next/headers';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
});

const metadata: Metadata = {
  title: 'bartar',
  description: 'e-commerce website',
};

export default async function RootLayout(props: PropsWithChildren) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname')!;

  return (
    <html lang="en">
      <head>
        <title>bartar</title>
        <meta name="description" content="e-commerce website" />
      </head>
      <body className={archivo.variable}>
        <Providers>
          {pathname.startsWith('/auth') ? (
            props.children
          ) : pathname.startsWith('/dashboard') ? (
            <LayouDashboard>{props.children}</LayouDashboard>
          ) : (
            <LayoutBase>
              <ModalWelcome />
              {props.children}
            </LayoutBase>
          )}
        </Providers>
      </body>
    </html>
  );
}
