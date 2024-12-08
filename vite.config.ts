import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { getApiSwagger } from "./getApiSwagger";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "api-shema",
      enforce: "pre",
      async options() {
        await getApiSwagger();
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
