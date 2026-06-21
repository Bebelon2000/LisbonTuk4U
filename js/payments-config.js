/**
 * Configuração PÚBLICA de pagamentos (Stripe via Supabase).
 *
 * ┌───────────────────────────────────────────────────────────────┐
 * │ ESTE FICHEIRO É PÚBLICO. Só pode conter chaves PÚBLICAS.       │
 * │ A chave SECRETA da Stripe (sk_...) NUNCA vai aqui — fica       │
 * │ guardada no Supabase (supabase secrets set STRIPE_SECRET_KEY). │
 * └───────────────────────────────────────────────────────────────┘
 *
 * Como ativar (ver PAGAMENTOS-SETUP.md):
 *   1. Cria o projeto Supabase e faz deploy das Edge Functions.
 *   2. Cola aqui o URL do projeto e a chave anon (ambas públicas).
 *   3. Muda `enabled` para true.
 *
 * Enquanto `enabled` for false, o site continua a funcionar com a
 * confirmação simulada (sem cobrar nada).
 */
window.LISBONTUK_PAYMENTS = {
  enabled: true,
  supabaseUrl: "https://pvgwxnvcuhfregfjhgnk.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Z3d4bnZjdWhmcmVnZmpoZ25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NTE1ODgsImV4cCI6MjA5NzAyNzU4OH0.UdWEMRFxe6cUEOAqbPR7WHR8rsnkQ5IByv1d7TOM0MA",
};
