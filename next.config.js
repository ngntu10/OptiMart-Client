/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // Specify allowed domains for simple external URLs
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
    ],
    // Define remote patterns for more complex matching
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.platform-lookaside.fbsbx.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*platform-lookaside.fbsbx.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
