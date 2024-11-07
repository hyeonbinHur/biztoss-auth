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
    sourceMap: true,
  },
};

export default nextConfig;
