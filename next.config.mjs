/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hms/ui", "@hms/utils", "@hms/types"],
};

export default nextConfig;
