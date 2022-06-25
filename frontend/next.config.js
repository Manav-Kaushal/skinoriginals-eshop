/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com", "res.cloudinary.com", "images.ulta.com"],
  },
};

module.exports = nextConfig;
