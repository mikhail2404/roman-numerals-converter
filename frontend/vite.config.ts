import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const API_URL = process.env.VITE_API_URL || "http://localhost:3001";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": API_URL,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setupTests.ts"],
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
