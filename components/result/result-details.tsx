'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuestionResult {
  id: string;
  question: string;
  correctAnswers: string[];
  userAnswers: string[];
  explanation: string;
}

interface ResultDetailsProps {
  results: QuestionResult[];
}

export function ResultSummary({ results }: ResultDetailsProps) {
  const isAnswerCorrect = (result: QuestionResult) => {
    if (result.correctAnswers.includes('All of the above')) {
      return (
        result.userAnswers.includes('All of the above') ||
        result.correctAnswers
          .filter(answer => answer !== 'All of the above')
          .every(answer => result.userAnswers.includes(answer))
      );
    }

    if (result.userAnswers.length !== result.correctAnswers.length) return false;
    return (
      result.correctAnswers.every(answer => result.userAnswers.includes(answer)) &&
      result.userAnswers.every(answer => result.correctAnswers.includes(answer))
    );
  };

  const totalCorrect = results.filter(result => isAnswerCorrect(result)).length;
  const totalIncorrect = results.length - totalCorrect;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium">{totalCorrect}</span>
      </div>
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5 text-red-600" />
        <span className="text-sm font-medium">{totalIncorrect}</span>
      </div>
    </div>
  );
}

export function ResultQuestions({ results }: ResultDetailsProps) {
  const isAnswerCorrect = (result: QuestionResult) => {
    if (result.correctAnswers.includes('All of the above')) {
      return (
        result.userAnswers.includes('All of the above') ||
        result.correctAnswers
          .filter(answer => answer !== 'All of the above')
          .every(answer => result.userAnswers.includes(answer))
      );
    }

    if (result.userAnswers.length !== result.correctAnswers.length) return false;
    return (
      result.correctAnswers.every(answer => result.userAnswers.includes(answer)) &&
      result.userAnswers.every(answer => result.correctAnswers.includes(answer))
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {results.map((result, index) => {
        const isCorrect = isAnswerCorrect(result);
        return (
          <AccordionItem key={result.id} value={result.id}>
            <AccordionTrigger
              className={cn('group', isCorrect ? 'text-green-600' : 'text-red-600')}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span>{`${index + 1}: ${result.question}`}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">
                    Correct Answer{result.correctAnswers.length > 1 ? 's' : ''}:
                  </p>
                  <div className="mt-2 space-y-1">
                    {result.correctAnswers.map((answer, i) => (
                      <p key={i} className="text-muted-foreground">
                        {answer}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    Your Answer{result.userAnswers.length > 1 ? 's' : ''}:
                  </p>
                  <div className="mt-2 space-y-1">
                    {result.userAnswers.length > 0 ? (
                      result.userAnswers.map((answer, i) => {
                        const isAnswerCorrect =
                          result.correctAnswers.includes(answer) ||
                          result.correctAnswers.includes('All of the above');
                        return (
                          <p
                            key={i}
                            className={cn(
                              'flex items-center gap-2',
                              isAnswerCorrect ? 'text-green-600' : 'text-red-600'
                            )}
                          >
                            {isAnswerCorrect ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {answer}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">No answer provided</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Explanation:</p>
                  <p className="mt-2 text-muted-foreground">{result.explanation}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export function ResultDetails({ results }: ResultDetailsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Detailed Results</CardTitle>
          <ResultSummary results={results} />
        </div>
      </CardHeader>
      <CardContent>
        <ResultQuestions results={results} />
      </CardContent>
    </Card>
  );
}
