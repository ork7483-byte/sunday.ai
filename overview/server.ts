import express from "express";
import { createServer as createViteServer } from "vite";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to download source code
  app.get("/api/download-source", (req, res) => {
    const archive = archiver("zip", {
      zlib: { level: 9 } // Sets the compression level.
    });

    res.attachment("project-source.zip");

    archive.pipe(res);

    // Append files from the current directory, excluding node_modules and .git
    archive.glob("**/*", {
      cwd: __dirname,
      ignore: ["node_modules/**", ".git/**", "dist/**", ".env", ".DS_Store"]
    });

    archive.finalize();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production (if built)
    app.use(express.static(path.join(__dirname, "dist")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
