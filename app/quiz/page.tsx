'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import { QuizHeader } from '@/components/quiz/quiz-header';
import { QuestionCard } from '@/components/quiz/question-card';
import { useQuiz } from '@/hooks/useQuiz';
import { useQuizStore } from '@/store/quizStore';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
  const router = useRouter();
  const { config } = useQuizStore();

  const {
    questions,
    currentQuestion,
    selectedAnswers,
    timeRemaining,
    isLoading,
    handleAnswerSelect,
    handleNextQuestion,
  } = useQuiz(config);

  useEffect(() => {
    if (!config) {
      router.push('/');
      return;
    }
  }, [config, router]);

  if (!config) {
    return (
      <Layout>
        <Loading message="Redirecting to home page..." fullScreen />
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Loading message="Loading questions..." fullScreen />
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold">No questions available</h1>
          <p className="mt-2">Please try a different topic or difficulty.</p>
          <Button onClick={() => router.push('/')} variant="outline">
            Start New Quiz
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <QuizHeader
          title={`${config.topic} - ${config.difficulty}`}
          timeRemaining={timeRemaining}
          currentQuestion={questions.indexOf(currentQuestion) + 1}
          totalQuestions={questions.length}
        />
        <QuestionCard
          question={currentQuestion}
          selectedAnswers={selectedAnswers}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={currentQuestion.type === 'multiple' ? handleNextQuestion : undefined}
        />
      </div>
    </Layout>
  );
}
