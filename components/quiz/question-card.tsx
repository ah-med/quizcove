"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface Question {
    id: string
    text: string
    options: {
        id: string
        text: string
    }[]
    type: "single" | "multiple"
}

interface QuestionCardProps {
    question: Question
    selectedAnswers: string[]
    onAnswerSelect: (answerId: string) => void
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
                <CardTitle className="text-lg">{question.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {question.type === "single" ? (
                    <RadioGroup
                        value={selectedAnswers[0]}
                        onValueChange={onAnswerSelect}
                        className="space-y-3"
                    >
                        {question.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id}>{option.text}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    <div className="space-y-3">
                        {question.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option.id}
                                    checked={selectedAnswers.includes(option.id)}
                                    onCheckedChange={() => onAnswerSelect(option.id)}
                                />
                                <Label htmlFor={option.id}>{option.text}</Label>
                            </div>
                        ))}
                        {onNextQuestion && (
                            <Button
                                onClick={onNextQuestion}
                                className="mt-4"
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