/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/blogs/who-gets-removed",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
