"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ResultCardProps {
    score: number
    correctAnswers: number
    totalQuestions: number
    timeTaken: number // in seconds
}

export function ResultCard({
    score,
    correctAnswers,
    totalQuestions,
    timeTaken,
}: ResultCardProps) {
    const router = useRouter()

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}m ${remainingSeconds}s`
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                >
                    Go Home
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
    )
} 