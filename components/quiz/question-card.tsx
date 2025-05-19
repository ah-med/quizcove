"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
    id: string
    text: string
    type: "single" | "multiple"
    options: string[]
    correctAnswers: string[]
    explanation: string
}

interface QuestionCardProps {
    question: Question
    selectedAnswers: string[]
    onAnswerSelect: (answer: string) => void
    onNextQuestion?: () => void
}

export function QuestionCard({
    question,
    selectedAnswers,
    onAnswerSelect,
    onNextQuestion,
}: QuestionCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{question.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {question.type === "single" ? (
                    <RadioGroup
                        value={selectedAnswers[0]}
                        onValueChange={onAnswerSelect}
                    >
                        {question.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option}>{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option}
                                    checked={selectedAnswers.includes(option)}
                                    onCheckedChange={() => onAnswerSelect(option)}
                                />
                                <Label htmlFor={option}>{option}</Label>
                            </div>
                        ))}
                        {onNextQuestion && (
                            <Button
                                onClick={onNextQuestion}
                                disabled={selectedAnswers.length === 0}
                            >
                                Next Question
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 