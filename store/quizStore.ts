import { create } from "zustand";

export interface QuizConfig {
  topic: string;
  difficulty: string;
  timeLimit: number;
  numberOfQuestions: number;
}

export interface Question {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: string[];
  correctAnswers: string[];
  explanation: string;
}

export interface QuestionResult {
  id: string;
  question: string;
  correctAnswers: string[];
  userAnswers: string[];
  explanation: string;
}

interface QuizState {
  config: QuizConfig | null;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: string[];
  results: QuestionResult[];
  timeTaken: number;
  isLoading: boolean;
  setConfig: (config: QuizConfig) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswers: (answers: string[]) => void;
  addResult: (result: QuestionResult) => void;
  setTimeTaken: (time: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

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
  setQuestions: (questions: Question[]) => set({ questions }),
  setCurrentQuestionIndex: (currentQuestionIndex: number) =>
    set({ currentQuestionIndex }),
  setSelectedAnswers: (selectedAnswers: string[]) => set({ selectedAnswers }),
  addResult: (result: QuestionResult) =>
    set((state: QuizState) => ({ results: [...state.results, result] })),
  setTimeTaken: (timeTaken: number) => set({ timeTaken }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  reset: () => set(initialState),
}));
