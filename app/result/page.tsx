'use client';

import Layout from '@/components/layout';
import { ResultCard } from '@/components/result/result-card';
import { ResultDetails } from '@/components/result/result-details';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import type { QuizHistory } from '@/types/quiz';
import { STORAGE_KEYS } from '@/constants/storage';
import { Loading } from '@/components/ui/loading';
import { CreateAccountModal } from '@/components/auth/create-account-modal';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const { results, timeTaken, config, reset } = useQuizStore();
  const { user, isAuthenticated } = useAuthStore();
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const calculateAndSaveResults = async () => {
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

    try {
      // Save to database
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: quizHistory,
          userId: user?.id,
        }),
      });

      // Also save to localStorage for anonymous users
      if (!user) {
        const existingHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
        const history: QuizHistory[] = existingHistory ? JSON.parse(existingHistory) : [];
        history.push(quizHistory);
        localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
      }
    } catch (error) {
      console.error('Failed to save quiz history:', error);
    }

    return newQuizResult;
  };

  const [quizResult, setQuizResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    const calculateResults = async () => {
      const result = await calculateAndSaveResults();
      setQuizResult(result);
      setIsCalculating(false);
    };

    if (results.length > 0 && timeTaken > 0 && config) {
      calculateResults();
    } else {
      setIsCalculating(false);
    }
  }, [results, timeTaken, config, user]);

  useEffect(() => {
    if (!isCalculating && (!config || !quizResult)) {
      router.push('/');
    }
  }, [config, quizResult, router, isCalculating]);

  const handleStartNewQuiz = () => {
    reset();
    router.push('/');
  };

  const handleCreateAccount = () => {
    setShowCreateAccountModal(true);
  };

  const handleAccountCreated = () => {
    setShowCreateAccountModal(false);
    // Optionally redirect or show success message
  };

  if (!config || !quizResult || isCalculating) {
    return (
      <Layout>
        <Loading
          message={isCalculating ? 'Calculating results...' : 'Redirecting to home page...'}
          fullScreen
        />
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
        onCreateAccount={!isAuthenticated ? handleCreateAccount : undefined}
      />
      <ResultDetails results={results} />

      <CreateAccountModal
        isOpen={showCreateAccountModal}
        onClose={() => setShowCreateAccountModal(false)}
        onSuccess={handleAccountCreated}
      />
    </Layout>
  );
}
