import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('react-router-dom') || id.includes("@remix-run") || id.includes('react-router')) {
            return '@react-router'
          }

          if (id.includes('swiper')) {
            return '@swiper'
          }
          if (id.includes('axios')) {
            return '@axios'
          }
          if (id.includes('@dicebear')) {
            return '@dicebear'
          }
          if (id.includes('lodash')) {
            return '@lodash'
          }
          if (id.includes("victory")) {
            return '@victory'
          }
          if (id.includes("exiftool-vendored")) {
            return '@exiftool-vendored'
          }
        }
      }
    }
  }
});
