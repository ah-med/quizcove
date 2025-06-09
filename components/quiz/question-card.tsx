'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Code } from '@/components/ui/code';
import { QuizQuestion, Option } from '@/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswers: string[];
  onAnswerSelect: (answer: string) => void;
  onNextQuestion?: () => void;
}

function OptionLabel({ option }: { option: Option }) {
  if (typeof option === 'string') {
    return <span>{option}</span>;
  }

  return (
    <div className="space-y-2">
      <span>{option.text}</span>
      {option.code && (
        <Code variant="block" language={option.code.language}>
          {option.code.code}
        </Code>
      )}
    </div>
  );
}

export function QuestionCard({
  question,
  selectedAnswers,
  onAnswerSelect,
  onNextQuestion,
}: QuestionCardProps) {
  const getOptionValue = (option: Option): string => {
    return typeof option === 'string' ? option : option.text;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-words">{question.question}</CardTitle>
        {question.code && (
          <div className="w-full">
            <Code variant="block" language={question.code.language}>
              {question.code.code}
            </Code>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'single' ? (
          <RadioGroup value={selectedAnswers[0]} onValueChange={onAnswerSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={getOptionValue(option)} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer break-words">
                  <OptionLabel option={option} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  checked={selectedAnswers.includes(getOptionValue(option))}
                  onCheckedChange={() => onAnswerSelect(getOptionValue(option))}
                />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer break-words">
                  <OptionLabel option={option} />
                </Label>
              </div>
            ))}
            {onNextQuestion && (
              <Button onClick={onNextQuestion} disabled={selectedAnswers.length === 0}>
                Next Question
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
