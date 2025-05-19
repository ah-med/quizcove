export const STORAGE_KEYS = {
  QUIZ_CONFIG: "quizConfig",
  QUIZ_RESULTS: "quizResults",
  QUIZ_TIME: "quizTimeTaken",
  QUIZ_HISTORY: "quizHistory",
} as const;

// Type for the storage keys
export type StorageKey = keyof typeof STORAGE_KEYS;
