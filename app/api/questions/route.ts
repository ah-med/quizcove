import { NextResponse } from "next/server";

interface QuizConfig {
  topic: string;
  difficulty: string;
  timeLimit: number;
  numberOfQuestions: number;
}

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple";
  options: string[];
  correctAnswers: string[];
  explanation: string;
}

// Mock questions database
const mockQuestions: Record<string, Question[]> = {
  javascript: [
    {
      id: "1",
      text: "What is the correct way to declare a variable in JavaScript?",
      type: "single",
      options: ["var x = 5;", "variable x = 5;", "v x = 5;", "let x = 5;"],
      correctAnswers: ["let x = 5;"],
      explanation:
        "In JavaScript, variables can be declared using 'let', 'const', or 'var'. 'let' is the modern way to declare variables that can be reassigned.",
    },
    {
      id: "2",
      text: "Which of the following are valid JavaScript array methods? (Select all that apply)",
      type: "multiple",
      options: ["push()", "append()", "pop()", "add()", "shift()"],
      correctAnswers: ["push()", "pop()", "shift()"],
      explanation:
        "push(), pop(), and shift() are valid JavaScript array methods. append() and add() are not valid array methods in JavaScript.",
    },
    {
      id: "3",
      text: "What is the output of console.log(typeof [])?",
      type: "single",
      options: ["array", "object", "undefined", "null"],
      correctAnswers: ["object"],
      explanation:
        "In JavaScript, arrays are objects. The typeof operator returns 'object' for arrays.",
    },
  ],
  python: [
    {
      id: "1",
      text: "Which of the following is a valid Python list comprehension?",
      type: "single",
      options: [
        "[x for x in range(5)]",
        "{x for x in range(5)}",
        "(x for x in range(5))",
        "<x for x in range(5)>",
      ],
      correctAnswers: ["[x for x in range(5)]"],
      explanation:
        "List comprehensions in Python use square brackets. The other options are set comprehension, generator expression, and invalid syntax respectively.",
    },
    {
      id: "2",
      text: "Which of the following are valid Python data types? (Select all that apply)",
      type: "multiple",
      options: ["list", "array", "tuple", "vector", "dict"],
      correctAnswers: ["list", "tuple", "dict"],
      explanation:
        "list, tuple, and dict are built-in Python data types. array and vector are not built-in types.",
    },
  ],
};

export async function POST(request: Request) {
  try {
    const config: QuizConfig = await request.json();

    // Get questions for the selected topic
    const topicQuestions = mockQuestions[config.topic.toLowerCase()] || [];

    // Filter by difficulty (in a real app, this would be more sophisticated)
    const filteredQuestions = topicQuestions.filter(() => {
      // For now, just return all questions regardless of difficulty
      return true;
    });

    // Shuffle and limit to requested number of questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, config.numberOfQuestions);

    return NextResponse.json(selectedQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
