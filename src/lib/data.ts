export type ItemTipo = "livro" | "jogo" | "instrumento"
export type Disponibilidade = "disponivel" | "emprestado" | "reservado"

export type Comentario = {
  id: string
  aluno: string
  turma: string
  nota: number
  texto: string
  data: string
}

export type Item = {
  id: string
  titulo: string
  autor: string
  tipo: ItemTipo
  disciplina?: string
  temas: string[]
  clima: string[] // clima de leitura
  faixa: string // faixa etária
  sinopse: string
  estante: string // localização física
  status: Disponibilidade
  novidade?: boolean
  emprestimosMes?: number
  corCapa: string
  corTexto: string
  comentarios: Comentario[]
}

// Paleta de "capas" geradas por CSS (spines de estante)
const capas = {
  navy: { bg: "#243b6b", fg: "#f4efe4" },
  gold: { bg: "#c8a13a", fg: "#2a2410" },
  green: { bg: "#3f7d5c", fg: "#eef6f0" },
  cream: { bg: "#e8dcc0", fg: "#3a3320" },
  wine: { bg: "#7d3f4a", fg: "#f6eef0" },
  slate: { bg: "#4a5a72", fg: "#eef2f7" },
  terracotta: { bg: "#b5623f", fg: "#f7eee8" },
  teal: { bg: "#2f6f74", fg: "#eef7f7" },
}

function c(k: keyof typeof capas) {
  return { corCapa: capas[k].bg, corTexto: capas[k].fg }
}

