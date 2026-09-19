import type { Metadata } from "next"
import { QuizClient } from "@/components/quiz/quiz-client"

export const metadata: Metadata = {
  title: "Quiz de Descoberta",
  description: "Responda 3 perguntas rápidas e receba recomendações de leitura personalizadas do acervo do CTBJeca.",
}

export default function QuizPage() {
  return <QuizClient />
}
