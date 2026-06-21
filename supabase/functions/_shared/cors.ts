// Cabeçalhos CORS partilhados pelas Edge Functions.
// O create-checkout-session é chamado pelo browser, por isso precisa de CORS.
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
