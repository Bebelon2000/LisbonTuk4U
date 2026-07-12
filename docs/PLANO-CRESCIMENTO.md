# 📈 Plano de Crescimento — LisbonTuk4U

> Objetivo: **trazer o máximo de marcações para o site**, ganhando aos concorrentes no Google.
> Documento vivo — atualizar à medida que as ações são feitas.
> Última atualização: julho/2026.

---

## 🎯 Princípio orientador (ler primeiro)

Há duas formas de encher a agenda da Susane:

| Canal | Comissão | Volume | Esforço |
|---|---|---|---|
| **Reserva direta no site** | **0%** 🟢 | baixo (a crescer) | nosso |
| GetYourGuide / Viator / TripAdvisor | 20–30% 🔴 | alto | deles |

**Uma reserva direta vale ~1,3× uma reserva de OTA** (não paga comissão). Mas as OTAs trazem *descoberta* e *volume* — turistas que nunca ouviram falar de nós.

**A estratégia vencedora não é "site OU OTAs" — é usar as duas em conjunto:**
1. Estar bem posicionado nas OTAs para ser **descoberto**.
2. Encantar o cliente no tour.
3. Fazer a **2ª reserva e as recomendações** virem diretas ao site (sem comissão).

As duas primeiras marcações do site (a francesa que veio por email, o Stéphane) provam que o site **já converte**. Agora é escalar.

---

## 🔢 FASE 0 — MEDIR (fazer PRIMEIRO, tudo o resto depende disto)

> "Não se melhora o que não se mede." Neste momento estamos a decidir às cegas.

### Vale a pena o Google Analytics?
**Sim — mas só se medir CONVERSÕES, não só visitas.** Hoje o GA4 (`G-K877GXK16K`) está instalado em todas as páginas mas só conta *quantas pessoas visitaram*. Não sabemos o mais importante: **quantas quase reservaram e desistiram, e porquê.**

### O que falta configurar (posso implementar no código)
Eventos de conversão no GA4 — as "pegadas" do cliente pelo funil:

- [ ] `view_item` — abriu a página de um tour
- [ ] `begin_checkout` — abriu o formulário de reserva (clicou "Reservar")
- [ ] `add_payment_info` — chegou ao passo de pagamento
- [ ] `purchase` — **reserva paga** (com valor, tour e língua) ← a conversão que importa
- [ ] Cliques em **WhatsApp**, **telefone**, **email** e nos botões das **OTAs** (as classes `track-*` já existem no HTML, só falta ligá-las)

### O que vais poder responder depois disto
- Que tour é **mais visto** vs **mais reservado**? (às vezes o mais popular não é o que se pensa)
- Que **língua** converte melhor? (investir tradução onde há retorno)
- **Onde desistem?** (ex.: muitos abrem a reserva mas não pagam → problema no checkout ou no preço)
- **De onde vêm?** (Google, Instagram, OTA, direto)
- **Telemóvel vs computador?**

### Ferramenta extra grátis e MUITO reveladora
- [ ] **Microsoft Clarity** (clarity.microsoft.com) — grátis, sem limite. Dá **mapas de calor** (onde clicam) e **gravações de sessão** (ver o ecrã real do visitante). É mais fácil de "ler" que o GA4 e mostra logo onde as pessoas hesitam. **Recomendo fortemente** — instalo em 5 minutos.

**➡️ Ação nº1: dizer-me "implementa os eventos GA4 + Clarity" e trato disso.**

---

## 🔍 FASE 1 — GOOGLE (o canal nº1 para um negócio local)

### 1a. Google Business Profile — já estás a fazer, continuar 💪
A pesquisa "lisbontuk4u" já mostra o painel (5,0 · 92 opiniões · morada · fotos). Continuar:
- ✅ **Fotos diárias** — excelente hábito, manter.
- [ ] **Posts semanais** (Novidades/Ofertas): um tour em destaque, promoção de pôr do sol, etc. Mantém o perfil "vivo" aos olhos do Google.
- [ ] **Serviços com preço + link de reserva** para cada tour (Belém €180, Half Day €300…) a apontar para `lisbontuk4u.com`.
- [ ] **Perguntas & Respostas**: criar as próprias perguntas ("Fazem pick-up no hotel?", "Quantas pessoas cabem?") e respondê-las.
- [ ] **Botão de Reservas** ligado ao site.
- [ ] Responder a **100% das reviews** (ver Fase 2).

### 1b. Search Console — vigiar e afinar
- [ ] Ver semanalmente que **pesquisas** trazem cliques (Desempenho).
- [ ] Páginas com **muitas impressões mas poucos cliques** → melhorar o título/descrição (posso fazer).
- [ ] Confirmar que o favicon e o domínio novo estão totalmente indexados.

### 1c. SEO orgânico do site — o jogo de longo prazo
> ⚠️ Expectativa realista: SEO orgânico demora **3–6 meses** e competir com as OTAs nas palavras genéricas ("lisbon tuk tuk tour") é muito difícil. Ganha-se nos **nichos** e na **marca**.

