/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  // Add caching headers for static assets if hosted on compatible server
  // Note: 'output: export' doesn't use these headers, they are for 'next start'
  // or Vercel. For static export, headers are configured in the host (e.g. Nginx/Netlify).
};

export default nextConfig;
