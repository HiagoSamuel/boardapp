import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {
    root: process.cwd(),
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
