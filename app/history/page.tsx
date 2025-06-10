'use client';

import Layout from '@/components/layout';
import { PerformanceOverviewCard } from '@/components/history/performance-overview-card';
import { TopicWisePerformanceChart } from '@/components/history/performance-charts';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/constants/storage';
import type { QuizHistory } from '@/types/quiz';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ResultSummary, ResultQuestions } from '@/components/result/result-details';

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizHistory | null>(null);

  const getMostAttemptedTopic = (history: QuizHistory[]) => {
    if (history.length === 0) return 'None';

    const topicCounts = history.reduce((counts: Record<string, number>, quiz: QuizHistory) => {
      const topic = quiz.config.topic;
      counts[topic] = (counts[topic] || 0) + 1;
      return counts;
    }, {});

    return Object.entries(topicCounts).sort(([, a], [, b]) => (b as number) - (a as number))[0][0];
  };

  useEffect(() => {
    const loadHistory = () => {
      const storedHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory);
        // Set initial selected topic to the most attempted one
        if (parsedHistory.length > 0) {
          setSelectedTopic(getMostAttemptedTopic(parsedHistory));
        }
      }
      setIsLoading(false);
    };

    loadHistory();
  }, []);

  const calculateMetrics = () => {
    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        mostAttemptedTopic: 'None',
      };
    }

    const totalQuizzes = history.length;
    const totalScore = history.reduce((sum, quiz) => sum + quiz.results.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const totalTimeSpent = history.reduce((sum, quiz) => sum + quiz.results.timeTaken, 0);

    return {
      totalQuizzes,
      averageScore,
      totalTimeSpent,
      mostAttemptedTopic: getMostAttemptedTopic(history),
    };
  };

  // Get unique topics for the selector
  const topics = Array.from(new Set(history.map(quiz => quiz.config.topic))).filter(topic => topic);

  const handleQuizClick = (quiz: QuizHistory) => {
    setSelectedQuiz(quiz);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading history...</p>
        </div>
      </Layout>
    );
  }

  const metrics = calculateMetrics();

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center">Quiz History</h1>
        <PerformanceOverviewCard
          totalQuizzes={metrics.totalQuizzes}
          averageScore={metrics.averageScore}
          totalTimeSpent={metrics.totalTimeSpent}
          mostAttemptedTopic={metrics.mostAttemptedTopic}
        />

        {history.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <TopicWisePerformanceChart
              history={history}
              selectedTopic={selectedTopic}
              onQuizClick={handleQuizClick}
            />
          </div>
        )}

        <Sheet open={!!selectedQuiz} onOpenChange={open => !open && setSelectedQuiz(null)}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Quiz Details</SheetTitle>
            </SheetHeader>
            {selectedQuiz && (
              <div className="mt-6 space-y-4 px-4 py-2">
                <div className="flex justify-end">
                  <ResultSummary results={selectedQuiz.detailedResults} />
                </div>
                <ResultQuestions results={selectedQuiz.detailedResults} />
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </Layout>
  );
}
