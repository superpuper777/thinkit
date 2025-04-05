'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const res = await signIn('google', { redirect: true, callbackUrl: '/' });
    if (res?.error) {
      setError('Error signing in with Google. Please try again!');
    } 
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/3 max-w-md mx-auto">
      <h1 className="text-xl mb-4 text-gray-500 font-semibold">Sign in with Google</h1>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? 'Loading...' : 'Войти через Google'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
