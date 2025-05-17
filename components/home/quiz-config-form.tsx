import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuizConfigForm() {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Configure Your Quiz</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Topic</label>
                        <Select required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="react">React</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Difficulty Level</label>
                        <Select defaultValue="medium">
                            <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Time Limit</label>
                        <Select required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time limit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="60">60 seconds per question</SelectItem>
                                <SelectItem value="45">45 seconds per question</SelectItem>
                                <SelectItem value="30">30 seconds per question</SelectItem>
                                <SelectItem value="15">15 seconds per question</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Number of Questions</label>
                        <Select required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 questions</SelectItem>
                                <SelectItem value="20">20 questions</SelectItem>
                                <SelectItem value="30">30 questions</SelectItem>
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