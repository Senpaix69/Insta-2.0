/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "cloudflare-ipfs.com",
    ],
  },
};

const withTM = require("next-transpile-modules")([
  "@pusher/push-notifications-web",
]);

module.exports = withTM(nextConfig);
