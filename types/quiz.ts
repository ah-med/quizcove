export type QuestionType = 'single' | 'multiple';

// New type for code snippets
export interface CodeSnippet {
  code: string;
  language?: string;
}

// New type for options that can contain code
export type Option =
  | string
  | {
      text: string;
      code?: CodeSnippet;
    };

export interface Question {
  id: string;
  question: string;
  code?: CodeSnippet;
  options: Option[];
  correctAnswers: string[];
  type: QuestionType;
  explanation: string;
}

export interface QuestionSet {
  questions: Question[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizConfig {
  topic: string;
  difficulty: Difficulty;
  timeLimit: number;
  numberOfQuestions: number;
}

export interface QuestionResult {
  id: string;
  question: string;
  code?: CodeSnippet;
  correctAnswers: string[];
  userAnswers: string[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  code?: CodeSnippet;
  options: Option[];
  correctAnswers: string[];
  type: 'single' | 'multiple';
  explanation: string;
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

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}

export interface QuizHistory {
  id: string;
  date: string;
  config: QuizConfig;
  results: QuizResult;
  detailedResults: QuestionResult[];
}
