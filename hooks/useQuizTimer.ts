import { useState, useEffect, useRef } from 'react';

interface UseQuizTimerProps {
  timeLimit: number;
  numberOfQuestions: number;
  onTimeUp?: () => void;
}

export const useQuizTimer = ({ timeLimit, numberOfQuestions, onTimeUp }: UseQuizTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const hasCalledOnTimeUp = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const quizStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const totalTime = timeLimit * numberOfQuestions;
    setTimeRemaining(totalTime);
    hasCalledOnTimeUp.current = false;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLimit, numberOfQuestions]);

  useEffect(() => {
    if (!timeRemaining) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          if (onTimeUp && !hasCalledOnTimeUp.current) {
            hasCalledOnTimeUp.current = true;
            onTimeUp();
          }
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining, onTimeUp]);

  const getTimeTaken = () => {
    return Math.floor((Date.now() - quizStartTime.current) / 1000);
  };

  return {
    timeRemaining,
    quizStartTime: quizStartTime.current,
    getTimeTaken,
  };
};
