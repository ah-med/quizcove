import { createClient } from '@supabase/supabase-js';
import type { QuizConfig, QuizQuestion, QuizHistory } from '@/types/quiz';

// Client-side Supabase instance (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase instance (uses service role key for admin operations)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export class DatabaseService {
  // Questions
  static async getQuestions(config: QuizConfig): Promise<QuizQuestion[]> {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('topic', config.topic)
      .eq('difficulty', config.difficulty)
      .limit(config.numberOfQuestions);

    if (error) {
      throw new Error(`Failed to fetch questions: ${error.message}`);
    }

    return data.map(question => ({
      id: question.id,
      question: question.question,
      options: question.options,
      correctAnswers: question.correct_answers,
      type: question.type as 'single' | 'multiple',
      explanation: question.explanation,
      code: question.code_snippet,
    }));
  }

  static async getTopics(): Promise<string[]> {
    const { data, error } = await supabase.from('questions').select('topic').order('topic');

    if (error) {
      throw new Error(`Failed to fetch topics: ${error.message}`);
    }

    return [...new Set(data.map(q => q.topic))];
  }

  static async getDifficulties(): Promise<string[]> {
    const { data, error } = await supabase
      .from('questions')
      .select('difficulty')
      .order('difficulty');

    if (error) {
      throw new Error(`Failed to fetch difficulties: ${error.message}`);
    }

    return [...new Set(data.map(q => q.difficulty))];
  }

  // Quiz History
  static async saveQuizHistory(history: Omit<QuizHistory, 'id'>, userId?: string): Promise<string> {
    const { data, error } = await supabase
      .from('quiz_history')
      .insert({
        user_id: userId,
        topic: history.config.topic,
        difficulty: history.config.difficulty,
        score: history.results.score,
        correct_answers: history.results.correctAnswers,
        total_questions: history.results.totalQuestions,
        time_taken: history.results.timeTaken,
        detailed_results: history.detailedResults,
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save quiz history: ${error.message}`);
    }

    return data.id;
  }

  static async getQuizHistory(limit = 50, userId?: string): Promise<QuizHistory[]> {
    let query = supabase
      .from('quiz_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch quiz history: ${error.message}`);
    }

    return data.map(history => ({
      id: history.id,
      date: history.created_at,
      config: {
        topic: history.topic,
        difficulty: history.difficulty as any,
        timeLimit: 0, // Not stored in DB
        numberOfQuestions: history.total_questions,
      },
      results: {
        score: history.score,
        correctAnswers: history.correct_answers,
        totalQuestions: history.total_questions,
        timeTaken: history.time_taken,
      },
      detailedResults: history.detailed_results,
    }));
  }

  static async getQuizHistoryByTopic(topic: string, userId?: string): Promise<QuizHistory[]> {
    let query = supabase
      .from('quiz_history')
      .select('*')
      .eq('topic', topic)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch quiz history: ${error.message}`);
    }

    return data.map(history => ({
      id: history.id,
      date: history.created_at,
      config: {
        topic: history.topic,
        difficulty: history.difficulty as any,
        timeLimit: 0,
        numberOfQuestions: history.total_questions,
      },
      results: {
        score: history.score,
        correctAnswers: history.correct_answers,
        totalQuestions: history.total_questions,
        timeTaken: history.time_taken,
      },
      detailedResults: history.detailed_results,
    }));
  }
}
