# LisbonTuk4U - Website de Passeios de Tuk-Tuk em Lisboa

Website ultrarrápido, otimizado para dispositivos móveis e focado na conversão de reservas de passeios turísticos por Lisboa, guiados pela experiente guia **Susane** a bordo do seu icónico **tuk-tuk azul florido**.

## 🚀 Funcionalidades
* **Design Premium & Responsivo**: Construído com Vanilla CSS, oferecendo carregamento instantâneo (First Contentful Paint otimizado) e interações desenhadas especificamente para ecrãs táteis (área de clique mínima de `44x44px`).
* **SEO Técnico Avançado**: Tags `hreflang` configuradas para 5 línguas nativas (Português, Inglês, Espanhol, Italiano e Francês) e microdados estruturados em JSON-LD (`TravelAgency` e `TouristAttraction` do Schema.org).
* **Motor de Reservas Dinâmico**: Integração com a API do Bókun através de um slider de duração de tour interativo e reativo com fallback offline automático.
* **Otimização Multimédia**: Galeria e banners convertidos integralmente para o formato WebP otimizado para web, reduzindo o tráfego móvel.

## 📁 Estrutura do Projeto
* [index.html](file:///c:/Users/berna/Projetos/LisbonTuk4U/index.html) - Esqueleto semântico da página principal e tags SEO.
* [index.css](file:///c:/Users/berna/Projetos/LisbonTuk4U/index.css) - Folha de estilos e sistema de design (variáveis, cores, layouts, slider).
* [js/main.js](file:///c:/Users/berna/Projetos/LisbonTuk4U/js/main.js) - Lógica de interações da barra de navegação móvel e consulta dinâmica do Bókun.
* [assets/img/](file:///c:/Users/berna/Projetos/LisbonTuk4U/assets/img) - Imagens otimizadas em formato WebP.
* [.agents/](file:///c:/Users/berna/Projetos/LisbonTuk4U/.agents) - Manuais de competências técnicas (skills) e manifesto do agente.

## 🛠️ Notas de Implantação (Staging / Production)
* **LiteSpeed Cache (Hostinger)**: É obrigatório colocar a URI `/api/*` e scripts dinâmicos de reserva na exclusão do cache (**"Do Not Cache URIs"**) para evitar falhas nas sessões de pagamento e exibição de horários indisponíveis.
* **Segurança Bókun**: A autenticação da API deve ser realizada sempre via proxy no servidor (PHP/Node.js) para proteger a Secret Key das chamadas públicas de cliente.
