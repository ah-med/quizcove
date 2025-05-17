"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, List } from "lucide-react"

interface QuizHeaderProps {
    title: string
    timeRemaining: number
    currentQuestion: number
    totalQuestions: number
}

export function QuizHeader({
    title,
    timeRemaining,
    currentQuestion,
    totalQuestions,
}: QuizHeaderProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <div className="flex justify-between">
                <Alert className="w-fit">
                    <List className="h-4 w-4" />
                    <AlertDescription>
                        Question {currentQuestion} of {totalQuestions}
                    </AlertDescription>
                </Alert>
                <Alert className="w-fit">
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                        {timeRemaining} seconds remaining
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    )
} 