export const itens: Item[] = [
  {
    id: "dom-casmurro",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Clássico brasileiro", "Romance", "Ciúme"],
    clima: ["Reflexivo", "Intenso"],
    faixa: "Ensino Médio",
    sinopse:
      "Bentinho relembra sua juventude e o amor por Capitu, tecendo uma das mais célebres narrativas da literatura brasileira. Afinal, Capitu traiu ou não? A dúvida atravessa gerações de leitores.",
    estante: "Corredor A · Estante 2 · Prateleira 3",
    status: "disponivel",
    emprestimosMes: 42,
    ...c("navy"),
    comentarios: [
      {
        id: "c1",
        aluno: "Letícia Andrade",
        turma: "3º Info A",
        nota: 5,
        texto: "Li pro vestibular e acabei amando. Fico até hoje na dúvida sobre a Capitu!",
        data: "há 3 dias",
      },
      {
        id: "c2",
        aluno: "Rafael Monteiro",
        turma: "2º Agro B",
        nota: 4,
        texto: "Começo é lento, mas vale muito a pena. O narrador é um gênio manipulador.",
        data: "há 1 semana",
      },
    ],
  },
  {
    id: "capitaes-da-areia",
    titulo: "Capitães da Areia",
    autor: "Jorge Amado",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Clássico brasileiro", "Social", "Juventude"],
    clima: ["Intenso", "Emocionante"],
    faixa: "Ensino Médio",
    sinopse:
      "Um grupo de meninos de rua de Salvador enfrenta a vida nas ruas com coragem e lealdade. Jorge Amado retrata a infância abandonada com poesia e denúncia social.",
    estante: "Corredor A · Estante 2 · Prateleira 1",
    status: "emprestado",
    emprestimosMes: 38,
    novidade: false,
    ...c("terracotta"),
    comentarios: [
      {
        id: "c3",
        aluno: "João Vitor Sales",
        turma: "1º Info A",
        nota: 5,
        texto: "Me emocionei demais. História que gruda na gente.",
        data: "há 2 dias",
      },
    ],
  },
  {
    id: "o-cortico",
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Clássico brasileiro", "Naturalismo", "Social"],
    clima: ["Reflexivo"],
    faixa: "Ensino Médio",
    sinopse:
      "Retrato naturalista da vida em um cortiço do Rio de Janeiro do século XIX, onde ambição, coletividade e instinto se misturam.",
    estante: "Corredor A · Estante 2 · Prateleira 2",
    status: "disponivel",
    emprestimosMes: 21,
    ...c("green"),
    comentarios: [],
  },
  {
    id: "algoritmos-teoria-pratica",
    titulo: "Algoritmos: Teoria e Prática",
    autor: "Cormen, Leiserson, Rivest e Stein",
    tipo: "livro",
    disciplina: "Informática",
    temas: ["Programação", "Estruturas de dados", "Técnico"],
    clima: ["Desafiador"],
    faixa: "Curso Técnico",
    sinopse:
      "Referência essencial em algoritmos e estruturas de dados. Cobre ordenação, grafos, programação dinâmica e muito mais, com rigor e clareza.",
    estante: "Corredor C · Estante 1 · Prateleira 4",
    status: "reservado",
    emprestimosMes: 27,
    ...c("slate"),
    comentarios: [
      {
        id: "c4",
        aluno: "Beatriz Nunes",
        turma: "3º Info B",
        nota: 5,
        texto: "Salvou minha prova de estrutura de dados. Denso, mas completíssimo.",
        data: "há 5 dias",
      },
    ],
  },
  {
    id: "manual-agronomia-solos",
    titulo: "Manual de Solos e Fertilidade",
    autor: "Cláudia Ferreira Lima",
    tipo: "livro",
    disciplina: "Agropecuária",
    temas: ["Técnico", "Meio ambiente", "Campo"],
    clima: ["Prático"],
    faixa: "Curso Técnico",
    sinopse:
      "Guia prático sobre análise, manejo e conservação de solos, voltado para estudantes de agropecuária e produtores rurais.",
    estante: "Corredor C · Estante 3 · Prateleira 1",
    status: "disponivel",
    emprestimosMes: 18,
    novidade: true,
    ...c("cream"),
    comentarios: [],
  },
  {
    id: "a-hora-da-estrela",
    titulo: "A Hora da Estrela",
    autor: "Clarice Lispector",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Clássico brasileiro", "Existencial", "Social"],
    clima: ["Reflexivo", "Melancólico"],
    faixa: "Ensino Médio",
    sinopse:
      "A comovente e fragmentada história de Macabéa, uma nordestina simples no Rio de Janeiro, narrada com a prosa única de Clarice Lispector.",
    estante: "Corredor A · Estante 2 · Prateleira 4",
    status: "disponivel",
    emprestimosMes: 15,
    ...c("wine"),
    comentarios: [
      {
        id: "c5",
        aluno: "Sophia Carvalho",
        turma: "2º Info A",
        nota: 5,
        texto: "Curtinho e absurdamente profundo. Li em uma tarde e pensei nele a semana toda.",
        data: "ontem",
      },
    ],
  },
  {
    id: "quarto-de-despejo",
    titulo: "Quarto de Despejo",
    autor: "Carolina Maria de Jesus",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Diário", "Social", "Brasil"],
    clima: ["Intenso", "Emocionante"],
    faixa: "Ensino Médio",
    sinopse:
      "O diário real de uma catadora de papel na favela do Canindé. Um documento poderoso sobre fome, dignidade e resistência.",
    estante: "Corredor A · Estante 4 · Prateleira 2",
    status: "disponivel",
    emprestimosMes: 33,
    novidade: true,
    ...c("gold"),
    comentarios: [],
  },
  {
    id: "sapiens",
    titulo: "Sapiens: Uma Breve História da Humanidade",
    autor: "Yuval Noah Harari",
    tipo: "livro",
    disciplina: "História",
    temas: ["Divulgação", "História", "Ciência"],
    clima: ["Curioso", "Reflexivo"],
    faixa: "Ensino Médio",
    sinopse:
      "Uma viagem pela história da espécie humana, das savanas africanas às revoluções cognitiva, agrícola e científica.",
    estante: "Corredor B · Estante 1 · Prateleira 2",
    status: "emprestado",
    emprestimosMes: 29,
    ...c("teal"),
    comentarios: [
      {
        id: "c6",
        aluno: "Gabriel Teixeira",
        turma: "3º Agro A",
        nota: 4,
        texto: "Abre muito a cabeça. Algumas partes polêmicas, mas ótimo pra debater em aula.",
        data: "há 4 dias",
      },
    ],
  },
  {
    id: "xadrez-oficial",
    titulo: "Jogo de Xadrez Oficial",
    autor: "Tabuleiro profissional · 32 peças",
    tipo: "jogo",
    temas: ["Estratégia", "Raciocínio", "Clássico"],
    clima: ["Desafiador", "Concentrado"],
    faixa: "Todas as idades",
    sinopse:
      "Tabuleiro de xadrez em madeira com peças completas. Ideal para o clube de xadrez e para os intervalos entre as aulas.",
    estante: "Balcão · Prateleira de Jogos · Caixa X1",
    status: "disponivel",
    emprestimosMes: 24,
    ...c("navy"),
    comentarios: [
      {
        id: "c7",
        aluno: "Clube de Xadrez CTBJ",
        turma: "Extracurricular",
        nota: 5,
        texto: "Peças em ótimo estado. Reservamos toda quarta pro torneio interno!",
        data: "há 6 dias",
      },
    ],
  },
  {
    id: "damas",
    titulo: "Jogo de Damas",
    autor: "Tabuleiro dobrável · 24 peças",
    tipo: "jogo",
    temas: ["Estratégia", "Raciocínio", "Clássico"],
    clima: ["Leve", "Concentrado"],
    faixa: "Todas as idades",
    sinopse:
      "Clássico jogo de damas com tabuleiro dobrável e peças coloridas. Rápido de aprender, difícil de dominar.",
    estante: "Balcão · Prateleira de Jogos · Caixa D2",
    status: "disponivel",
    emprestimosMes: 12,
    ...c("wine"),
    comentarios: [],
  },
  {
    id: "violao-acustico",
    titulo: "Violão Acústico",
    autor: "Cordas de nylon · Tamanho 4/4",
    tipo: "instrumento",
    temas: ["Música", "Prática", "Cultura"],
    clima: ["Criativo", "Leve"],
    faixa: "Todas as idades",
    sinopse:
      "Violão acústico disponível para empréstimo aos alunos do coral e do projeto de música. Acompanha capa protetora e palhetas.",
    estante: "Sala de Música · Armário M1",
    status: "reservado",
    emprestimosMes: 9,
    novidade: true,
    ...c("terracotta"),
    comentarios: [
      {
        id: "c8",
        aluno: "Marina Pontes",
        turma: "1º Agro B",
        nota: 5,
        texto: "Perfeito pra treinar em casa antes da apresentação. Bem cuidado!",
        data: "há 2 dias",
      },
    ],
  },
  {
    id: "1984",
    titulo: "1984",
    autor: "George Orwell",
    tipo: "livro",
    disciplina: "Literatura",
    temas: ["Distopia", "Política", "Ficção"],
    clima: ["Intenso", "Reflexivo"],
    faixa: "Ensino Médio",
    sinopse:
      "Em um mundo de vigilância total sob o Grande Irmão, Winston Smith tenta resistir. Um clássico atemporal sobre liberdade e controle.",
    estante: "Corredor B · Estante 3 · Prateleira 1",
    status: "disponivel",
    emprestimosMes: 31,
    ...c("slate"),
    comentarios: [],
  },
]

