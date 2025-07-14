import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: string;
          topic: string;
          difficulty: string;
          question: string;
          options: any;
          correct_answers: any;
          type: string;
          explanation: string;
          code_snippet?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          topic: string;
          difficulty: string;
          question: string;
          options: any;
          correct_answers: any;
          type: string;
          explanation: string;
          code_snippet?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          topic?: string;
          difficulty?: string;
          question?: string;
          options?: any;
          correct_answers?: any;
          type?: string;
          explanation?: string;
          code_snippet?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_history: {
        Row: {
          id: string;
          user_id?: string;
          topic: string;
          difficulty: string;
          score: number;
          correct_answers: number;
          total_questions: number;
          time_taken: number;
          detailed_results: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          topic: string;
          difficulty: string;
          score: number;
          correct_answers: number;
          total_questions: number;
          time_taken: number;
          detailed_results: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic?: string;
          difficulty?: string;
          score?: number;
          correct_answers?: number;
          total_questions?: number;
          time_taken?: number;
          detailed_results?: any;
          created_at?: string;
        };
      };
    };
  };
}
