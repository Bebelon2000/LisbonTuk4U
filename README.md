# Handoff: Homepage "Azulejo & Sol" — LisbonTuk4U

> **Para o Claude Code:** Lê este documento por completo antes de editar. O objetivo é
> aplicar um novo visual ("Azulejo & Sol") ao site existente **alterando sobretudo
> `index.css` (tokens + regras de componentes) e ajustes pontuais de HTML**, mantendo
> intactos toda a estrutura semântica, os `id`/classes e a lógica de reservas em JS.
> **Não reescrever o site. Não tocar na lógica de marcação.**

---

## 1. Visão geral

O site funcional (HTML/CSS/JS vanilla, multilíngue, motor de reservas Bókun + Supabase +
modal de checkout) está bom na parte funcional, mas o frontend precisa de mais carácter.

Esta é uma renovação **puramente visual** da **homepage** (`index.html` + `index.css`),
seguindo uma direção aprovada pelo cliente: **"Azulejo & Sol"** — Lisboa autêntica e
editorial, tipografia serifada elegante, motivo subtil de azulejo, fundo azul-azulejo
suave, acentos em rosa (do logótipo) e terracota (telhados de Lisboa).

## 2. Sobre os ficheiros de design

Os ficheiros nesta pasta são **referências de design criadas em HTML** — protótipos que
mostram o aspeto e comportamento pretendidos, **não código de produção para copiar tal e
qual**. A tarefa é **recriar este visual no ambiente existente do site** (CSS vanilla com
variáveis, as classes que já existem), usando os padrões já estabelecidos no `index.css`.

- `Homepage A — Azulejo & Sol.dc.html` — o protótipo principal (referência visual).
- `Lisbon Tuk4U — Homepage.html` — versão autónoma (abre offline, útil para ver no telemóvel).
- `logo.png` — o logótipo com fundo **transparente** (o original era `.webp` com fundo preto).

## 3. Fidelidade

**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos e tratamentos estão finais.
Reproduz fielmente. Onde houver conflito entre o protótipo e a estrutura real, **mantém a
estrutura/IDs/JS reais** e adapta o estilo.

---

## 4. Sistema visual "Azulejo & Sol"

### 4.1 Tipografia
Adicionar duas famílias Google Fonts (manter as atuais como fallback se preferires):

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400..800&display=swap" rel="stylesheet">
```

- **`Instrument Serif`** (serifada, inclui itálico) → títulos de display e destaques.
  É uma fonte de peso único (400); o seu charme vem do tamanho grande, não do bold.
  Usar em: `.hero-title`, `.section-title`, `.tour-card-title`, `.ota-tour-title`,
  números de estatística grandes. Palavras de destaque vão a **itálico** (ex.: a palavra
  "autêntica" no h1, "recomenda", "60 segundos").
- **`Hanken Grotesk`** → corpo, labels, botões, eyebrows, metadados. Substitui o `Inter`.

### 4.2 Paleta — mapeamento direto sobre `:root` em `index.css`

Substituir os valores das variáveis existentes (mantendo os **nomes**, para o resto do CSS
continuar a funcionar) e **adicionar** uma variável de terracota:

| Variável (já existe)        | Valor atual   | **Novo valor** | Uso                                            |
|-----------------------------|---------------|----------------|------------------------------------------------|
| `--color-primary`           | `#1976D2`     | `#1C6FB0`      | Azul-azulejo (links, eyebrows de secção, ícones)|
| `--color-primary-light`     | `#2196F3`     | `#2E86C1`      | Azul mais claro / hovers                        |
| `--color-primary-dark`      | `#0D47A1`     | `#1B2A3A`      | Tinta naval — títulos, rodapé                   |
| `--color-accent`            | `#DB2777`     | `#ED4D96`      | **Rosa do logótipo** — CTAs principais          |
| `--color-accent-hover`      | `#B91C63`     | `#D43D83`      | Hover do rosa                                   |
| `--color-gold`              | `#F6B73C`     | `#E8A93B`      | Estrelas de avaliação                           |
| `--color-text-dark`         | `#11304E`     | `#1B2A3A`      | Texto principal                                 |
| `--color-text-light`        | `#4E6377`     | `#4A5A68`      | Texto secundário                                |
| `--color-bg-light`          | `#F6FAFE`     | `#EDF3F8`      | **Fundo azul-azulejo suave** (secções)          |
| `--color-hero-bg`           | `#EFF7FE`     | `#EDF3F8`      | Fundo do hero                                   |
| `--color-border`            | `#D5E5F4`     | `#DDE7F0`      | Bordas de cartões                               |

