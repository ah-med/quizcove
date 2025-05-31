'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import type { Difficulty, QuizConfig } from '@/types/quiz';
import { STORAGE_KEYS } from '@/constants/storage';
import { Loading } from '@/components/ui/loading';
import type { ConfigResponse } from '@/lib/api';

export function QuizConfigForm() {
  const router = useRouter();
  const { results, timeTaken, reset, setConfig } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const [configOptions, setConfigOptions] = useState<ConfigResponse | null>(null);
  const [formData, setFormData] = useState<QuizConfig>({
    topic: '',
    difficulty: 'medium',
    timeLimit: 30,
    numberOfQuestions: 10,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) throw new Error('Failed to fetch config');
        const data = await response.json();
        setConfigOptions(data);
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (results.length > 0 && timeTaken > 0) {
      const correctAnswers = results.filter(
        result =>
          result.correctAnswers.length === result.userAnswers.length &&
          result.correctAnswers.every(answer => result.userAnswers.includes(answer))
      ).length;

      const totalQuestions = results.length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      const quizHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        config: formData,
        results: {
          score,
          correctAnswers,
          totalQuestions,
          timeTaken,
        },
        detailedResults: results,
      };

      const existingHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      history.push(quizHistory);
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
    }

    reset();
    setConfig(formData);
    router.push('/quiz');
  };

  if (isLoading || !configOptions) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <Loading message="Loading quiz options..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Your Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <Select
              required
              value={formData.topic}
              onValueChange={value => setFormData(prev => ({ ...prev, topic: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {configOptions.topics.map(topic => (
                  <SelectItem key={topic} value={topic.toLowerCase()}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty Level</label>
            <Select
              value={formData.difficulty}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, difficulty: value as Difficulty }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {configOptions.difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty.toLowerCase()}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Limit</label>
            <Select
              required
              value={formData.timeLimit.toString()}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, timeLimit: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time limit" />
              </SelectTrigger>
              <SelectContent>
                {configOptions.timeLimits.map(timeLimit => (
                  <SelectItem key={timeLimit} value={timeLimit.toString()}>
                    {timeLimit} seconds per question
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Questions</label>
            <Select
              required
              value={formData.numberOfQuestions.toString()}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, numberOfQuestions: parseInt(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                {configOptions.numberOfQuestions.map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} questions
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Start Quiz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
