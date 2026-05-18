import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Multiple lockfiles exist in parent dirs; pin the workspace/build root
  // to this project so build output isn't read from a stale parent .next.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