**Adicionar:**
```css
--color-terracotta: #C9603F;        /* botão primário do hero, acentos de telhado */
--color-terracotta-hover: #B5512F;
--font-display: 'Instrument Serif', Georgia, serif;
```
E trocar:
```css
--font-heading: 'Hanken Grotesk', sans-serif;   /* era 'Outfit' */
--font-body:    'Hanken Grotesk', sans-serif;   /* era 'Inter' */
```

> Nota: o rosa `#ED4D96` é mais vibrante que o `#DB2777` atual. Em texto pequeno sobre
> branco o contraste é menor — para microcópia usa preferencialmente `--color-primary-dark`
> e reserva o rosa para botões, números de preço e palavras de destaque grandes.

### 4.3 Motivo de azulejo (assinatura da marca)

Padrão SVG subtil usado no fundo do hero e no bloco de reserva. É um data-URI — podes
guardá-lo numa variável/classe utilitária:

```css
/* sobre fundo claro (hero) */
.azulejo-bg-blue {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46'%3E%3Cg fill='none' stroke='%232E86C1' stroke-width='1.2' stroke-opacity='0.18'%3E%3Ccircle cx='23' cy='23' r='8.5'/%3E%3Crect x='14.5' y='14.5' width='17' height='17' transform='rotate(45 23 23)'/%3E%3Cpath d='M0 23h6M40 23h6M23 0v6M23 40v6'/%3E%3C/g%3E%3C/svg%3E");
}
/* sobre fundo azul escuro (bloco de reserva): troca o stroke para %23ffffff e opacity 0.16 */
```
Aplicar com `-webkit-mask-image: linear-gradient(180deg,#000,transparent 78%)` para
desvanecer suavemente, como no protótipo.

### 4.4 Escala de tokens
- **Raio de cantos:** botões/pills `999px`; cartões `16–18px`; blocos grandes `26px`.
- **Sombras:** manter o sistema `--shadow-sm/md/lg` já existente (recolorido com o azul naval).
- **Espaçamento de secção:** manter `.section-container` (`3.5rem 1.25rem`, max `1200px`).

---

## 5. Mudanças por componente (mapeadas às classes REAIS)

> Editar as regras existentes; **não renomear classes**. Todas estas classes já existem
> em `index.css` / `index.html`.

### Header / Nav (`.site-header`, `.header-container`, `.hamburger-menu`)
- Fundo da landing já é semi-transparente — manter. Botão "Reservar" do header em `--color-accent` (rosa). Nada estrutural muda.

### Barra de promoção (`.promo-banner`, `.promo-msg`)
- Trocar o gradiente animado por **azul sólido `--color-primary`** (`#1C6FB0`), texto claro, com a palavra-chave em dourado `#FFD9A8`. Mais sóbrio e legível.

### Hero (`.hero-section`, `.hero-title`, `.hero-lead`, `.hero-img`, `.hero-collage`, `.hero-floating-review`, `.tuk-badge-floating`)
- Fundo da secção: `--color-hero-bg` + `.azulejo-bg-blue` desvanecido.
- `.hero-title`: trocar para `--font-display`, peso 400, ~`4.6rem` desktop, com uma palavra a `font-style:italic; color:--color-accent` (rosa). Estrutura sugerida do título editorial: *"A Lisboa **autêntica**, ao ritmo de quem cá vive."* — mas mantém o teu copy/SEO se preferires; o tratamento (serif + palavra rosa em itálico) é o que importa.
- `.hero-img`: moldura branca de `6px`, raio `18px`, e um **bloco azul deslocado** por trás rodado `-2.2deg` (`--color-primary`). Já existe `.hero-img` com sombra — adicionar a moldura e o bloco (via `::before` no contentor do showcase).
- `.hero-floating-review`: cartão branco flutuante (rating ★ + "Guia local certificada"), canto superior direito, animação `floaty` suave.
- **Cartão de preço flutuante** (canto inferior esquerdo): fundo **rosa `--color-accent`**, "desde €120 / tour privado". (No protótipo está €70; **usa os teus preços reais** — €120 a-la-carte / €180 etc.)
- Botão primário do hero "Ver os Passeios" → este é o único botão que vai a **terracota `--color-terracotta`** (destaque quente sobre o azul). Os restantes CTAs primários do site continuam rosa.

