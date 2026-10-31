import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleContact } from "./server/contact.js";

/* Serves POST /api/contact locally (dev and preview) with the same handler production uses.
   Secrets are read from .env.local on the server side only; nothing is exposed to the browser
   because none of these variables start with VITE_. */
function contactApi(mode) {
  const MAX_BODY = 20 * 1024;

  const middleware = async (req, res, next) => {
    if (!req.url || !req.url.startsWith("/api/contact")) return next();

    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    };

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return send(405, { error: "Method not allowed." });
    }

    let raw = "";
    let tooBig = false;
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > MAX_BODY) { tooBig = true; req.destroy(); }
    });
    req.on("end", async () => {
      if (tooBig) return;
      let body;
      try { body = JSON.parse(raw || "{}"); } catch { return send(400, { error: "Invalid request." }); }
      /* Read .env.local on every request, so pasting a key does not need a server restart. */
      const env = loadEnv(mode, process.cwd(), "");
      const { status, body: out } = await handleContact({ body, env, ip: req.socket.remoteAddress });
      send(status, out);
    });
  };

  return {
    name: "contact-api",
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}

export default defineConfig(({ mode }) => ({ plugins: [react(), contactApi(mode)] }));
