'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/utils';

interface ResultCardProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  onStartNewQuiz: () => void;
  onCreateAccount?: () => void;
}

export function ResultCard({
  score,
  correctAnswers,
  totalQuestions,
  timeTaken,
  onStartNewQuiz,
  onCreateAccount,
}: ResultCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        {onCreateAccount && (
          <Button onClick={onCreateAccount} variant="default">
            Create Account
          </Button>
        )}
        <Button onClick={() => onStartNewQuiz()} variant="outline">
          Start New Quiz
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="space-y-1 text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold">{score}%</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm text-muted-foreground">Time Taken</p>
              <p className="text-2xl font-bold">{formatTime(timeTaken)}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm text-muted-foreground">Correct Answers</p>
              <p className="text-2xl font-bold">{correctAnswers}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm text-muted-foreground">Total Questions</p>
              <p className="text-2xl font-bold">{totalQuestions}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
