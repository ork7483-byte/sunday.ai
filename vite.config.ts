import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
      dedupe: ['react', 'react-dom', 'framer-motion'],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          careers: path.resolve(__dirname, "careers/index.html"),
          journal: path.resolve(__dirname, "journal/index.html"),
          beta: path.resolve(__dirname, "beta/index.html"),
          overview: path.resolve(__dirname, "overview/index.html"),
          support: path.resolve(__dirname, "support/index.html"),
        },
      },
    },
  };
});
