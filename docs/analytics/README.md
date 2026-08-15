# 📊 Observatório LisbonTuk4U — metodologia e como ler

> Registo permanente do desempenho de aquisição (Google Ads) e de comportamento (Microsoft Clarity).
> Objetivo: **nunca perder o fio dos dados** e decidir sempre com base em evidência, não em intuição.

---

## Como está organizado

| Ficheiro | O que é | Quando se mexe |
|---|---|---|
| `README.md` (este) | Metodologia, definições, regras de decisão | Raramente — só se mudarmos a forma de medir |
| `HISTORICO.md` | **Série temporal consolidada.** Uma linha por revisão. É aqui que se vê a tendência | **Todas as revisões** (acrescentar linha) |
| `AAAA-MM-DD.md` | Snapshot detalhado de cada revisão: números completos, análise, decisões tomadas | Um novo por revisão |

**Regra:** o `HISTORICO.md` é a fonte de verdade para tendências; os snapshots guardam o detalhe e o raciocínio.

---

## Cadência

Ads e Clarity atualizam-se **na mesma data, sempre juntos**. Uma fonte sem a outra dá conclusões erradas:
- O **Ads** diz *quanto custa* e *o que converte* — mas não diz porquê.
- O **Clarity** diz *o que as pessoas fazem* — mas não sabe quanto custou.

Ritmo alvo: **a cada 5–7 dias** durante a fase de otimização.

---

## Definições (para não haver ambiguidade)

| Termo | Definição exata |
|---|---|
| **Conversão** | No Ads: `Reserva Paga` (compra concluída no site, com valor) ou `Contacto WhatsApp/Email` (clique em WhatsApp/email/telefone). **Cliques para OTAs não contam.** |
| **ROAS** | Receita atribuída ÷ custo dos anúncios. >1 = os anúncios pagam-se. |
| **Custo/conversão (CPA)** | Custo total ÷ conversões. **Teto de referência: €50** (acima disso a OTA sai mais barata que o Ads). |
| **Taxa de abertura do checkout** | Sessões com evento `Verificar disponibilidade` ÷ sessões totais. |
| **Taxa de conclusão do checkout** | Reservas ÷ sessões que abriram o checkout. É aqui que se vê fricção real. |
| **Profundidade de scroll** | % da página vista em média. <35% ≈ só veem o topo. |

---

## Regras de decisão (definidas ANTES de ver os dados, para não haver viés)

1. **Nunca decidir por CTR isolado.** Lição aprendida a 15/08: o CTR mede atenção, não intenção de compra. Os nichos FR/ES/IT tinham 2–3× o CTR do EN e convertiam ~8× pior. **A métrica que manda é o custo por conversão.**
2. **Não pausar um braço com <60 cliques e 0 conversões.** Zero conversões em 30–60 cliques é estatisticamente compatível com uma taxa normal de 1–2%. Cortar aí é decidir com ruído.
3. **Realocar não exige significância estatística.** Com orçamento pequeno, esperar por p<0,05 custa mais do que agir cedo. Segue-se lógica de *multi-armed bandit*: deslocar orçamento para o braço melhor **mantendo exploração** no outro. Sempre reversível.
4. **Sempre reportar a incerteza.** Se n é pequeno, dizê-lo. Um ponto estimado sem intervalo é meia verdade.
5. **Duas fontes independentes a apontar no mesmo sentido** valem mais que uma fonte com muitos dados. (Ex.: Ads *e* Clarity concordarem que o EN converte melhor.)

---

## Limitações conhecidas dos dados (ler antes de tirar conclusões)

- **Bloqueadores de anúncios**: 10–30% dos visitantes não são contados nem pelo GA4 nem pelo Ads. Os números reais são provavelmente **melhores** que os reportados. (O Clarity é menos afetado.)
- **Atribuição fracionada**: o Ads divide o crédito de uma conversão entre vários toques (por isso aparecem valores como 0,50). Não é erro.
- **Contactos por WhatsApp** só passaram a ser medidos como conversão a partir de **01/08/2026**. Antes disso existiam mas eram invisíveis para o Ads.
- **Amostras pequenas**: em quase tudo até agora, n < 10 conversões. Tratar como direcional.
