import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stolenLove = localFont({
  src: [
    { path: './fonts/StolenLoveBlack.otf', weight: '900', style: 'normal' },
    { path: './fonts/StolenLoveBold.otf', weight: '700', style: 'normal' },
    { path: './fonts/StolenLoveExtraBold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-stolenLove',
});

export const metadata: Metadata = {
  title: "Pewiri Emeralds",
  description: "Venta de joyas de esmeralda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${stolenLove.variable} antialiased`}
      >
        <Navbar/>
          <main>
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}
