// ──────────────────────────────────────────────────────────────
// Edge Function: google-reviews
// Vai buscar ao Google (Places API New) a nota, o número REAL de
// avaliações e até 5 comentários reais, e devolve-os ao site.
// A chave do Google fica SÓ aqui (server-side), nunca no frontend.
//
// Segredos (supabase secrets set ...):
//   GOOGLE_MAPS_API_KEY -> chave da Places API (New)
//   GOOGLE_PLACE_ID     -> opcional; por defeito o Place ID da LisbonTuk4U
//
// Cache em memória (6h) para não gastar quota e responder rápido.
// Em caso de erro do Google, devolve a última cache (mesmo expirada).
// ──────────────────────────────────────────────────────────────
import { corsHeaders } from "../_shared/cors.ts";

const API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY") ?? "";
const PLACE_ID = Deno.env.get("GOOGLE_PLACE_ID") ??
  "ChIJeeURJo8zGQ0RWeTL8MF73v4";

const cors = { ...corsHeaders, "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
const TTL_MS = 6 * 60 * 60 * 1000; // 6 horas

interface ReviewsBody {
  rating: number | null;
  total: number | null;
  mapsUri: string | null;
  name: string | null;
  reviews: Array<{
    author: string;
    photo: string | null;
    profile: string | null;
    rating: number;
    text: string;
    time: string;
  }>;
  updatedAt: string;
}

let cache: { at: number; body: ReviewsBody } | null = null;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  // Cache quente -> resposta imediata
  if (cache && Date.now() - cache.at < TTL_MS) {
    return json(cache.body, 200, "hit");
  }

  try {
    if (!API_KEY) throw new Error("GOOGLE_MAPS_API_KEY não configurada.");

    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}` +
      `?languageCode=pt&regionCode=PT`;
    const resp = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    const p = await resp.json();
    if (!resp.ok) {
      throw new Error(p?.error?.message ?? `Google Places HTTP ${resp.status}`);
    }

    const reviews = (Array.isArray(p.reviews) ? p.reviews : [])
      .map((r: Record<string, any>) => ({
        author: r.authorAttribution?.displayName ?? "Cliente Google",
        photo: r.authorAttribution?.photoUri ?? null,
        profile: r.authorAttribution?.uri ?? null,
        rating: typeof r.rating === "number" ? r.rating : 5,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        time: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r: { text: string; rating: number }) => r.text && r.rating >= 4)
      .slice(0, 6);

    const body: ReviewsBody = {
      rating: typeof p.rating === "number" ? p.rating : null,
      total: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
      mapsUri: p.googleMapsUri ?? null,
      name: p.displayName?.text ?? null,
      reviews,
      updatedAt: new Date().toISOString(),
    };

    cache = { at: Date.now(), body };
    return json(body, 200, "miss");
  } catch (e) {
    // Falha do Google -> serve a última cache se existir
    if (cache) return json(cache.body, 200, "stale");
    return json(
      { error: e instanceof Error ? e.message : String(e) },
      502,
      "error",
    );
  }
});

function json(body: unknown, status: number, cacheState: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Content-Type": "application/json",
      "X-Cache": cacheState,
      // Permite cache no browser/CDN por 1h (reduz chamadas)
      "Cache-Control": "public, max-age=3600",
    },
  });
}
