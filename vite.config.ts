import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";
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
    // tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
