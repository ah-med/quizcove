import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { ConfigResponse } from '@/lib/api';

export async function GET(): Promise<NextResponse<ConfigResponse | { error: string }>> {
  try {
    const questionsDir = path.join(process.cwd(), 'data', 'questions');
    const topics = fs
      .readdirSync(questionsDir)
      .filter(file => fs.statSync(path.join(questionsDir, file)).isDirectory());

    const config: ConfigResponse = {
      topics,
      difficulties: ['easy', 'medium', 'hard'],
      timeLimits: [5, 10, 15, 20, 30, 45, 60],
      numberOfQuestions: [5, 10, 15, 20],
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 });
  }
}