export const curadoria = {
  titulo: "Sugestão da semana",
  itemId: "quarto-de-despejo",
  bibliotecario: "Prof. Helena Bastos",
  recado:
    "Nesta semana quero colocar nas suas mãos um livro que mudou a forma como enxergo a escrita: o diário de Carolina Maria de Jesus. É Brasil de verdade, cru e potente. Passe no balcão que eu conto mais.",
}

export type Aluno = {
  nome: string
  turma: string
  matricula: string
}

export const alunoAtual: Aluno = {
  nome: "Ana Luiza Ferreira",
  turma: "3º Info A",
  matricula: "2023.INFO.0148",
}

export type Emprestimo = {
  itemId: string
  retiradaEm: string
  devolverAte: string
  atrasado?: boolean
}

export const emPosse: Emprestimo[] = [
  { itemId: "sapiens", retiradaEm: "05/09", devolverAte: "19/09" },
  { itemId: "1984", retiradaEm: "12/09", devolverAte: "16/09", atrasado: true },
]

export const reservas = [
  { itemId: "algoritmos-teoria-pratica", posicao: 1, previsao: "22/09" },
  { itemId: "violao-acustico", posicao: 2, previsao: "25/09" },
]

export const historico = [
  { itemId: "dom-casmurro", concluidoEm: "Agosto/2026", nota: 5 },
  { itemId: "a-hora-da-estrela", concluidoEm: "Julho/2026", nota: 5 },
  { itemId: "capitaes-da-areia", concluidoEm: "Junho/2026", nota: 4 },
  { itemId: "o-cortico", concluidoEm: "Maio/2026", nota: 3 },
]

export type Achado = {
  id: string
  nome: string
  descricao: string
  local: string
  data: string
  status: "aguardando" | "devolvido"
  corBg: string
  emoji: string
}

