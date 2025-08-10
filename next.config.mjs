/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// Hardcode project base path for GitHub Pages in production
const repoBasePath = 'portfolio_website';
const basePath = isProd ? `/${repoBasePath}` : '';

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(isProd && basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
