"use client";
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  const { data: session, } = useSession();

  const linkClasses = "text-white hover:text-amber-400 focus:text-indigo-500";

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/auth/signin',
      });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <header className="flex justify-between items-center text-xl font-bold">
      <div className="flex justify-start items-center gap-6">
      <Link href="/">
        <Image
          className="sm:h-20 sm:w-20 h-10 w-10 rounded-full"
          src={Logo}
          alt="logo"
        />
        </Link>
        <Link
          href="/statistics"
          className={linkClasses}>
          Player Rating
        </Link>
      </div>

      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-white mr-6">Hello, {session.user?.name}!</span>
          <button onClick={handleSignOut} className={linkClasses}>
            Sign out
          </button>
        </div>
      ) : (<Link
        href="/auth/signin"
        className={linkClasses}>
        Sign in with Google
      </Link>)}
      <ThemeToggle />

    </header>
  );
};

export default Header;
