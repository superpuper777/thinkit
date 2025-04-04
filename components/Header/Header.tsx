"use client";
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const { data: session, } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/', 
      });
  
      document.cookie = 'next-auth.session-token=; Max-Age=0; path=/';
      document.cookie = 'next-auth.csrf-token=; Max-Age=0; path=/';
  
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
 
  return (
    <header className="flex justify-between items-center text-xl font-bold">
      <div className="flex justify-start items-center gap-6">
        <Image
          className="sm:h-20 sm:w-20 h-10 w-10 rounded-full"
          src={Logo}
          alt="logo"
        />
        <Link
          href="/statistics"
          className="text-white hover:text-amber-400 focus:text-indigo-500">
          Player Rating
        </Link>
      </div>

      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      {session ? (
            <>
              <li>Привет, {session.user?.name}</li>
              <li><button onClick={handleSignOut}>Выйти</button></li>
            </>
          ) :(        <Link
            href="/auth/signin"
            className="text-white hover:text-amber-400 focus:text-indigo-500">
            Sign in with Google
          </Link> )}

    </header>
  );
};

export default Header;
