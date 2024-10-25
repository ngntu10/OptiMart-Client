/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: false,
  images: { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ]
  },
  images: { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*platform-lookaside.fbsbx.com",
        port: "",
        pathname: "**",
      },
    ]
  }
}

module.exports = nextConfig
