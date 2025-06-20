/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medici-landing-student.vercel.app',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/studentform/:path*',
          destination: 'https://medici-landing-student.vercel.app/:path*',
        },
        {
          source: '/_next/:path*',
          destination: 'https://medici-landing-student.vercel.app/_next/:path*',
        },
        // Handle API routes
        {
          source: '/api/:path*',
          destination: 'https://medici-landing-student.vercel.app/api/:path*',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/studentform/:path*',
        headers: [
          {
            key: 'x-base-path',
            value: '/studentform',
          },
        ],
      },
    ];
  },
}

export default nextConfig
