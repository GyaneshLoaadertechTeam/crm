// /** @type {import('next').NextConfig} */
// const nextConfig = {
 
//   reactStrictMode: true,
// };

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Set to true if the redirect is permanent
      },
    ];
  },
};

module.exports = nextConfig;
