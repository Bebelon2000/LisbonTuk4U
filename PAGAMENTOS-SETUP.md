# 💳 Pagamentos reais — Guia de configuração (Stripe + Supabase)

Este guia liga o site ao **Stripe** (pagamentos) através de uma função
**Supabase** (servidor). Enquanto não estiver configurado, o site continua
a funcionar com a confirmação **simulada** (não cobra nada).

> **Regra de ouro de segurança:** a chave **secreta** da Stripe (`sk_...`)
> **nunca** entra neste repositório nem no `payments-config.js`. Fica
> guardada apenas no Supabase. Só as chaves **públicas** vão para o site.

---

## Arquitetura (resumo)

```
Browser (overlay de reserva)
   │  envia tour + data + hora + passageiros + contacto
   ▼
Supabase Edge Function  create-checkout-session
   │  RECALCULA o preço (multi-tuk) e cria a Stripe Checkout Session
   ▼
Stripe (página de pagamento segura)  →  cliente paga
   │
   ├─► redireciona para  /reserva-confirmada.html
   └─► evento "checkout.session.completed"
          ▼
       Supabase Edge Function  stripe-webhook  →  grava em `bookings`
```

---

## Passo 1 — Conta Stripe (modo de teste)
1. Entra em [dashboard.stripe.com](https://dashboard.stripe.com) e ativa o **modo de teste** (toggle no canto).
2. Em **Developers → API keys**, copia:
   - **Secret key** → `sk_test_...` (vai para o Supabase, passo 4)

## Passo 2 — Projeto Supabase
1. Cria um projeto em [supabase.com](https://supabase.com) (plano grátis chega).
2. Em **Project Settings → API**, copia:
   - **Project URL** → `https://xxxx.supabase.co`
   - **anon public key** → (chave pública, vai para o site)
3. Em **SQL Editor**, cola e corre o conteúdo de
   [`supabase/migrations/0001_bookings.sql`](supabase/migrations/0001_bookings.sql) (cria a tabela `bookings`).

## Passo 3 — Instalar a CLI e ligar o projeto
```bash
npm install -g supabase
supabase login
supabase link --project-ref <ID-DO-TEU-PROJETO>
```
(o `project-ref` está no URL do painel: `https://supabase.com/dashboard/project/<ref>`)

## Passo 4 — Guardar os segredos no Supabase (NÃO no site)
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_xxxxxxxx
supabase secrets set SITE_URL=https://tours.lisbontuk4u.com
# (o STRIPE_WEBHOOK_SECRET é adicionado no passo 6)
```

## Passo 5 — Deploy das Edge Functions
```bash
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook --no-verify-jwt
```
> O `--no-verify-jwt` no webhook é **obrigatório** — a Stripe não envia
> token de autenticação; a segurança vem da verificação da assinatura.

## Passo 6 — Criar o webhook na Stripe
1. Em **Developers → Webhooks → Add endpoint**.
2. **Endpoint URL:**
   `https://xxxx.supabase.co/functions/v1/stripe-webhook`
3. **Eventos a escutar:** `checkout.session.completed`.
4. Copia o **Signing secret** (`whsec_...`) e guarda-o no Supabase:
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
```
(volta a fazer `supabase functions deploy stripe-webhook --no-verify-jwt` se o tiveres feito antes de definir o segredo.)

## Passo 7 — Ativar no site
Edita [`js/payments-config.js`](js/payments-config.js):
```js
window.LISBONTUK_PAYMENTS = {
  enabled: true,
  supabaseUrl: "https://xxxx.supabase.co",
  anonKey: "a-tua-anon-public-key",
};
```

## Passo 8 — Testar (modo de teste, sem dinheiro real)
1. Abre o site, escolhe um tour, data/hora/passageiros e avança para o checkout.
2. Na página da Stripe usa o **cartão de teste**: `4242 4242 4242 4242`,
   validade qualquer futura, CVC qualquer, código postal qualquer.
3. Confirma:
   - redireciona para **/reserva-confirmada.html**;
   - aparece uma linha nova na tabela **bookings** do Supabase;
   - o pagamento aparece no **Stripe → Payments** (modo de teste).

---

## Passar para produção (quando estiver tudo testado)
1. Na Stripe, desliga o modo de teste e copia a **Secret key** real (`sk_live_...`).
2. Cria um **webhook live** (mesmo URL) e copia o novo `whsec_...`.
3. Atualiza os segredos: `supabase secrets set STRIPE_SECRET_KEY=sk_live_...`
   e `STRIPE_WEBHOOK_SECRET=whsec_...` (live), e volta a fazer deploy do webhook.
4. As chaves no `payments-config.js` (URL + anon) mantêm-se.

## Notas
- **Preço seguro:** o valor é sempre recalculado em
  [`supabase/functions/_shared/pricing.ts`](supabase/functions/_shared/pricing.ts).
  Se mudares preços, atualiza **aqui** e em `js/main.js` (TOUR_DATA).
- **Recibos:** a Stripe envia o recibo ao cliente automaticamente
  (ativa em *Settings → Customer emails*). Tu vês cada venda no painel Stripe
  e cada reserva na tabela `bookings`.
- **Disponibilidade:** ainda não é em tempo real — as reservas entram todas.
  Quando quiseres, adicionamos verificação de disponibilidade antes do pagamento.
- **Mudar de domínio** (de `tours.lisbontuk4u.com` para o final): muda o
  segredo `SITE_URL` no Supabase e o ID/medição do Google se necessário.
