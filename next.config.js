/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes imports
  trailingSlash: true,
  // adds export behavior to "next build"
  output: "export",
};

module.exports = nextConfig
