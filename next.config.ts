import type { NextConfig } from "next";
import path from "node:path";

/** Keep Turbopack rooted to this app when parent folders have other package-lock files. */
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd())
  }
};

export default nextConfig;
