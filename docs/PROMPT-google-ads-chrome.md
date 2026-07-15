# Prompt para o Claude in Chrome — montar a campanha Google Ads (sem gastar ainda)

> **Ordem nova:** primeiro montamos a campanha (em pausa, sem cartão) + criamos a medição de conversão. O cartão virtual de €150 entra só no fim, e a campanha arranca a €5/dia com revisões semanais.
> Copia o bloco abaixo e cola no Claude in Chrome, com o Google Ads **aberto e com sessão iniciada** na conta da LisbonTuk4U.

---

Estás a operar no **Google Ads** da LisbonTuk4U — passeios privados de tuk-tuk elétrico em Lisboa, guia local Susane, site https://lisbontuk4u.com (páginas por idioma: `/` PT, `/en/` EN). Já tenho sessão iniciada.

Vamos **montar uma campanha de Pesquisa nova, deixando-a EM PAUSA / rascunho — sem gastar nada ainda**. NÃO adiciones cartão nem ativação de pagamento (eu meto um cartão virtual de €150 no fim). Confirma comigo em cada ecrã importante e **para antes de qualquer passo de faturação/publicação**.

## ⚠️ Regras de segurança
- **NUNCA introduzas dados de cartão/pagamento.** Se algum ecrã pedir cartão, **para e avisa-me** — eu trato disso mais tarde.
- Não publiques/ativual a campanha, não aceites termos novos, não mudes definições de conta sem me perguntares.
- Se o Google forçar faturação a meio da criação, **guarda como rascunho** e avisa-me — não avances.

## Tarefa 1 — Criar a ação de conversão (medir reservas reais)
1. **Ferramentas e definições → Medição → Conversões** → **Nova ação de conversão → Website**.
2. URL: `https://lisbontuk4u.com`.
3. Configura: objetivo **Compra (Purchase)**; nome **`Reserva Paga`**; valor **diferente por conversão**; contagem **Uma (One)**; janela padrão.
4. Na tag: **"Usar a tag do Google existente"** (o site já tem `G-K877GXK16K` — não instales nada novo).
5. **CRÍTICO — copia-me exatamente:** o **ID de conversão** (`AW-XXXXXXXXX`) e a **Etiqueta de conversão** (label, ex. `abcDEfghIJ`). Sem estes dois valores não consigo ativar a medição no site.

## Tarefa 2 — Montar a campanha de Pesquisa (deixar EM PAUSA)
Cria **uma campanha nova**. Quando pedir o objetivo, escolhe **"Criar campanha sem orientação de objetivo"** (para termos controlo total). Tipo: **Pesquisa (Search)**.

**Definições da campanha:**
- **Nome:** `LisbonTuk4U — Pesquisa Teste`
- **Redes:** desliga **"Rede de Display"** E **"Parceiros de pesquisa"** (só Pesquisa Google pura).
- **Localizações:** alvo = **Lisboa (cidade/distrito), Portugal**. Nas opções de localização escolhe **"Presença: pessoas que estão ou frequentam as localizações-alvo"** (NÃO "presença ou interesse"). ⚠️ Isto é crítico — apanha turistas já em Lisboa, que é quem reserva na hora.
- **Idiomas:** Inglês + Português.
- **Orçamento:** **€5/dia**.
- **Lances (bidding):** **"Maximizar cliques"** com **limite de CPC máximo de €1,20** (ou CPC Manual). NÃO uses "Maximizar conversões" ainda — não há dados de conversão.

**Grupo de anúncios 1 — "Tuk Tuk EN"** · URL final: `https://lisbontuk4u.com/en/`
Palavras-chave (usa aspas = frase e parênteses retos = exata):
```
"tuk tuk tour lisbon"
[tuk tuk tour lisbon]
"lisbon tuk tuk tour"
[private tuk tuk tour lisbon]
```

**Grupo de anúncios 2 — "Tuk Tuk PT"** · URL final: `https://lisbontuk4u.com/`
Palavras-chave:
```
"passeio de tuk tuk em lisboa"
[passeio de tuk tuk lisboa]
"tuk tuk lisboa"
```

**Palavras-chave NEGATIVAS (nível da campanha)** — adiciona todas:
```
alugar, aluguer, rent, rental, comprar, buy, venda, sale, emprego, job, driver, carta, licença, license, grátis, free, bangkok, tailândia, thailand, india, "segunda mão", used, usado
```

**Anúncio (RSA) do grupo EN** — URL final `https://lisbontuk4u.com/en/`
Títulos: `Private Tuk-Tuk Tour Lisbon` · `5.0★ · 98 Google Reviews` · `Free Hotel Pick-Up` · `Certified Local Guide` · `Free Cancellation 48h` · `Book Online in 2 Min` · `From €120 per Group (up to 5)`
Descrições: `Explore Alfama, Belém & the best viewpoints with local guide Susane. 100% electric.` · `Private tour, free hotel pick-up, free cancellation up to 48h. Book direct & save.`

**Anúncio (RSA) do grupo PT** — URL final `https://lisbontuk4u.com/`
Títulos: `Tuk-Tuk Privado em Lisboa` · `5,0★ · 98 Avaliações Google` · `Pick-up Grátis no Hotel` · `Guia Local Certificada` · `Cancelamento Grátis 48h` · `Reserve Online em 2 Min` · `Desde €120 por Grupo (até 5)`
Descrições: `Explore Alfama, Belém e os melhores miradouros com a guia local Susane. 100% elétrico.` · `Tour privado, pick-up grátis no hotel, cancelamento até 48h. Reserve direto.`

**Se houver tempo (opcional, ajuda muito):** adiciona extensões — Sitelinks (Belém, Half Day, Galeria, Contacto), Extensão de chamada (+351 966 697 738), e liga a Extensão de Localização ao Perfil de Empresa do Google.

➡️ No fim, **NÃO publiques**. Deixa a campanha **EM PAUSA** (ou guarda como rascunho) e avisa-me.

## Tarefa 3 — Pausar a campanha antiga
`Campanha_LisbonTuk4U_04/05/25` tinha pagamento falhado + URL 404. Confirma que está **em pausa** (se ativa, pausa-a — não apagues).

## Reporta-me no fim
- **ID de conversão:** `AW-________` · **Etiqueta:** `________`
- **Campanha nova:** montada e em pausa? Alguma coisa que o Google não deixou fazer sem cartão?
- **Campanha antiga:** em pausa?

---

## 📅 Plano depois disto (não é para o Claude in Chrome — é o nosso plano)
1. Tu dás-me o **ID + etiqueta** → eu instalo a medição de conversão em `reserva-confirmada.html`.
2. Tu crias o **cartão virtual de €150** e adiciona-lo à conta.
3. **Ativamos a campanha a €5/dia.**
4. **Revisão semanal** (termo de pesquisa a termo de pesquisa): cortar o que não presta, reforçar o que traz cliques/reservas.
5. Se a semana 1 correr bem (cliques relevantes, algum contacto/reserva) → subir para **€10/dia**. E por aí adiante, sempre com o teto dos €150 e com dados na mão.
