import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
    allowedHosts: ["0.0.0.0"],
  },
  resolve: {
    alias: {
      "@assets": path.resolve(
        __dirname,
        "./src/assets"
      ),
      "@widgets": path.resolve(
        __dirname,
        "./src/widgets"
      ),
      "@entities": path.resolve(
        __dirname,
        "./src/entities"
      ),
      "@pages": path.resolve(
        __dirname,
        "./src/pages"
      ),
      "@features": path.resolve(
        __dirname,
        "./src/features"
      ),
      "@ui": path.resolve(
        __dirname,
        "./src/shared/ui"
      ),
      "@hooks": path.resolve(
        __dirname,
        "./src/shared/hooks"
      ),
      "@api": path.resolve(
        __dirname,
        "./src/shared/api"
      ),
      "@layouts": path.resolve(
        __dirname,
        "./src/app/layouts"
      ),
      "@routes": path.resolve(
        __dirname,
        "./src/app/routes"
      ),
      "@redux/store": path.resolve(
        __dirname,
        "./src/app/redux/stores"
      ),
      "@contexts": path.resolve(
        __dirname,
        "./src/app/contexts"
      ),
      "@interfaces": path.resolve(
        __dirname,
        "./src/shared/interfaces"
      ),
    },
  },
  plugins: [react()],
});