- [ ] **Blog em INGLÊS** — hoje os 4 artigos são só em PT, mas o público é estrangeiro. Traduzir + criar novos. (posso fazer)
- [ ] **Páginas/artigos long-tail** (menos concorrência, mais intenção de compra):
  - "lisbon tuk tuk tour price" / "how much is a tuk tuk tour in lisbon"
  - "alfama tuk tuk tour", "belém tuk tuk", "lisbon sunset tuk tuk"
  - "tuk tuk vs walking tour lisbon", "best tuk tuk tour lisbon 2026"
- [ ] Reforçar **dados estruturados** (schema de Produto/Oferta com preço e reviews) para aparecer com estrelas e preço nos resultados. (posso fazer)

---

## ⭐ FASE 2 — REVIEWS (o motor que faz tudo girar)

92 reviews a 5,0 é um **ativo enorme** — é o que convence um estranho a confiar. Sistematizar:

- [ ] **Pedir review a TODOS os clientes no fim do tour**, na hora (é quando estão mais felizes). Um **cartão com QR code** que abre direto a página de review do Google.
- [ ] Pedir na **língua do cliente**.
- [ ] Espalhar por **Google + TripAdvisor + GetYourGuide** (não só num sítio).
- [ ] **Responder a todas** as reviews (mesmo as 5★) — conta para SEO e mostra cuidado.
- [ ] Meta simples: **+4 a +8 reviews novas por mês**. Em 6 meses passas de 92 para ~150.

**➡️ Posso desenhar o cartão de QR (review + reserva direta) para imprimir.**

---

## 🌍 FASE 3 — OTAs (TripAdvisor, GetYourGuide, Viator)

Papel delas: **descoberta e volume**. Não as ignorar — otimizar e usar como funil.

- [ ] **Perfis 100% completos**: fotos profissionais, descrição rica com palavras-chave, todas as perguntas respondidas, política de cancelamento clara.
- [ ] **Preços competitivos** vs concorrentes na mesma plataforma.
- [ ] **Responder a todas as mensagens rapidamente** (o tempo de resposta afeta o ranking nas OTAs).
- [ ] **Converter OTA → direto**: no fim do tour, o cartão QR também diz *"Da próxima vez reserve direto em lisbontuk4u.com — mesmo preço, e ajuda um negócio local"*. Cada cliente que volta direto poupa 20–30% de comissão.

---

## 🧲 FASE 4 — CONVERSÃO do site (transformar visitas em reservas)

O site já está bom e já converteu. Micro-melhorias que aumentam a taxa de reserva:

- [ ] **Prova social visível na homepage**: mostrar 2–3 reviews reais do Google *no próprio HTML* (não só o widget) — reforça confiança e ajuda o SEO.
- [ ] **Urgência honesta**: "restam X lugares para hoje" quando a disponibilidade estiver quase cheia (já temos o sistema de disponibilidade — dá para usar).
- [ ] **Recuperar quem desiste**: se o GA4/Clarity mostrar que muitos abrem a reserva e não pagam, agir nesse ponto (ex.: opção "pedir por WhatsApp/email" mais visível — foi assim que a francesa reservou!).
- [ ] **Foto e nome da Susane** ainda mais presentes — as pessoas reservam *pela pessoa*, não pela empresa. É o teu maior diferencial vs concorrentes anónimos.

---

## 🏆 Priorização — o que fazer primeiro (impacto × esforço)

| Prioridade | Ação | Impacto | Esforço | Quem |
|:---:|---|:---:|:---:|---|
| **1** | Eventos GA4 + Microsoft Clarity | 🟢🟢🟢 | baixo | eu |
| **2** | Cartão QR de review pós-tour | 🟢🟢🟢 | baixo | eu (design) + Susane (usar) |
| **3** | Google Business: posts + serviços + Q&A | 🟢🟢🟢 | médio | Susane |
| **4** | Responder a 100% das reviews | 🟢🟢 | baixo | Susane |
| **5** | Blog + páginas em inglês | 🟢🟢 | médio | eu |
| **6** | Schema de Produto/Oferta com preço | 🟢🟢 | baixo | eu |
| **7** | Prova social + urgência no site | 🟢🟢 | médio | eu |
| **8** | Otimizar perfis das OTAs | 🟢🟢 | médio | Susane |

---

## ✅ Próximos passos concretos

**Esta semana:**
1. Eu implemento os **eventos GA4 + Clarity** → começamos a ter dados reais.
2. Eu desenho o **cartão QR de review/reserva** para a Susane imprimir.
3. A Susane continua as fotos diárias + começa **1 post semanal** no Google Business.

**Este mês:**
4. Recolher os **primeiros dados** do GA4/Clarity e decidir o resto com base neles (não em suposições).
5. Começar o **blog em inglês** (traduzir os 4 + 2 novos long-tail).
6. Rotina de **reviews** ativa (meta: +1 por tour).

**Depois (com dados na mão):**
7. Investir onde os números mostrarem retorno (mais tradução? mais OTAs? mais SEO?).

---

## 📌 Notas
- **O que EU (código) posso fazer:** eventos GA4, Clarity, schema, blog EN, prova social, urgência, cartão QR.
- **O que só a SUSANE/tu podem fazer:** fotos, reviews, posts do Google Business, gestão dos perfis OTA, responder a clientes.
- Este ficheiro está em `docs/` e versionado no Git. Se não quiseres que fique acessível publicamente no site, é 1 linha no `.htaccess` — avisa.
