# 🏗️ Arquitetura e Modelagem — CTBJeca

Este documento reúne a modelagem inicial da solução: fluxo de uso e modelo de dados. Os diagramas usam [Mermaid.js](https://mermaid.js.org/), renderizado automaticamente pelo GitHub ao abrir este arquivo.

---
**Link: Cartões no TRELLO https://trello.com/b/1KPuoH9i/ctbjeca-planejamento**
---
## 1. Fluxograma de Uso (Aluno)

Caminho do aluno dentro do sistema, cobrindo tanto quem já sabe o que quer (busca direta) quanto quem não sabe (descoberta).

```mermaid
flowchart TD
    A0{Onde o aluno está?}
    A0 -- Na escola, sem celular disponível --> A1[Acessa pelo totem/tablet da biblioteca]
    A0 -- Em casa ou fora do horário de aula --> A2[Acessa pelo celular ou computador]
    A1 --> B{Já sabe o que quer?}
    A2 --> B
    B -- Sim --> C[Busca direta: título, autor ou disciplina]
    B -- Não --> D{Como quer descobrir?}
    D -- Explorar por tema/clima --> E[Navegação por categoria]
    D -- Responder perguntas rápidas --> F[Quiz de Descoberta]
    D -- Ver destaques --> G[Home com curadoria do bibliotecário]
    C --> H[Lista de resultados]
    E --> H
    F --> H
    G --> H
    H --> I[Aluno abre detalhes do item]
    I --> J{Item disponível?}
    J -- Sim --> K[Aluno reserva o item]
    J -- Não --> L[Aluno consulta previsão de devolução]
    K --> M[Bibliotecário confirma entrega presencial]
    M --> N[Item registrado no painel do aluno]
    N --> O[Aluno devolve o item]
    O --> P[Bibliotecário registra devolução]
    P --> Q[Item volta a ficar disponível]
```

---

## 2. Fluxograma de Uso (Achados e Perdidos)

```mermaid
flowchart TD
    A[Item é encontrado na escola] --> B[Bibliotecário cadastra o item: descrição + foto]
    B --> C[Item aparece na lista de Achados e Perdidos]
    C --> D[Aluno consulta a lista no totem]
    D --> E{É o item do aluno?}
    E -- Sim --> F[Aluno vai até a biblioteca reclamar o item]
    E -- Não --> D
    F --> G[Bibliotecário confirma e remove o item da lista]
```

---

## 3. Modelo de Dados (Simplificado)

Entidades principais e como se relacionam.

```mermaid
erDiagram
    ALUNO ||--o{ EMPRESTIMO : realiza
    ALUNO ||--o{ RESERVA : faz
    ALUNO ||--o{ COMENTARIO : escreve
    ALUNO ||--o{ DENUNCIA : registra
    ADMIN ||--o{ ITEM : cadastra
    ADMIN ||--o{ ACHADO_PERDIDO : cadastra
    ADMIN ||--o{ EMPRESTIMO : confere

    ITEM ||--o{ EMPRESTIMO : gera
    ITEM ||--o{ RESERVA : gera
    ITEM ||--o{ COMENTARIO : recebe
    ITEM }o--|| CATEGORIA : pertence

    COMENTARIO ||--o{ DENUNCIA : pode_receber

    ALUNO {
        int id
        string nome
        string turma
        string curso
        string login
    }

    ITEM {
        int id
        string tipo "livro, jogo ou instrumento"
        string titulo
        string autor_ou_fabricante
        string localizacao_fisica
        boolean disponivel
    }

    CATEGORIA {
        int id
        string nome
        string tema
        string clima_leitura
    }

    EMPRESTIMO {
        int id
        date data_entrega
        date data_devolucao_prevista
        date data_devolucao_real
    }

    RESERVA {
        int id
        date data_reserva
        date validade
    }

    COMENTARIO {
        int id
        string texto
        date data
    }

    DENUNCIA {
        int id
        string motivo
        date data
        boolean resolvida
    }

    ACHADO_PERDIDO {
        int id
        string descricao
        string foto_url
        date data_encontrado
        boolean reclamado
    }
```

---

## Ferramentas utilizadas

Todos os diagramas foram feitos em **Mermaid.js**, integrado nativamente ao GitHub — não é necessário nenhum software externo para visualizá-los, bastando abrir este arquivo no repositório.

**Professor, gostaria de informar que a estrutura e o código/texto deste projeto foram gerados pelo assistente Claude AI (Anthropic), sob minha total orientação.**
