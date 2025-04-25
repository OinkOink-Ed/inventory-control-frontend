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
      "@api": path.resolve(__dirname, "./src/app/api"),
      "@Layouts": path.resolve(__dirname, "./src/app/Layouts"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/app/pages"),
      "@loaders": path.resolve(__dirname, "./src/app/routes/loaders"),
      "@helpers": path.resolve(__dirname, "./src/app/helpers"),
      "@lazyImports": path.resolve(__dirname, "./src/app/lazyImports.ts"),
    },
  },
});
