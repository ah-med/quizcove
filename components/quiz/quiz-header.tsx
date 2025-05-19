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
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`

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
                        {timeDisplay} remaining
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    )
} 