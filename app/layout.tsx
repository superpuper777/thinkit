import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import Header from '@/components/Header/Header';

import brain from '@/assets/brain.jpg';

import './globals.css';
import Image from 'next/image';

const quickSand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Created by Alyona Budnik',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.className} overflow-scroll`}>
        <div className="absolute w-full h-screen z-0 opacity-75">
          <Image
            src={brain}
            alt="Background Image"
            layout="fill"
            style={{ objectFit: 'cover' }}
            priority={true}
          />
        </div>
        <main className="relative min-h-screen w-full sm:px-20 sm:py-12 px-8 py-2 z-40">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
