import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizTimer } from "./useQuizTimer";
import { useQuizStore } from "@/store/quizStore";
import type { QuizConfig } from "@/types/quiz";

export const useQuiz = (config: QuizConfig | null) => {
  const router = useRouter();
  const [shouldSaveAndNext, setShouldSaveAndNext] = useState(false);
  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    isLoading,
    setQuestions,
    setCurrentQuestionIndex,
    setSelectedAnswers,
    setIsLoading,
    addResult,
    setTimeTaken,
  } = useQuizStore();

  const { timeRemaining, getTimeTaken } = useQuizTimer({
    timeLimit: config?.timeLimit ?? 0,
    numberOfQuestions: config?.numberOfQuestions ?? 0,
    onTimeUp: () => {
      const timeTaken = getTimeTaken();
      setTimeTaken(timeTaken);
      localStorage.setItem("quizTimeTaken", timeTaken.toString());
      router.push("/result");
    },
  });

  useEffect(() => {
    if (!config) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [config, router, setQuestions, setIsLoading]);

  const currentQuestion = questions[currentQuestionIndex];

  const saveQuestionResult = useCallback(() => {
    if (!currentQuestion) return;

    const result = {
      id: currentQuestion.id,
      question: currentQuestion.question,
      correctAnswers: currentQuestion.correctAnswers,
      userAnswers: selectedAnswers,
      explanation: currentQuestion.explanation,
    };

    addResult(result);
    localStorage.setItem(
      "quizResults",
      JSON.stringify([...useQuizStore.getState().results])
    );
  }, [currentQuestion, selectedAnswers, addResult]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion?.type === "multiple") {
      saveQuestionResult();
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
    } else {
      const timeTaken = getTimeTaken();
      setTimeTaken(timeTaken);
      localStorage.setItem("quizTimeTaken", timeTaken.toString());
      router.push("/result");
    }
  }, [
    currentQuestion,
    currentQuestionIndex,
    questions.length,
    router,
    saveQuestionResult,
    getTimeTaken,
    setCurrentQuestionIndex,
    setSelectedAnswers,
    setTimeTaken,
  ]);

  useEffect(() => {
    if (shouldSaveAndNext && currentQuestion?.type === "single") {
      saveQuestionResult();
      handleNextQuestion();
      setShouldSaveAndNext(false);
    }
  }, [
    shouldSaveAndNext,
    currentQuestion,
    saveQuestionResult,
    handleNextQuestion,
  ]);

  const handleAnswerSelect = useCallback(
    (answer: string) => {
      if (currentQuestion?.type === "single") {
        setSelectedAnswers([answer]);
        setShouldSaveAndNext(true);
      } else {
        setSelectedAnswers(
          selectedAnswers.includes(answer)
            ? selectedAnswers.filter((ans: string) => ans !== answer)
            : [...selectedAnswers, answer]
        );
      }
    },
    [currentQuestion, selectedAnswers, setSelectedAnswers]
  );

  return {
    questions,
    currentQuestion,
    selectedAnswers,
    timeRemaining,
    isLoading,
    handleAnswerSelect,
    handleNextQuestion,
  };
};
