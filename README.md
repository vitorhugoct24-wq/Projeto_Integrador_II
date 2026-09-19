# 📚 CTBJeca — Biblioteca Virtual Escolar do CTBJ

Sistema de catálogo digital e portal da biblioteca do CTBJ (Colégio Técnico de Bom Jesus, Piauí), 
desenvolvido como Projeto Integrador II do curso Técnico em Informática.

🔗 **Acesse o protótipo online:** https://vitorhugoct24-wq.github.io/Projeto_Integrador_II/

## Sobre o projeto

O CTBJeca nasceu como uma plataforma de consulta de disponibilidade de livros, mas foi redesenhado 
para resolver um problema real identificado na validação com a comunidade escolar: a maioria dos 
alunos não sabe o que quer ler, e um catálogo de busca tradicional só ajuda quem já sabe o que 
procura. Por isso, o sistema combina busca direta com uma camada de descoberta e recomendação 
(quiz de descoberta, curadoria do bibliotecário, recomendações baseadas em uso real).

O escopo também foi expandido para um portal completo da biblioteca: acervo de jogos de mesa e 
instrumentos musicais, módulo de achados e perdidos, e interação social entre alunos via comentários.

## Objetivos

- Facilitar a descoberta de leitura para alunos que não sabem o que procurar.
- Digitalizar o controle de disponibilidade e empréstimo do acervo (livros, jogos e instrumentos).
- Centralizar achados e perdidos da escola em um só lugar.
- Oferecer acesso multi-canal: totem/tablet fixo na biblioteca (modo quiosque) e navegador comum 
  fora da escola.

## Equipe

- [Nome do(s) integrante(s) do grupo]

## Documentação

- [`/docs/requisitos.md`](./docs/requisitos.md) — requisitos funcionais e não funcionais
- [`ARQUITETURA.md`](./ARQUITETURA.md) — fluxogramas de uso e modelo de dados (Mermaid)
- [`/docs/testes.md`](./docs/testes.md) — relatório de validação e testes

## Gestão do projeto

Board Kanban no Trello: https://trello.com/b/1KPuoH9i/ctbjeca-planejamento

## Sobre a hospedagem

O projeto foi testado em serviços de hospedagem gratuitos (Vercel e Netlify) durante o 
desenvolvimento, mas foram encontradas limitações (limite de uso na Vercel; erro 404 por 
conflito na estrutura de subpastas na Netlify). Diante disso, optou-se por publicar o protótipo 
via **GitHub Pages**, com deploy automatizado por GitHub Actions a cada push na branch `main` 
(ver `.github/workflows/`). O site é gerado como exportação estática do Next.js.

## Como executar o protótipo localmente

O protótipo (`/src`) foi desenvolvido em **Next.js** com **Tailwind CSS** e componentes shadcn/ui.

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

\`\`\`bash
cd src
pnpm install
\`\`\`

### Rodando em ambiente de desenvolvimento

\`\`\`bash
pnpm dev
\`\`\`

Acesse `http://localhost:3000` no navegador.

### Build de produção (estático)

\`\`\`bash
pnpm build
\`\`\`

Gera a pasta `src/out` com o site estático, pronta para qualquer hospedagem estática.

## Telas disponíveis

| Rota | Descrição |
|---|---|
| `/` | Home com curadoria e destaques |
| `/busca` | Busca direta e por exploração |
| `/item/[id]` | Detalhes de um item do acervo |
| `/quiz` | Quiz de descoberta |
| `/painel` | Painel do aluno |
| `/achados-e-perdidos` | Lista de achados e perdidos |
| `/totem` | Interface adaptada para o totem/tablet da biblioteca |

## Status atual (v1.0.0-beta)

Implementado no protótipo: busca (direta e por exploração), detalhes do item, status de 
disponibilidade, painel do aluno, reserva de exemplares (simulada), recomendações e curadoria, 
quiz de descoberta, acervo expandido (jogos e instrumentos), achados e perdidos, e modo totem.

Ainda não implementado (pendências rastreadas no Trello): autenticação/login, painel 
administrativo de CRUD, controle de empréstimo/devolução pelo bibliotecário, postagem de 
comentários e denúncia/moderação — dependem de um backend com persistência real, não coberto 
pelo protótipo estático atual.

## Licença

Projeto acadêmico — Disciplina de Projeto Integrador II, Coordenação do Curso Técnico de Informática.
