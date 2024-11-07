import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
      "biztoss-hb.s3.us-east-1.amazonaws.com",
    ],
  },
  sassOptions: {
    sourceMap: false,
    quietDeps: true, // Sass 경고 줄이기
  },

  reactStrictMode: false,
};

export default nextConfig;
