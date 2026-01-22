import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Load local env vars from `env.local` (this repo uses that filename instead of `.env.local`).
// This runs during `next dev` / `next build` startup.
try {
  const envPath = path.join(process.cwd(), "env.local");
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;

      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!key) continue;

      // Don't override values already provided by the environment.
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
} catch {
  // ignore: missing/invalid env.local shouldn't break the app
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