### Faixa de USPs (`.usp-band`, `.usp-item`, `.usp-icon`)
- Fundo branco, 4 colunas (já é). Títulos `.usp-item h3` em `--color-primary` a bold. Manter os SVG icons atuais.

### Cartões de passeio (`.tour-visual-card`, `.tour-card-title`, `.tour-card-price-badge`, `.best-seller-badge`, `.btn-saber-mais`)
- `.tour-card-title` → `--font-display` (serif).
- Borda `--color-border`, raio `18px`, sombra suave; no hover sobe (`translateY(-5px)`) — já existe.
- `.best-seller-badge` / `.tour-card-price-badge`: badge "★ Mais reservado" em `--color-primary`; preço a bold em tinta naval.
- Eyebrow `.section-eyebrow` em rosa (já usa `--color-accent`) — manter, fica coerente.

### Motor de reservas (`.booking-section`, `.ota-booking-widget`, `.ota-tour-card`, `.duration-pill`, `.time-slots-grid`, `.booking-filter-bar`)
- **Só estilo.** `.ota-tour-card.ota-featured` (Half Day) usa contorno rosa — manter com o novo `--color-accent`. `.duration-pill` selecionada → fundo rosa.
- O cabeçalho da secção pode ganhar o tratamento "Reserve em 60 segundos" (display serif), mas **a grelha, os `data-*`, os `id` e os `onclick` ficam exatamente como estão**.

### Reviews (`.reviews-section`, `.gr`, `.gr-grid`, `.gr-card`, `.gr-badge`)
- As reviews são **reais, via Google Places/Supabase** e injetadas em `#gr-grid` por JS — **não mexer no JS nem nos IDs**. Estilizar `.gr-card`: cartão branco, borda `--color-border`, estrelas em `--color-gold`, avatar com inicial em círculo colorido (alternar azul/rosa/terracota). Título da secção em serif, com a palavra "recomenda"/equivalente a rosa itálico.

### Sobre a Susane (`.about-section`, `.about-grid`, `.about-img`)
- Imagem emoldurada (moldura branca + leve bloco azulejo atrás). Título serif. Botão WhatsApp mantém o verde de marca do WhatsApp (`.btn-whatsapp`) — não trocar para rosa.

### Galeria (`.gallery-section`, `.gallery-teaser`, `.gallery-item`)
- Manter grelha; cantos `16px`, hover com leve zoom. Título serif.

### Footer (`.site-footer`, `.footer-*`)
- Fundo tinta naval `--color-primary-dark` (`#1B2A3A`), texto `#CDD7E2`. Logótipo (usar `logo.png` transparente). Manter colunas e links.

### Bloco CTA de reserva (se adicionado) / Sticky mobile (`.sticky-cta-mobile`)
- Sticky CTA mantém-se em rosa, full-width, ≥56px de altura (já cumpre o alvo de toque).

---

## 6. ⚠️ NÃO TOCAR (lógica e integrações)

Estes pontos garantem que as marcações continuam a funcionar. **Não alterar nomes, IDs,
atributos `data-*`, nem `onclick`:**

- **`js/main.js`** e **`js/payments-config.js`** — lógica de reservas, Bókun, slots,
  modal de checkout. Só editar JS se for estritamente necessário para um detalhe visual,
  e mesmo assim com cuidado.
- **Funções globais:** `openBookingOverlay('<tour-id>')` chamada nos `onclick` dos botões
  "Reservar agora".
- **IDs do motor OTA:** `#tours-ota-grid`, `#ota-<tour>`, `#slots-grid-<tour>`,
  `#booking-date`, `#booking-passengers`, `#multi-tuk-alert`, `#availability-status`.
- **Atributos de dados dos cards OTA:** `data-tour-id`, `data-tour-name`,
  `data-tour-duration-hours`, `data-base-price`, `data-is-a-la-carte`.
