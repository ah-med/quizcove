"use client"

import Layout from "@/components/layout"
import { ResultCard } from "@/components/result/result-card"
import { ResultDetails } from "@/components/result/result-details"
import { useEffect, useState } from "react"
import { mockQuizResults, mockDetailedResults } from "./mock-data"

interface QuestionResult {
    id: string
    question: string
    correctAnswers: string[]
    userAnswers: string[]
    explanation: string
}

export default function ResultPage() {
    const [detailedResults, setDetailedResults] = useState<QuestionResult[]>([])

    // Use mock data for development
    const score = mockQuizResults.score
    const correctAnswers = mockQuizResults.correctAnswers
    const totalQuestions = mockQuizResults.totalQuestions
    const timeTaken = mockQuizResults.timeTaken

    useEffect(() => {
        // Use mock data for development
        setDetailedResults(mockDetailedResults)

        // Uncomment this when ready to use real data
        // const results = localStorage.getItem("quizResults")
        // if (results) {
        //     setDetailedResults(JSON.parse(results))
        // }
    }, [])

    return (
        <Layout>
            <ResultCard
                score={score}
                correctAnswers={correctAnswers}
                totalQuestions={totalQuestions}
                timeTaken={timeTaken}
            />
            <ResultDetails results={detailedResults} />
        </Layout>
    )
} 