/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  output: "standalone",
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
