// build.js
import path from "path";
import { fileURLToPath } from "url";
import { build as viteBuild } from "vite";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1️⃣ Build the app (HTML + assets)
await viteBuild({
  configFile: path.resolve(__dirname, "vite.config.js"),
  build: {
    outDir: "build",
    emptyOutDir: true
  }
});

// 2️⃣ Build the library
await viteBuild({
  configFile: path.resolve(__dirname, "vite.config.js"),
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/rcl/index.js"),
      name: "pankosmia-rcl",
      fileName: (format) => `pankosmia-rcl.${format}.js`, // Fixed template literal
    },
    outDir: "dist",
    emptyOutDir: false, // keep assets
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});

console.log("✅ Build finished!");