- **Modal/checkout:** `#checkout-modal-overlay`, `#stripe-form`, `#stripe-card-number`,
  `#stripe-pay-btn`, `#stripe-success`, e a `.booking-overlay` (`#booking-overlay-body`,
  injetada por JS).
- **Reviews reais:** `#google-reviews`, `#gr-grid`, `#gr-rating`, `#gr-stars`, `#gr-count`.
- **SEO/Analytics:** blocos `JSON-LD`, `hreflang`, GA4 — não remover.
- **Classes de tracking:** `track-whatsapp-click`, `track-google-click`,
  `track-tripadvisor-click`, `track-gyg-click`, `track-email-click`.
- **Preços reais** (não os do protótipo): à la carte €120–€360; Belém €180; Half Day €300
  (mais vendido); Centro Histórico €180; Miradouros €240; Full Lisboa €360. Grupos 6+ =
  2 tuk-tuks (preço a dobrar).

## 7. Multilíngue

A homepage tem espelhos em `en/`, `es/`, `it/`, `fr/` (e a raiz é PT). As mudanças de
**CSS aplicam-se automaticamente a todas** (partilham `index.css`). As mudanças de
**HTML estrutural** (ex.: nova moldura no hero) têm de ser **replicadas em cada idioma**,
traduzindo apenas o texto. Fazer PT primeiro, validar, depois propagar.

## 8. Assets

- **`logo.png`** (nesta pasta): logótipo com fundo transparente. O original do repo
  (`assets/img/logo-lisbontuk4u.webp`) tinha fundo preto sólido — recomenda-se substituir
  pela versão transparente para assentar sobre o fundo azul-azulejo claro e o rodapé naval.
