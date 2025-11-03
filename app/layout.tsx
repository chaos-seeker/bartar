import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Layout from "@/containers/layout";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bartar",
  description: "e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
