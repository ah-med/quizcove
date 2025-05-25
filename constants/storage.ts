export const STORAGE_KEYS = {
  QUIZ_CONFIG: "quizConfig",
  QUIZ_RESULTS: "quizResults",
  QUIZ_TIME: "quizTimeTaken",
  QUIZ_HISTORY: "quizHistory",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