- Fotos reais já existentes em `assets/img/*.webp` (hero-susane, hero-clients, tour-*,
  guia-susane, gallery/*) — **reutilizar**. O protótipo usa placeholders + uma foto real
  da Susane no hero; no site, manter as fotos `.webp` otimizadas que já tens.
- Fontes: Google Fonts `Instrument Serif` + `Hanken Grotesk` (ver 4.1).

## 9. Ficheiros do site a editar (no repo LisbonTuk4U)

- `index.css` — **o grosso do trabalho**: `:root` (tokens) + regras dos componentes acima.
- `index.html` — ajustes pontuais de marcação no hero (moldura/cartões) e, se quiseres,
  o tratamento editorial dos títulos. Restante estrutura mantém-se.
- `en/index.html`, `es/index.html`, `it/index.html`, `fr/index.html` — replicar os
  ajustes de HTML do hero, traduzindo o texto.
- (Opcional, fase 2) `tours/*.html` + `tours/tour-detail.css`, `about.html`,
  `contact.html`, `gallery.html` — herdam os tokens automaticamente; afinar depois.

## 10. Ordem sugerida de implementação

1. Adicionar os `<link>` das fontes e atualizar `:root` (tokens da secção 4.2 + adições).
2. Adicionar a classe utilitária `.azulejo-bg-blue` (4.3).
3. Hero: fundo azulejo, título serif, moldura + cartões flutuantes, botão terracota.
4. Faixa USP, cards de passeio, secção de reservas (só estilo), reviews, sobre, galeria, footer.
5. Verificar que **todas as marcações** (abrir overlay, escolher slot, checkout) continuam
   a funcionar e que nada nos IDs/`data-*`/JS foi alterado.
6. Replicar os ajustes de HTML do hero nos 4 idiomas.
7. Testar em mobile (o site já é mobile-first; confirmar alvos de toque ≥44px).

---

# FASE 2 — Página de tour + Fluxo de marcação

> Referência visual: **`Fase 2 — Tour & Marcacao.dc.html`** (3 telas: página de tour Half Day,
> marcação passos 1-3, checkout passo 4). Mesma regra de ouro: **só estilo; lógica intacta.**

## 11. Página de detalhe de tour (`tours/*.html` + `tours/tour-detail.css`)

Todas as 6 páginas de tour partilham `tour-detail.css` — **uma edição estiliza as seis.**
Herdam os tokens da Fase 1 automaticamente (mesmas variáveis `:root`). Ajustar estes
componentes (classes reais já existentes em `tour-detail.css`):

- `.td-hero` / `.td-hero-title`: hero com imagem real `.webp`, moldura branca `6px`, raio
  `18px`, gradiente naval em baixo; título em `--font-display` (serif). Badge "★ Mais
  vendido" (`.td-badge`) em `--color-gold` só na página Half Day.
- `.td-thumb-gallery` / `.td-thumb`: miniatura ativa com contorno `--color-accent` (rosa).
- `.td-quick-details` → chips arredondados (pills) brancos com borda `--color-border`.
- `.td-accordion` / `.td-accordion-title`: título serif; seta `⌃/⌄` em `--color-primary`;
  o itinerário pode listar em 2 colunas. **Manter o JS de abrir/fechar (toggle) intacto.**
- `.td-checkout-card` (sidebar sticky): preço grande a bold, lista de garantias com ✓
  verde, botão `RESERVE O TOUR AGORA` em `--color-accent` → mantém o `onclick`
  `openBookingOverlay('<tour-id>')` exatamente como está.
- `.td-related-section`: cards iguais aos da homepage (título serif, preço bold).
- **Preços reais por página:** Belém €180 · Centro Histórico €180 · Miradouros €240 ·
  Half Day €300 (mais vendido) · Full Lisboa €360 · À la carte €120 base.

## 12. Fluxo de marcação (overlay) — `js/main.js` `renderSteps()` + `index.css`

⚠️ **É tudo gerado por `js/main.js` (`openBookingOverlay` → `renderSteps`).** NÃO reescrever
o JS. O redesign é **CSS sobre as classes que o JS já emite** + (no máximo) ajustar o
*template string* de HTML dentro de `renderSteps` mantendo todos os `id`, `data-*` e
handlers. Os passos, na ordem exata que o teu código já segue:

1. **Duração** *(só tour "à la carte")* — pills 1h–5h → `.booking-duration-pill`
   (selecionada: fundo `--color-accent`).
2. **Data** — calendário `.booking-calendar`; dias passados desativados (`.is-disabled`);
   dia escolhido a rosa (`.is-selected`). Navegação de mês `‹ ›`.
3. **Hora** — slots de 30 min, `08:30` até `16:00/17:00` conforme a duração →
   `.booking-time-pill` (selecionada: borda + fundo rosa claro).
4. **Passageiros** — stepper `− N +` → `.booking-pax-stepper`. **Manter** o alerta
   `#multi-tuk-alert` ("grupos 6+ = 2 tuk-tuks") e o recálculo `preço × nº tuks`.
5. **Checkout** — `.booking-checkout-form`: nome, apelido, email, telemóvel, país, checkbox
   de termos. Inputs com borda `--color-border`, foco a `--color-primary`. Resumo lateral
   `.booking-tour-summary` (imagem + data/hora/pax + **Total**). Botão `CONFIRMAR RESERVA`
   em `--color-accent`. **Manter** os `id` dos campos e do Stripe (`#stripe-*`).
6. **Sucesso** — `.booking-success`: ✓ verde, mensagem, botão **WhatsApp** (verde de marca,
   `.track-whatsapp-click`). **Manter** o link/handler de WhatsApp.

**Tokens de marcação a respeitar:** passo ativo numerado em círculo `--color-primary`;
confirmações ✓ em verde `#2E9E5B`; botão "Continuar" pode ir a `--color-terracotta` para
o distinguir do CTA final rosa (opcional). Cantos `12–14px`, overlay branco raio `20px`.

## 13. Ordem sugerida — Fase 2

1. `tour-detail.css`: tokens já herdados → estilizar `.td-hero`, `.td-accordion`,
   `.td-checkout-card`, related. Testar numa página (ex.: `half-day.html`) e abrir o overlay.
2. `index.css` (secção de marcação): estilizar `.booking-*`. Abrir o overlay a partir de
   um card e **percorrer os 6 passos até ao sucesso**, confirmando que nada partiu.
3. Repetir/validar nas restantes páginas de tour (partilham CSS — deve ser automático).
4. Propagar quaisquer ajustes de HTML para os idiomas (`en/es/it/fr/tours/*`).

---

**Resumo:** é uma re-peagem (re-skin) guiada por tokens, em duas fases. Muda o CSS,
preserva a engenharia. Os protótipos `Homepage A — Azulejo & Sol.dc.html` e
`Fase 2 — Tour & Marcacao.dc.html` são as referências visuais finais.
