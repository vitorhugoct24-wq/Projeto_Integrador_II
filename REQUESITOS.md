# 📋 Requisitos do Projeto — CTBJeca

Documentação dos requisitos funcionais e não funcionais da biblioteca virtual escolar **CTBJeca**, adaptada à realidade do **CTBJ (Colégio Técnico de Bom Jesus, Piauí)**.

---

## 🎯 Contexto da Adaptação

O CTBJeca deixa de ser apenas um catálogo de consulta de disponibilidade e passa a ser um **portal digital da biblioteca do CTBJ (Colégio Técnico de Bom Jesus, Piauí)**: descoberta e recomendação de leitura, acervo expandido (jogos e instrumentos), achados e perdidos, e um espaço de interação social entre alunos sobre livros e assuntos da escola — tudo isso sem depender do celular, já que seu uso é proibido em sala, através de um totem/tablet fixo instalado na própria biblioteca.

---

## ⚙️ Requisitos Funcionais (RF)

| Código   | Descrição                                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | **Busca em Dois Modos:** Permitir que o aluno pesquise obras por título, autor, gênero ou disciplina (busca direta) **ou** explore o acervo por tema, clima de leitura e faixa etária (busca por descoberta), atendendo tanto quem já sabe o que quer quanto quem não sabe. |
| **RF02** | **Visualização de Detalhes:** Exibir informações completas do livro (sinopse, autor, editora, ano, capa e localização física/estante).                                     |
| **RF03** | **Status de Disponibilidade:** Exibir de forma clara se o exemplar está disponível para consulta/empréstimo ou se está indisponível.                                       |
| **RF04** | **Autenticação e Login:** Permitir que alunos e administradores/bibliotecários realizem login no sistema.                                                                   |
| **RF05** | **Gestão do Acervo (Admin):** Permitir que o administrador cadastre, edite, atualize ou remova livros do catálogo.                                                          |
| **RF06** | **Painel do Aluno:** Permitir que o aluno visualize quais livros estão em sua posse no momento e seu histórico de leituras.                                                |
| **RF07** | **Reserva de Exemplares:** Permitir que o aluno faça a reserva temporária de um livro disponível.                                                                          |
| **RF08** | **Controle de Empréstimo e Devolução (Admin):** Registrar a entrega e a devolução de exemplares, associando-os ao aluno.                                                   |
| **RF09** | **Recomendação Personalizada:** Exibir seções como "Mais emprestados do mês", "Recém-chegados ao acervo" e "Quem pegou esse livro também pegou...", geradas a partir do histórico real de empréstimos. |
| **RF10** | **Curadoria do Bibliotecário:** Permitir que o administrador destaque livros na página inicial (ex: "Sugestão da semana", "Combina com sua turma/curso"), dando papel editorial ativo à gestão do acervo. |
| **RF11** | **Quiz de Descoberta:** Oferecer um questionário rápido (2-3 perguntas sobre gênero, tamanho do livro e clima da leitura) que sugere de 3 a 5 títulos disponíveis no acervo, direcionado a alunos que não sabem o que querem ler. |
| **RF12** | **Acervo Expandido (Jogos e Instrumentos):** Incluir no catálogo, além de livros, itens como jogos de mesa (xadrez, damas) e instrumentos musicais (ex: violão), com as mesmas regras de busca, disponibilidade e empréstimo aplicadas aos livros. |
| **RF13** | **Achados e Perdidos:** Permitir que o administrador cadastre itens encontrados na biblioteca/escola (com descrição e, se possível, foto), e que os alunos consultem essa lista para verificar se algum pertence a eles. |
| **RF14** | **Comentários sobre Livros e Itens:** Permitir que alunos comentem publicamente sobre livros, jogos ou instrumentos do acervo (opiniões, recomendações, avisos), criando uma camada social de interação em torno do acervo. |
| **RF15** | **Denúncia e Moderação de Comentários:** Permitir que qualquer aluno denuncie um comentário impróprio, e que o administrador visualize as denúncias e remova o conteúdo quando necessário. |
| **RF16** | **Acesso Multi-canal (Totem e Celular/Computador):** Disponibilizar o sistema tanto em um totem/tablet fixo instalado na biblioteca (para uso dentro da escola, já que o celular é proibido em sala) quanto via navegador comum, para que o aluno também possa acessar de casa ou fora do horário de aula pelo próprio celular ou computador. |

---

## 🛡️ Requisitos Não Funcionais (RNF)

| Código    | Descrição                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | **Usabilidade e Interface:** A interface deve ser simples, limpa e intuitiva para estudantes de diferentes idades.                                      |
| **RNF02** | **Responsividade:** O sistema deve ser totalmente adaptável a telas de computadores, tablets e smartphones.                                             |
| **RNF03** | **Capacidade e Concorrência:** O sistema deve suportar no mínimo **200 usuários simultâneos** navegando e realizando consultas sem queda de desempenho. |
| **RNF04** | **Desempenho:** A consulta de busca por livros deve retornar os resultados em menos de 2 segundos.                                                      |
| **RNF05** | **Segurança:** Senhas e dados cadastrais dos estudantes devem ser armazenados de forma segura e protegida contra acessos não autorizados.               |
| **RNF06** | **Documentação:** O código deve estar bem estruturado e documentado no GitHub para facilitar futuras melhorias.                                         |
| **RNF07** | **Qualidade dos Dados de Recomendação:** As sugestões de RF09 e RF11 devem se basear apenas em dados reais do acervo e do histórico de empréstimos, evitando recomendações genéricas ou desconectadas do que está disponível na CTBJ. |
| **RNF08** | **Modo Totem/Quiosque e Responsividade:** No totem/tablet da biblioteca, a interface deve funcionar em modo quiosque (sem acesso a outras funções do dispositivo), com botões grandes, navegação simples por toque e sem exigir login individual complexo para consultas básicas. Fora da escola, a mesma interface deve estar disponível de forma responsiva em celulares e computadores comuns, sem modo quiosque. |
| **RNF09** | **Moderação de Conteúdo Gerado por Aluno:** Comentários (RF14) devem passar por verificação básica de conteúdo impróprio e ficar sujeitos a denúncia (RF15), evitando exposição de ofensas ou informações inadequadas antes da remoção pelo administrador. |
