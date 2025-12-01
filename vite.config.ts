import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { getApiSwagger } from "./scripts/getApiSwagger";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "api-shema",
      enforce: "pre",
      async config() {
        await getApiSwagger();
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@gen-api": resolve(__dirname, "src/shared/api/gen/.index"),
      "@api": resolve(__dirname, "src/shared/api"),
      "@/lib": resolve(__dirname, "src/shared/lib"),
      "@/hooks": resolve(__dirname, "src/shared/hooks"),
      "@/components": resolve(__dirname, "src/shared/components"),
      "@app-providers": resolve(__dirname, "src/app/providers"),
      "@app-stores/": resolve(__dirname, "src/app/providers"),
      "@app": resolve(__dirname, "src/app"),
      "@router": resolve(__dirname, "src/router"),
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://backend:3000",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://backend:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
