# Quiz App

## Goal

Goal is to get an idea of how much you know about a topic.

## Requirements

- Test your knowledge on a topic
- Choose a topic (required)
- Choose a difficulty level (defaults to medium)
- Choose a time limit (required)
- Choose number of questions (required)
- Multiple choice questions with more than one correct answers or one answer is correct kind of question
- Quiz should auto submit after the time limit
- Quiz should auto submit after answering all the questions
- When you quit the quiz your session will not be saved.
- See results after completion
  - displays your score, correct answers count, total questions count, time taken to complete the quiz.
  - see correct answers vs your options
  - see explanation of the correct answer(s).
- Topic results are saved in the browser local storage
- See quiz analytics of your performance for each topic


## Tech Stack

- React (Next.js)
- Tailwind CSS
- Shadcn UI
- TypeScript
- Storage: Browser Local Storage for storing quiz results and history
- API: Questions loaded from a JSON file


## UI

### Layout
There is only one page layout for the app.
i.e every page has the same layout. on the the main content area is dynamic.

- Header
  - logo or name of app on the left (link to home page)
  - star on github icon on the right (link to github repo)

- Main (dynamic content area)
  - middle content area (dynamic content area)
  - with a reasonable/suitable max-width

- Footer
  - content is centered
  - copyright message
  - made with ☕️ by [your github username link to your github profile]

### Pages
- Home Page Content Area
  - Hero section
    - title: 'hero text for what the app is about'
    - subtitle: 'main catching feature of the app'
  - Form Area To Start Quiz
    - Select a Topic from dropdown list of available topics
      - Topic 1
      - Topic 2
      - Topic 3
    - Select a difficulty level from dropdown list of available difficulty levels
      - Easy
      - Medium
      - Hard
    - Select a time limit from dropdown list of available time limits
      - 60 seconds per question
      - 45 seconds per question
      - 30 seconds per question
      - 15 seconds per question
    - Select a number of questions from dropdown list of available number of questions
      - 10 questions
      - 20 questions
      - 30 questions
    - Button to start the quiz


- Quiz Page Content Area
  - Component/Elements
    - quizTitle: title of the quiz in the format of 'Topic - Difficulty Level'
    - timeRemaining: time remaining counter alert at the top right corner of the content area (Client Side component due to it's dynamic nature)
    - questionCounter: question counter alert at the top left corner of the content area (Client Side component due to it's dynamic nature)
    - QuestionCard: card with the question and the answer options (Client Side component due to it's dynamic nature)
      - question: question text (aligned left)
      - answerOptions: list of answer options (aligned left)
  - Layout for content area
    - quizTitle: place at the top center of the content area
    - timeRemaining: place at the top right corner just below the quizTitle the same row as questionCounter
    - questionCounter: place at the top left corner just below the quizTitle the same row as timeRemaining
    - QuestionCard: place at the center of the content area below the timeRemaining/questionCounter row

- Result Page Content Area
  - Component/Elements
    - ResultCard: card with the result of the quiz
      - score: score of the quiz - % of correct answers
      - correctAnswers: number of correct answers
      - totalQuestions: total number of questions
    - Go Home Button: button to go back to the home page
    - More Details Section: section to see more details about the quiz and your performance
      - Array of accordion items with the question, correct answer, your answer, and explanation of the correct answer
  - Layout for content area
    - ResultCard: place at the top center of the content area
    - Go Home Button: place at the top right corner of the content area
    - More Details Section: place at the center of the content area below the ResultCard

### Components Interaction (Events, Actions and State Management)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
