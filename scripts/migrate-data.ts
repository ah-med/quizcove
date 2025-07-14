import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { QuizQuestion } from '../types/quiz';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config({ path: '.env' });

// Use service role key for admin operations like data migration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is required.');
  console.error('Please check your .env file and make sure it contains:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.error('');
  console.error('See SETUP.md for detailed instructions.');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required.');
  console.error('Please check your .env file and make sure it contains:');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key_here');
  console.error('');
  console.error('You can find this key in your Supabase dashboard under Settings → API');
  console.error('See SETUP.md for detailed instructions.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface QuestionData {
  questions: QuizQuestion[];
}

async function migrateQuestions() {
  const questionsDir = path.join(process.cwd(), 'data', 'questions');
  const topics = fs
    .readdirSync(questionsDir)
    .filter(file => fs.statSync(path.join(questionsDir, file)).isDirectory());

  for (const topic of topics) {
    const topicDir = path.join(questionsDir, topic);
    const difficulties = fs.readdirSync(topicDir).filter(file => file.endsWith('.json'));

    for (const difficultyFile of difficulties) {
      const difficulty = difficultyFile.replace('.json', '');
      const filePath = path.join(topicDir, difficultyFile);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { questions }: QuestionData = JSON.parse(fileContent);

      console.log(`Migrating ${topic}/${difficulty}: ${questions.length} questions`);

      for (const question of questions) {
        const { error } = await supabase.from('questions').insert({
          topic,
          difficulty,
          question: question.question,
          options: question.options,
          correct_answers: question.correctAnswers,
          type: question.type,
          explanation: question.explanation,
          code_snippet: question.code,
        });

        if (error) {
          console.error(`Error inserting question ${question.id}:`, error);
        }
      }
    }
  }

  console.log('Migration completed!');
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateQuestions().catch(console.error);
}

export { migrateQuestions };
