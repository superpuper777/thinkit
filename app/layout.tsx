import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import Header from '@/components/Header/Header';
// import HomePic from "@/assets/brain.jpg";

import './globals.css';

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
        <main className="min-h-screen w-full sm:px-20 sm:py-12 px-8 py-2 bg-[url('../assets/brain.jpg')] bg-center bg-cover bg-no-repeat">
         <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}
