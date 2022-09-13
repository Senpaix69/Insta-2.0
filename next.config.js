/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['links.papareact.com', "lh3.googleusercontent.com",
      'firebasestorage.googleapis.com', "cloudflare-ipfs.com", "cdn.pixabay.com"]
  }
}

module.exports = nextConfig;
