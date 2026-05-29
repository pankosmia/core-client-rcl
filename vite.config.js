import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Unique port for new_project
    strictPort: true,
    host: true,
    cors: true,
    origin: "http://localhost:8000",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:19119", // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
      },
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      /*      output: {
        name: "pankosmia-rcl",
        globals: { 'react': 'React', 'react-dom': 'ReactDom' }
      }*/
    },
    lib: {
      entry: path.resolve(__dirname, "./src/rcl/index.js"),
      name: "pankosmia-rcl",
      fileName: (format) => `pankosmia-rcl.${format}.js`,
    },
  },
  base: "/clients/core-client-rcl/",
});
