# 🏗️ Arquitetura e Modelagem — CTBJeca

Este documento reúne a modelagem inicial da solução: fluxo de uso, modelo de dados e protótipo textual de tela. Os diagramas usam [Mermaid.js](https://mermaid.js.org/), renderizado automaticamente pelo GitHub ao abrir este arquivo.

---

## 1. Fluxograma de Uso (Aluno)

Caminho do aluno dentro do sistema, cobrindo tanto quem já sabe o que quer (busca direta) quanto quem não sabe (descoberta).

```mermaid
flowchart TD
    A[Aluno acessa o totem/tablet na biblioteca] --> B{Já sabe o que quer?}
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

## 4. Protótipo de Tela — Home do Totem (Wireframe Textual)

Representação simplificada da tela inicial do totem na biblioteca.

```mermaid
flowchart TB
    subgraph HOME["🏠 Home do CTBJeca - Totem da Biblioteca"]
        direction TB
        H1["🔍 Barra de busca direta (título/autor)"]
        H2["🎯 Botão: 'Não sei o que quero ler' → Quiz de Descoberta"]
        H3["⭐ Sugestão da semana (curadoria do bibliotecário)"]
        H4["📈 Mais emprestados do mês"]
        H5["🆕 Recém-chegados ao acervo"]
        H6["🎲 Categorias: Livros | Jogos | Instrumentos"]
        H7["🧳 Achados e Perdidos"]
    end
    H1 --> RES[Tela de Resultados]
    H2 --> QUIZ[Tela do Quiz]
    H3 --> DET[Tela de Detalhes do Item]
    H4 --> DET
    H5 --> DET
    H6 --> RES
    H7 --> AP[Lista de Achados e Perdidos]
```

---

## 5. Protótipo de Tela — Detalhes do Item

```mermaid
flowchart TB
    subgraph DETALHES["📖 Detalhes do Item"]
        direction TB
        D1["Capa/Imagem do item"]
        D2["Título + Autor/Fabricante"]
        D3["Sinopse ou descrição"]
        D4["Status: Disponível / Indisponível"]
        D5["Localização física na estante"]
        D6["Botão: Reservar"]
        D7["Comentários de outros alunos"]
        D8["Botão: Denunciar comentário"]
    end
```

---

## Ferramentas utilizadas

Todos os diagramas foram feitos em **Mermaid.js**, integrado nativamente ao GitHub — não é necessário nenhum software externo para visualizá-los, bastando abrir este arquivo no repositório.
