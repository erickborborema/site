import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: any[] = [react()];
  
  // Only load lovable-tagger in development mode
  if (mode === "development") {
    try {
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch (e) {
      // Silently ignore if lovable-tagger fails to load
      // This can happen in CI/CD environments or if the package is not available
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.PNG"],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-select'],
            animations: ['framer-motion'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
    },
  };
});
