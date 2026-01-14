/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/blogs/who-gets-removed",
  assetPrefix: "/blogs/who-gets-removed",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
