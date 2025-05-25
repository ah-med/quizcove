import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface UseQuizTimerProps {
  timeLimit: number;
  numberOfQuestions: number;
  onTimeUp?: () => void;
}

export const useQuizTimer = ({
  timeLimit,
  numberOfQuestions,
  onTimeUp,
}: UseQuizTimerProps) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const hasCalledOnTimeUp = useRef(false);

  useEffect(() => {
    const totalTime = timeLimit * numberOfQuestions;
    setTimeRemaining(totalTime);
    setQuizStartTime(Date.now());
    hasCalledOnTimeUp.current = false;
  }, [timeLimit, numberOfQuestions]);

  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp && !hasCalledOnTimeUp.current) {
            hasCalledOnTimeUp.current = true;
            onTimeUp();
          } else if (!onTimeUp) {
            router.push("/result");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, router, onTimeUp]);

  const getTimeTaken = () => {
    return Math.floor((Date.now() - quizStartTime) / 1000);
  };

  return {
    timeRemaining,
    quizStartTime,
    getTimeTaken,
  };
};
