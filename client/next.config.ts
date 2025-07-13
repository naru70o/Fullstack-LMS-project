import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }
      ]
    });
    return config;
  },
    turbopack: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
};

export default nextConfig;