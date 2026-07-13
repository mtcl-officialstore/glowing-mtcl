/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable static export for Capacitor/mobile apps
  output: 'export',
  // Disable optimization features incompatible with static export
  reactStrictMode: true,
}

export default nextConfig
