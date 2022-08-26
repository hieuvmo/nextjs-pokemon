/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["jherr-pokemon.s3.us-west-1.amazonaws.com"],
  },
};
