'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const res = await signIn('google', { redirect: false });
    if (res?.error) {
      setError('Ошибка при входе с Google. Попробуйте еще раз!');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4 text-white">Вход через Google</h1>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? 'Загрузка...' : 'Войти через Google'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
