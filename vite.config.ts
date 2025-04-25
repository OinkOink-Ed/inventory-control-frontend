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
      "@/*": path.resolve(__dirname, "./shudcn/*"),
      "@api": path.resolve(__dirname, "./app/api"),
      "@Layouts": path.resolve(__dirname, "./app/Layouts"),
      "@pages": path.resolve(__dirname, "./app/pages"),
      "@loaders": path.resolve(__dirname, "./app/routes/loaders"),
      "@helpers": path.resolve(__dirname, "./app/helpers"),
      "@lazyImports": path.resolve(__dirname, "./app/lazyImports.ts"),
      "@stores": path.resolve(__dirname, "./app/stores"),
    },
  },
});
