"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { QuizHeader } from "@/components/quiz/quiz-header"
import { QuestionCard } from "@/components/quiz/question-card"

// Temporary mock data for development
const mockQuestions = [
    {
        id: "1",
        text: "What is the correct way to declare a variable in JavaScript?",
        type: "single" as const,
        options: [
            { id: "a", text: "var x = 5;" },
            { id: "b", text: "variable x = 5;" },
            { id: "c", text: "v x = 5;" },
            { id: "d", text: "let x = 5;" },
        ],
    },
    {
        id: "2",
        text: "Which of the following are valid JavaScript array methods? (Select all that apply)",
        type: "multiple" as const,
        options: [
            { id: "a", text: "push()" },
            { id: "b", text: "append()" },
            { id: "c", text: "pop()" },
            { id: "d", text: "add()" },
            { id: "e", text: "shift()" },
        ],
    },
]

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

    const currentQuestion = mockQuestions[currentQuestionIndex]

    const handleAnswerSelect = (answerId: string) => {
        if (currentQuestion.type === "single") {
            setSelectedAnswers([answerId])
        } else {
            setSelectedAnswers((prev) =>
                prev.includes(answerId)
                    ? prev.filter((id) => id !== answerId)
                    : [...prev, answerId]
            )
        }


        // go to next question
        // check if there are more questions if yes then go to next question if no then show result page
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            // clear the selected answers
            setSelectedAnswers([])
        } else {
            // show result page
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < mockQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswers([])
        } else {
            // show result page
        }
    }

    return (
        <Layout>
            <div className="space-y-8">
                <QuizHeader
                    title="JavaScript - Medium"
                    timeRemaining={45}
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={mockQuestions.length}
                />
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswers={selectedAnswers}
                    onAnswerSelect={handleAnswerSelect}
                    onNextQuestion={currentQuestion.type === "multiple" ? handleNextQuestion : undefined}
                />
            </div>
        </Layout>
    )
}
