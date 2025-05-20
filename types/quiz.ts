export type QuestionType = "single" | "multiple";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
  type: QuestionType;
  explanation: string;
}

export interface QuestionSet {
  questions: Question[];
}

export type Difficulty = "easy" | "medium" | "hard";
export type Topic = "javascript" | "python" | "react" | "typescript" | "nodejs";

export interface QuizConfig {
  topic: Topic;
  difficulty: Difficulty;
  timeLimit: number;
  numberOfQuestions: number;
}

export interface QuestionResult {
  id: string;
  question: string;
  correctAnswers: string[];
  userAnswers: string[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
  type: "single" | "multiple";
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  userAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizState {
  config: QuizConfig | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswers: string[];
  results: QuestionResult[];
  timeTaken: number;
  isLoading: boolean;
  setConfig: (config: QuizConfig) => void;
  setQuestions: (questions: QuizQuestion[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswers: (answers: string[]) => void;
  addResult: (result: QuestionResult) => void;
  setTimeTaken: (time: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}
