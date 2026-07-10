// ──────────────────────────────────────────────────────────────
// Edge Function: send-contact-message
// Recebe o formulário de contacto do site (nome, email, mensagem)
// e envia um e-mail para a Susane via Resend.
//
// Segredos necessários:
//   RESEND_API_KEY -> chave da API Resend (re_...)
//   NOTIFY_EMAIL    -> opcional, e-mail que recebe a mensagem
//                      (default: lisbontuk4u@gmail.com)
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? "lisbontuk4u@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Método não permitido." }, 405);
  }

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY não configurada.");

    const { name, email, message, lang } = await req.json();
    const cleanName = String(name ?? "").trim().slice(0, 200);
    const cleanEmail = String(email ?? "").trim().slice(0, 200);
    const cleanMessage = String(message ?? "").trim().slice(0, 4000);

    if (!cleanName || !cleanEmail) throw new Error("Nome e e-mail são obrigatórios.");
    if (!EMAIL_RE.test(cleanEmail)) throw new Error("E-mail inválido.");

    const escape = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const html = `
      <h2>📬 Novo contacto pelo site — LisbonTuk4U</h2>
      <p><strong>Nome:</strong> ${escape(cleanName)}</p>
      <p><strong>E-mail:</strong> ${escape(cleanEmail)}</p>
      <p><strong>Idioma da página:</strong> ${escape(String(lang ?? "pt"))}</p>
      <hr>
      <p style="white-space: pre-wrap;">${cleanMessage ? escape(cleanMessage) : "(sem mensagem)"}</p>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LisbonTuk4U <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        reply_to: cleanEmail,
        subject: `Novo contacto: ${cleanName}`,
        html,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error("Falha ao enviar e-mail: " + errText);
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 400);
  }
});

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
