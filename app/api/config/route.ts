import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import type { ConfigResponse } from '@/lib/api';

export async function GET(): Promise<NextResponse<ConfigResponse | { error: string }>> {
  try {
    const [topics, difficulties] = await Promise.all([
      DatabaseService.getTopics(),
      DatabaseService.getDifficulties(),
    ]);

    const config: ConfigResponse = {
      topics,
      difficulties: difficulties as any,
      timeLimits: [5, 10, 15, 20, 30, 45, 60],
      numberOfQuestions: [5, 10, 15, 20],
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 });
  }
}
