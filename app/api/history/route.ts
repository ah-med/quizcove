import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import type { QuizHistory } from '@/types/quiz';

export async function GET(
  request: Request
): Promise<NextResponse<QuizHistory[] | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');

    let history: QuizHistory[];

    if (topic) {
      history = await DatabaseService.getQuizHistoryByTopic(topic, userId || undefined);
    } else {
      history = await DatabaseService.getQuizHistory(limit, userId || undefined);
    }

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz history' }, { status: 500 });
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<{ id: string } | { error: string }>> {
  try {
    const { history, userId } = await request.json();
    const id = await DatabaseService.saveQuizHistory(history, userId);

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error saving quiz history:', error);
    return NextResponse.json({ error: 'Failed to save quiz history' }, { status: 500 });
  }
}
