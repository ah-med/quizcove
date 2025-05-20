import { create } from "zustand";
import type { QuizState, QuizConfig, QuizQuestion, QuestionResult } from "@/types/quiz";


const initialState = {
  config: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  results: [],
  timeTaken: 0,
  isLoading: true,
};

export const useQuizStore = create<QuizState>()((set) => ({
  ...initialState,

  setConfig: (config: QuizConfig) => set({ config }),
  setQuestions: (questions: QuizQuestion[]) => set({ questions }),
  setCurrentQuestionIndex: (currentQuestionIndex: number) =>
    set({ currentQuestionIndex }),
  setSelectedAnswers: (selectedAnswers: string[]) => set({ selectedAnswers }),
  addResult: (result: QuestionResult) =>
    set((state: QuizState) => ({ results: [...state.results, result] })),
  setTimeTaken: (timeTaken: number) => set({ timeTaken }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  reset: () => set(initialState),
}));
