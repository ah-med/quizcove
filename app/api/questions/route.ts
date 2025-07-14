import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { shuffle } from '@/lib/utils';
import type { QuizConfig, QuizQuestion } from '@/types/quiz';

export async function POST(
  request: Request
): Promise<NextResponse<QuizQuestion[] | { error: string }>> {
  try {
    const config = (await request.json()) as QuizConfig;

    if (!config.topic || !config.difficulty || !config.numberOfQuestions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch more questions than needed to allow for shuffling
    const questions = await DatabaseService.getQuestions({
      ...config,
      numberOfQuestions: Math.min(config.numberOfQuestions * 2, 50), // Get more questions for shuffling
    });

    if (questions.length === 0) {
      return NextResponse.json(
        { error: 'No questions found for the selected topic and difficulty' },
        { status: 404 }
      );
    }

    // Shuffle and limit to requested number
    const shuffledQuestions = shuffle(questions).slice(0, config.numberOfQuestions);

    return NextResponse.json(shuffledQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