export const achados: Achado[] = [
  {
    id: "a1",
    nome: "Garrafa térmica azul",
    descricao: "Garrafa de inox azul-marinho com adesivo de banda. Encontrada na quadra.",
    local: "Quadra poliesportiva",
    data: "17/09",
    status: "aguardando",
    corBg: "#243b6b",
    emoji: "🫙",
  },
  {
    id: "a2",
    nome: "Calculadora científica",
    descricao: "Calculadora Casio fx-82. Estava na bancada do laboratório de informática.",
    local: "Lab. de Informática 2",
    data: "16/09",
    status: "aguardando",
    corBg: "#4a5a72",
    emoji: "🧮",
  },
  {
    id: "a3",
    nome: "Moletom cinza tam. M",
    descricao: "Moletom cinza com capuz, sem etiqueta de nome. Deixado no refeitório.",
    local: "Refeitório",
    data: "15/09",
    status: "aguardando",
    corBg: "#7d7d7d",
    emoji: "🧥",
  },
  {
    id: "a4",
    nome: "Chaveiro com 3 chaves",
    descricao: "Chaveiro de tartaruga verde com três chaves pequenas.",
    local: "Corredor do Bloco B",
    data: "14/09",
    status: "aguardando",
    corBg: "#3f7d5c",
    emoji: "🔑",
  },
  {
    id: "a5",
    nome: "Óculos de grau",
    descricao: "Óculos de armação preta em estojo vermelho. Devolvido ao aluno da turma 2º Agro A.",
    local: "Biblioteca",
    data: "10/09",
    status: "devolvido",
    corBg: "#7d3f4a",
    emoji: "👓",
  },
  {
    id: "a6",
    nome: "Fone de ouvido branco",
    descricao: "Fone com fio branco enrolado. Encontrado na sala da turma 1º Info A.",
    local: "Sala 1º Info A",
    data: "09/09",
    status: "aguardando",
    corBg: "#c8a13a",
    emoji: "🎧",
  },
]

export type QuizOpcao = { rotulo: string; valor: string }
export type QuizPergunta = {
  id: string
  pergunta: string
  opcoes: QuizOpcao[]
}

export const quizPerguntas: QuizPergunta[] = [
  {
    id: "clima",
    pergunta: "Qual clima de leitura combina com você agora?",
    opcoes: [
      { rotulo: "Algo intenso e emocionante", valor: "Intenso" },
      { rotulo: "Reflexivo, pra pensar sobre a vida", valor: "Reflexivo" },
      { rotulo: "Leve e divertido", valor: "Leve" },
      { rotulo: "Curioso, quero aprender algo novo", valor: "Curioso" },
    ],
  },
  {
    id: "tema",
    pergunta: "Que tema te atrai mais?",
    opcoes: [
      { rotulo: "Histórias do Brasil e sociedade", valor: "Social" },
      { rotulo: "Clássicos da literatura", valor: "Clássico brasileiro" },
      { rotulo: "Ciência e história do mundo", valor: "Ciência" },
      { rotulo: "Tecnologia e desafios técnicos", valor: "Técnico" },
    ],
  },
  {
    id: "tamanho",
    pergunta: "Quanto tempo você quer dedicar?",
    opcoes: [
      { rotulo: "Pouco — algo curto e marcante", valor: "curto" },
      { rotulo: "Tenho fôlego pra uma boa história", valor: "medio" },
      { rotulo: "Quero mergulhar fundo", valor: "longo" },
    ],
  },
]

export function getItem(id: string) {
  return itens.find((i) => i.id === id)
}

export function recomendarPorQuiz(respostas: Record<string, string>) {
  const scored = itens
    .filter((i) => i.tipo === "livro")
    .map((item) => {
      let score = 0
      if (respostas.clima && item.clima.includes(respostas.clima)) score += 2
      if (respostas.tema && item.temas.includes(respostas.tema)) score += 2
      score += (item.emprestimosMes ?? 0) / 100
      return { item, score }
    })
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, 3).map((s) => s.item)
}

export const tiposLabel: Record<ItemTipo, string> = {
  livro: "Livro",
  jogo: "Jogo de mesa",
  instrumento: "Instrumento",
}

export const statusLabel: Record<Disponibilidade, string> = {
  disponivel: "Disponível",
  emprestado: "Emprestado",
  reservado: "Reservado",
}
