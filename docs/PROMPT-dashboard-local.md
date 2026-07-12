# 🧰 Prompt guardado — Dashboard local (para o FUTURO)

> **Não fazer já.** Este é o prompt/especificação para quando decidires
> construir um painel local. Cola-o para mim (Claude) quando quiseres avançar.
>
> **Recomendação atual:** ainda é cedo (poucas reservas). Primeiro deixa o
> GA4 + Clarity recolherem 2–4 semanas. Se depois quiseres um painel único,
> considera o **Looker Studio** (grátis do Google, liga ao GA4 sem código)
> antes de investir num dashboard próprio.

---

## Quando vale a pena um dashboard local próprio
- Já tens **volume** (dezenas de reservas/mês).
- Queres **cruzar dados** que nenhuma ferramenta isolada junta: reservas do
  Supabase + receita Stripe + comissões das OTAs + reviews + ocupação da agenda.
- Queres ver tudo **offline no teu PC**, sem depender de 4 abas diferentes.

## Prompt a usar (copiar quando decidires)

```
Quero construir um dashboard LOCAL (corre no meu PC, vejo em localhost) para
centralizar os dados do LisbonTuk4U. Requisitos:

FONTE DE DADOS
- Ler as reservas da tabela `bookings` do Supabase (projeto pvgwxnvcuhfregfjhgnk),
  via uma Edge Function nova e segura que exija uma chave só minha (não a anon
  pública) — os dados dos clientes NÃO podem ficar expostos publicamente.
- Opcional: juntar dados do Stripe (payouts, taxas) e do GA4 se der.

MÉTRICAS A MOSTRAR
- Receita total e por mês.
- Nº de reservas e valor médio por reserva.
- Tours mais vendidos (ranking) e mais vistos vs mais reservados.
- Reservas por língua do cliente e por país.
- Ocupação da agenda (dias/horas mais procurados).
- Taxa de conversão (begin_checkout -> purchase) se cruzar com o GA4.

FORMA
- Página local simples (HTML+JS, ou pequeno servidor Node/Python), corre em
  localhost, sem precisar de deploy.
- Tabelas + 2 ou 3 gráficos simples.
- Botão de "atualizar" que vai buscar os dados frescos.

SEGURANÇA
- Nada de credenciais no código versionado. A chave de acesso fica só no meu
  ambiente local (.env fora do git).
- A Edge Function de leitura tem de validar essa chave antes de devolver dados.

Antes de programar, propõe-me a arquitetura e confirma comigo.
```

## Alternativa sem código (mais rápida, para começar)
- **Looker Studio** (lookerstudio.google.com) — grátis, liga ao GA4 em minutos,
  arrastar-e-largar. Bom para ver receita/conversões/origens sem construir nada.
- Limite: não lê o Supabase/Stripe diretamente sem conectores extra — por isso
  o dashboard próprio só se justifica quando quiseres MESMO juntar tudo.
