# QuizCove

A modern, interactive quiz application built with Next.js that allows users to test their knowledge on various topics with customizable settings and detailed analytics.

![QuizCove Screenshot](public/screenshot.png)
_Configure your quiz and start testing your knowledge!_

🚀 Features

- **Customizable Quiz Settings**

  - Choose from multiple topics
  - Select difficulty levels (Easy, Medium, Hard)
  - Set custom time limits
  - Configure number of questions
  - Multiple choice questions with single or multiple correct answers

- **Smart Quiz Management**

  - Auto-submission when time limit is reached
  - Auto-submission after answering all questions
  - Real-time progress tracking
  - Cloud-based data storage with Supabase

- **Comprehensive Results**

  - Detailed score breakdown
  - Correct answers count
  - Total questions count
  - Total time taken to complete the quiz
  - Comparison of your answers vs correct answers
  - Explanations for correct answers

- **Performance Analytics**
  - Topic-wise performance tracking
  - Historical quiz results
  - Performance trends over time
  - Cloud-based history storage

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) 15.3.2
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)
- Git
- Supabase account (for database)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/quizcove.git
   cd quizcove
   ```

2. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to **Settings** → **API** to get your project URL and API keys
   - Create a `.env` file with your Supabase credentials:

   ```env
   # Supabase Configuration (New API Key System)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here

   # Optional: Service role key for admin operations
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key_here
   ```

3. **Set up the database**

   This app uses Supabase for data storage. To set up:

   1. Create a Supabase project at [supabase.com](https://supabase.com)
   2. Get your project URL and API keys from Settings → API
   3. Add environment variables to your `.env` file

   If you have existing JSON question files, run the migration script:

   ```bash
   npm run migrate
   ```

4. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
quizcove/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── data/            # Quiz questions (legacy - now in database)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and database services
├── scripts/         # Migration and utility scripts
├── store/           # State management
├── types/           # TypeScript type definitions
└── public/          # Static assets
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
