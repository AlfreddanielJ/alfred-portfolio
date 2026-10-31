/* Production endpoint for Vercel (POST /api/contact). The logic lives in server/contact.js,
   which the local Vite dev server also uses. Set RESEND_API_KEY and CONTACT_TO_EMAIL in the
   Vercel project's Environment Variables. */
import { handleContact } from "../server/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || "").split(",")[0].trim() || req.socket?.remoteAddress;
  const { status, body } = await handleContact({ body: req.body, env: process.env, ip });
  return res.status(status).json(body);
}
