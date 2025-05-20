import type { QuizConfig, QuizQuestion, Topic, Difficulty } from "@/types/quiz";

export interface ConfigResponse {
  topics: Topic[];
  difficulties: Difficulty[];
  timeLimits: number[];
  numberOfQuestions: number[];
}

export async function fetchConfig(): Promise<ConfigResponse> {
  const response = await fetch("/api/config");
  if (!response.ok) {
    throw new Error("Failed to fetch quiz configuration");
  }
  return response.json();
}

export async function fetchQuestions(
  config: QuizConfig
): Promise<QuizQuestion[]> {
  const response = await fetch("/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
}
