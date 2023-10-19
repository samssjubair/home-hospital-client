/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "res.cloudinary.com",
      "picsum.photos",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig
