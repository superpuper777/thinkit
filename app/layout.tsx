import type { Metadata } from "next";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import Logo from "@/assets/logo.png";
import "./globals.css";

const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Created by Alyona Budnik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.className} overflow-scroll`}>
        <main className="min-h-screen w-full sm:px-20 sm:py-12 px-8 py-2">
          <header className="flex flex-col items-center">
            <Image
              className="sm:h-48 sm:w-48 h-28 w-28 rounded-full"
              src={Logo}
              alt="logo"
            />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
