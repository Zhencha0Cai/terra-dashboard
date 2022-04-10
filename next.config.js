/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/cross-chain/stable-coin-market-cap",
        permanent: true,
      },
    ];
  },
};
