"use client"

import Layout from "@/components/layout"
import { ResultCard } from "@/components/result/result-card"
import { ResultDetails } from "@/components/result/result-details"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useQuizStore } from "@/store/quizStore"
import type { QuizConfig, QuestionResult } from "@/types/quiz"
import { STORAGE_KEYS } from "@/constants/storage"
import { Loading } from "@/components/ui/loading"

interface QuizResult {
    score: number
    correctAnswers: number
    totalQuestions: number
    timeTaken: number
}

interface QuizHistory {
    id: string
    date: string
    config: QuizConfig
    results: {
        score: number
        correctAnswers: number
        totalQuestions: number
        timeTaken: number
    }
    detailedResults: QuestionResult[]
}

export default function ResultPage() {
    const router = useRouter()
    const { results, timeTaken, config, reset } = useQuizStore()
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
    const [isCalculating, setIsCalculating] = useState(true)
    const hasSavedHistory = useRef(false)

    useEffect(() => {
        if (results.length === 0 || timeTaken === 0 || !config || hasSavedHistory.current) {
            if (!config) {
                router.push('/')
            }
            return
        }

        setIsCalculating(true)

        const correctAnswers = results.filter(result =>
            result.correctAnswers.length === result.userAnswers.length &&
            result.correctAnswers.every(answer => result.userAnswers.includes(answer))
        ).length

        const totalQuestions = results.length
        const score = Math.round((correctAnswers / totalQuestions) * 100)

        const newQuizResult = {
            score,
            correctAnswers,
            totalQuestions,
            timeTaken
        }

        setQuizResult(newQuizResult)

        const quizHistory: QuizHistory = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            config,
            results: newQuizResult,
            detailedResults: results
        }

        const existingHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY)
        const history: QuizHistory[] = existingHistory ? JSON.parse(existingHistory) : []

        history.push(quizHistory)

        localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history))

        hasSavedHistory.current = true
        setIsCalculating(false)
    }, [results, timeTaken, config, router])

    const handleStartNewQuiz = () => {
        reset()
        router.push('/')
    }

    if (!config) {
        return (
            <Layout>
                <Loading message="Redirecting to home page..." fullScreen />
            </Layout>
        )
    }

    if (isCalculating || !quizResult) {
        return (
            <Layout>
                <Loading message="Calculating your results..." fullScreen />
            </Layout>
        )
    }

    return (
        <Layout>
            <ResultCard
                score={quizResult.score}
                correctAnswers={quizResult.correctAnswers}
                totalQuestions={quizResult.totalQuestions}
                timeTaken={quizResult.timeTaken}
                onStartNewQuiz={handleStartNewQuiz}
            />
            <ResultDetails results={results} />
        </Layout>
    )
} 