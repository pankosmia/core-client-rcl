import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isRcl = mode === "rcl";

  return {
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
    build: isRcl
      ? {
          outDir: "exported-rcl",
          emptyOutDir: true,
          sourcemap: true,

          rollupOptions: {
            external: ["react", "react-dom"],
            output: {
              name: "pankosmiaRcl",
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },

          lib: {
            entry: path.resolve(__dirname, "./src/rcl/index.js"),
            name: "pankosmiaRcl",
            fileName: (format) => `pankosmia-rcl.${format}.js`,
          },
        }
      : {
          outDir: "build",
          emptyOutDir: true,
          sourcemap: true,
        },

    base: "/clients/core-client-rcl/",
  };
});
