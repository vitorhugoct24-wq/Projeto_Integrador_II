# 📋 Requisitos do Projeto — CTeca

Documentação dos requisitos funcionais e não funcionais da biblioteca virtual escolar **CTeca**.

---

## ⚙️ Requisitos Funcionais (RF)

| Código | Descrição |
| :--- | :--- |
| **RF01** | **Pesquisa e Filtro de Livros:** Permitir que o aluno busque obras por título, autor, gênero ou disciplina. |
| **RF02** | **Visualização de Detalhes:** Exibir informações completas do livro (sinopse, autor, editora, ano, capa e localização física/estante). |
| **RF03** | **Status de Disponibilidade:** Exibir de forma clara se o exemplar está disponível para consulta/empréstimo ou se está indisponível. |
| **RF04** | **Autenticação e Login:** Permitir que alunos e administradores/bibliotecários realizem login no sistema. |
| **RF05** | **Gestão do Acervo (Admin):** Permitir que o administrador cadastre, edite, atualize ou remova livros do catálogo. |
| **RF06** | **Painel do Aluno:** Permitir que o aluno visualize quais livros estão em sua posse no momento e seu histórico. |
| **RF07** | **Reserva de Exemplares:** Permitir que o aluno faça a reserva temporária de um livro disponível. |
| **RF08** | **Controle de Empréstimo e Devolução (Admin):** Registrar a entrega e a devolução de exemplares, associando-os ao aluno. |

---

## 🛡️ Requisitos Não Funcionais (RNF)

| Código | Descrição |
| :--- | :--- |
| **RNF01** | **Usabilidade e Interface:** A interface deve ser simples, limpa e intuitiva para estudantes de diferentes idades. |
| **RNF02** | **Responsividade:** O sistema deve ser totalmente adaptável a telas de computadores, tablets e smartphones. |
| **RNF03** | **Capacidade e Concorrência:** O sistema deve suportar no mínimo **500 usuários simultâneos** navegando e realizando consultas sem queda de desempenho. |
| **RNF04** | **Desempenho:** A consulta de busca por livros deve retornar os resultados em menos de 2 segundos. |
| **RNF05** | **Segurança:** Senhas e dados cadastrais dos estudantes devem ser armazenados de forma segura e protegida contra acessos não autorizados. |
| **RNF06** | **Documentação:** O código deve estar bem estruturado e documentado no GitHub para facilitar futuras melhorias. |
