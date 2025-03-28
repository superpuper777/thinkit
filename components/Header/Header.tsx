import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
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
      <Link
        href="/login"
        className="text-white hover:text-amber-400 focus:text-indigo-500">
        Log in
      </Link>
    </header>
  );
};

export default Header;
