/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Enables React's strict mode for better error handling and debugging.
    images: {
      domains: ['localhost','lh3.googleusercontent.com','eshanivaccationbackend.vercel.app'], // Allow loading images from external domains.
    },
  };
  
  export default nextConfig;
  
