/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Отключаем service worker в development
  rewrites: async () => [
    {
      source: "/sw.js",
      destination: "/404",
    },
  ],
};

export default nextConfig;
