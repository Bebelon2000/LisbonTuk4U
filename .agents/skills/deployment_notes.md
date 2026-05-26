# Notas de Implantação e Otimização do Servidor (Hostinger)

Documento técnico de referência para a colocação em produção do site LisbonTuk4U na Hostinger.

## 1. Configuração do LiteSpeed Cache (LSCache)

> [!WARNING]
> A Hostinger utiliza servidores web LiteSpeed com o módulo **LSCache** ativado por padrão. Se as páginas de checkout ou chamadas dinâmicas da API de reservas forem colocadas em cache, isso quebrará as sessões de pagamento dos clientes e exibirá informações de disponibilidade incorretas.

### Regra Crítica de Cache
É **obrigatório** adicionar as seguintes URIs à lista de exclusão do cache (opção **"Do Not Cache URIs"** no painel da Hostinger/LiteSpeed):
* `/api/checkout/*`
* `/api/availability.php`
* `/api/pricing.php`
* Qualquer rota que lide com redirecionamento de pagamento e confirmação de reserva do Bókun.

---

## 2. Segurança da API Bókun & CORS

> [!CAUTION]
> A API v2 do Bókun exige autenticação baseada em assinatura SHA256 calculada com a **Secret Key** e **Access Key**. 
> **Nunca execute chamadas diretas do frontend (JavaScript do browser) para os servidores do Bókun.** Isso exporia as credenciais secretas do negócio no código fonte público.

### Arquitetura de Proxy Recomendada
1. Implementar um script intermediário leve no servidor Hostinger (ex: `api/availability.php` em PHP).
2. O script PHP recebe o `experienceId` e a `data` via POST/GET do frontend, calcula a assinatura HMAC-SHA256 no servidor e comunica de forma segura com `https://api.bokun.is`.
3. Retorna a resposta limpa para o JavaScript local.
