export const mockQuizResults = {
  score: 75,
  correctAnswers: 15,
  totalQuestions: 20,
  timeTaken: 850, // 14 minutes and 10 seconds
};

export const mockDetailedResults = [
  {
    id: "1",
    question: "What is the capital of France?",
    correctAnswers: ["Paris"],
    userAnswers: ["Paris"],
    explanation: "Paris is the capital and largest city of France.",
  },
  {
    id: "2",
    question: "Which of these are programming languages?",
    correctAnswers: ["Python", "JavaScript", "Java"],
    userAnswers: ["Python", "JavaScript"],
    explanation:
      "Python, JavaScript, and Java are all programming languages. HTML is a markup language.",
  },
  {
    id: "3",
    question: "What is the largest planet in our solar system?",
    correctAnswers: ["Jupiter"],
    userAnswers: ["Saturn"],
    explanation:
      "Jupiter is the largest planet in our solar system, with a diameter of about 86,881 miles.",
  },
  {
    id: "4",
    question: "Which of these are web browsers?",
    correctAnswers: ["Chrome", "Firefox", "Safari"],
    userAnswers: ["Chrome", "Firefox", "Safari", "Word"],
    explanation:
      "Chrome, Firefox, and Safari are web browsers. Word is a word processor.",
  },
  {
    id: "5",
    question: "What is the chemical symbol for gold?",
    correctAnswers: ["Au"],
    userAnswers: ["Au"],
    explanation:
      "Au is the chemical symbol for gold, derived from the Latin word 'aurum'.",
  },
];
