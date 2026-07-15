# Prompt para o Claude in Chrome — preparar a conta Google Ads

> Copia o bloco abaixo e cola no Claude in Chrome, com o Google Ads **já aberto e com sessão iniciada** na conta da LisbonTuk4U.

---

Estás a operar no **Google Ads** da LisbonTuk4U (passeios de tuk-tuk em Lisboa, site https://lisbontuk4u.com). Já tenho sessão iniciada. Preciso de preparar a conta para uma nova campanha de Pesquisa. **Não cries nem alteres campanhas** — só as três tarefas abaixo. Reporta-me tudo no fim.

## ⚠️ Regra de segurança (importante)
- **NUNCA introduzas tu os dados do cartão** (número, validade, CVV) nem outros dados de pagamento. Quando chegares ao passo do cartão, **para e diz-me para eu preencher** — eu escrevo os dados. Podes navegar até ao ecrã e explicar-me os campos, mas o cartão sou eu que meto.
- Não confirmes pagamentos, não aceites termos novos, não mudes definições de conta sem me perguntares primeiro.

## Tarefa 1 — Corrigir o método de pagamento
1. Vai a **Faturação → Definições de pagamento** (Billing).
2. Mostra-me qual é o problema atual (a conta diz "Não é possível fazer a cobrança no seu método de pagamento").
3. Leva-me ao ecrã para adicionar/atualizar o cartão e **para aí** — eu preencho os dados do cartão. Depois de eu preencher, confirma comigo antes de submeter.

## Tarefa 2 — Criar a ação de conversão (a parte mais importante)
Isto é o que permite medir reservas reais e não desperdiçar o orçamento.
1. Vai a **Ferramentas e definições → Medição → Conversões** (Tools → Conversions).
2. **Nova ação de conversão → Website.**
3. Se pedir o URL do site, usa `https://lisbontuk4u.com`.
4. Configura assim (ou o mais próximo possível):
   - **Objetivo / categoria:** Compra (Purchase).
   - **Nome:** `Reserva Paga`.
   - **Valor:** usar valores diferentes por conversão (o site envia o valor real da reserva).
   - **Contagem:** Uma (One) — cada reserva conta uma vez.
   - **Janela de conversão:** deixar o padrão (30 dias).
5. No passo da tag/etiqueta: escolhe **"Usar a tag do Google existente"** — o site já tem a tag `G-K877GXK16K` instalada. Não precisas de instalar nada novo.
6. **CRÍTICO — extrai e reporta-me estes dois valores** (aparecem no ecrã de configuração da tag/evento):
   - **ID de conversão** no formato `AW-XXXXXXXXX`
   - **Etiqueta de conversão** (Conversion label), algo como `abcDEfghIJ`
   Copia-os exatamente. Sem estes dois valores eu não consigo instalar a medição no site.

## Tarefa 3 — Pôr a campanha antiga em pausa
A campanha antiga `Campanha_LisbonTuk4U_04/05/25` tinha dois erros (pagamento falhado + URL de destino `lisbontuk4u.com/lisbontuk4u` que dá erro 404). Vamos criar uma nova de raiz, por isso:
1. Vai a **Campanhas**.
2. Confirma se essa campanha está **em pausa**. Se estiver ativa, **coloca-a em pausa** (para não gastar dinheiro a mandar cliques para a página partida).
3. Não a apagues — só pausar.

## Reporta-me no fim
- **Método de pagamento:** resolvido? (sim/não e o que faltou)
- **ID de conversão:** `AW-________`
- **Etiqueta de conversão:** `________`
- **Campanha antiga:** em pausa? (sim/não)

---

> Depois de me deres o **ID de conversão + etiqueta**, eu instalo a medição de conversão na página `reserva-confirmada.html` (dispara a reserva paga com o valor real). A seguir montamos juntos a campanha nova de Pesquisa (Marca + EN + PT).
