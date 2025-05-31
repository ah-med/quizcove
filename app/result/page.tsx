'use client';

import Layout from '@/components/layout';
import { ResultCard } from '@/components/result/result-card';
import { ResultDetails } from '@/components/result/result-details';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import type { QuizHistory } from '@/types/quiz';
import { STORAGE_KEYS } from '@/constants/storage';
import { Loading } from '@/components/ui/loading';
import { useEffect } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const { results, timeTaken, config, reset } = useQuizStore();

  const calculateAndSaveResults = () => {
    if (results.length === 0 || timeTaken === 0 || !config) {
      return null;
    }

    const correctAnswers = results.filter(
      result =>
        result.correctAnswers.length === result.userAnswers.length &&
        result.correctAnswers.every(answer => result.userAnswers.includes(answer))
    ).length;

    const totalQuestions = results.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const newQuizResult = {
      score,
      correctAnswers,
      totalQuestions,
      timeTaken,
    };

    const quizHistory: QuizHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      config,
      results: newQuizResult,
      detailedResults: results,
    };

    const existingHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    const history: QuizHistory[] = existingHistory ? JSON.parse(existingHistory) : [];

    history.push(quizHistory);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));

    return newQuizResult;
  };

  const quizResult = calculateAndSaveResults();

  useEffect(() => {
    if (!config || !quizResult) {
      router.push('/');
    }
  }, [config, quizResult, router]);

  const handleStartNewQuiz = () => {
    reset();
    router.push('/');
  };

  if (!config || !quizResult) {
    return (
      <Layout>
        <Loading message="Redirecting to home page..." fullScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <ResultCard
        score={quizResult.score}
        correctAnswers={quizResult.correctAnswers}
        totalQuestions={quizResult.totalQuestions}
        timeTaken={quizResult.timeTaken}
        onStartNewQuiz={handleStartNewQuiz}
      />
      <ResultDetails results={results} />
    </Layout>
  );
}
