import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { QuizConfig, QuizQuestion } from "@/types/quiz"

export async function POST(request: Request): Promise<NextResponse<QuizQuestion[] | { error: string }>> {
    try {
        const { topic, difficulty, numberOfQuestions } = await request.json() as QuizConfig

        if (!topic || !difficulty || !numberOfQuestions) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const filePath = path.join(process.cwd(), "data", "questions", topic, `${difficulty}.json`)

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "Questions not found for the selected topic and difficulty" },
                { status: 404 }
            )
        }

        const fileContent = fs.readFileSync(filePath, "utf-8")
        const { questions } = JSON.parse(fileContent) as { questions: QuizQuestion[] }

        if (!Array.isArray(questions)) {
            return NextResponse.json(
                { error: "Invalid questions format" },
                { status: 500 }
            )
        }

        const shuffledQuestions = [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, numberOfQuestions)

        return NextResponse.json(shuffledQuestions)
    } catch (error) {
        console.error("Error fetching questions:", error)
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 }
        )
    }
}
