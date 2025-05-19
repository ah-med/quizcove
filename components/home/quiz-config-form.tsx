"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/store/quizStore"
import type { QuizConfig } from "@/store/quizStore"
import { STORAGE_KEYS } from "@/constants/storage"

const QUIZ_CONFIG = {
    topics: ["JavaScript", "Python", "React", "TypeScript", "Node.js"],
    difficulties: ["Easy", "Medium", "Hard"],
    timeLimits: [15, 30, 45, 60],
    numberOfQuestions: [10, 20, 30]
}

export function QuizConfigForm() {
    const router = useRouter()
    const { results, timeTaken, reset, setConfig } = useQuizStore()
    const [formData, setFormData] = useState<QuizConfig>({
        topic: "",
        difficulty: "medium",
        timeLimit: 30,
        numberOfQuestions: 10
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Save current quiz to history if it exists
        if (results.length > 0 && timeTaken > 0) {
            const correctAnswers = results.filter((result) =>
                result.correctAnswers.length === result.userAnswers.length &&
                result.correctAnswers.every((answer) => result.userAnswers.includes(answer))
            ).length

            const totalQuestions = results.length
            const score = Math.round((correctAnswers / totalQuestions) * 100)

            const quizHistory = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                config: formData,
                results: {
                    score,
                    correctAnswers,
                    totalQuestions,
                    timeTaken
                },
                detailedResults: results
            }

            // Get existing history or initialize empty array
            const existingHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY)
            const history = existingHistory ? JSON.parse(existingHistory) : []

            // Add new quiz to history
            history.push(quizHistory)

            // Save updated history
            localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history))
        }

        // Reset store and set new config
        reset()
        setConfig(formData)
        router.push('/quiz')
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
                            onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {QUIZ_CONFIG.topics.map((topic) => (
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
                            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                {QUIZ_CONFIG.difficulties.map((difficulty) => (
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
                            onValueChange={(value) => setFormData(prev => ({ ...prev, timeLimit: parseInt(value) }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select time limit" />
                            </SelectTrigger>
                            <SelectContent>
                                {QUIZ_CONFIG.timeLimits.map((timeLimit) => (
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
                            onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfQuestions: parseInt(value) }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                                {QUIZ_CONFIG.numberOfQuestions.map((num) => (
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
    )
} 