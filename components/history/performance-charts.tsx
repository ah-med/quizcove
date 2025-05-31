import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import type { QuizHistory } from '@/types/quiz';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { formatTime } from '@/lib/utils';

interface TopicWisePerformanceChartProps {
  history: QuizHistory[];
  selectedTopic: string;
}

const timeRanges = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: 1 },
  { label: 'Last 3 Days', days: 3 },
  { label: 'Last Week', days: 7 },
  { label: 'Last Month', days: 30 },
  { label: 'Last 3 Months', days: 90 },
  { label: 'Last 6 Months', days: 180 },
  { label: 'Last Year', days: 365 },
  { label: 'All Time', days: Infinity },
];

const difficulties = [
  { label: 'All Difficulties', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

/**
 * Props for the CustomTooltip component.
 * Note: The payload type is simplified for documentation purposes.
 * Recharts internally uses a more complex type structure, but the data
 * will always contain the following properties in the payload:
 * - date: string (formatted date/time)
 * - fullDate: string (complete date/time string)
 * - score: number (quiz score)
 * - difficulty: string (quiz difficulty)
 * - timeTaken: number (time taken in seconds)
 */
interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  selectedTimeRange: (typeof timeRanges)[0];
  selectedDifficulty: (typeof difficulties)[0];
}

const CustomTooltip = ({
  active,
  payload,
  selectedTimeRange,
  selectedDifficulty,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const showDate = selectedTimeRange.label !== 'Today' && selectedTimeRange.label !== 'Yesterday';
    const showDifficulty = selectedDifficulty.value !== 'all';

    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg space-y-2">
        {showDate && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Date & Time</p>
            <p className="text-sm text-muted-foreground">{data.fullDate}</p>
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-medium">Score</p>
          <p className="text-sm text-muted-foreground">{data.score}%</p>
        </div>
        {!showDifficulty && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Difficulty</p>
            <p className="text-sm text-muted-foreground capitalize">{data.difficulty}</p>
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-medium">Time Taken</p>
          <p className="text-sm text-muted-foreground">{formatTime(data.timeTaken)}</p>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * TopicWisePerformanceChart component displays quiz performance data in two charts:
 * 1. A timeline chart showing score progression
 * 2. A bar chart showing average scores by difficulty
 *
 * @param history - Array of quiz history entries
 * @param selectedTopic - Currently selected topic to filter data
 */
export function TopicWisePerformanceChart({
  history,
  selectedTopic,
}: TopicWisePerformanceChartProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0]); // Default to Today
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0]); // Default to All Difficulties

  // Filter history for selected topic
  const topicHistory = history.filter(quiz => quiz.config.topic === selectedTopic);

  // Filter by time range and difficulty
  const filteredHistory = topicHistory.filter(quiz => {
    const quizDate = new Date(quiz.date);
    const now = new Date();

    // Time range filtering
    const isToday = quizDate.toDateString() === now.toDateString();
    const isYesterday =
      quizDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

    let timeFilter = false;
    if (selectedTimeRange.days === 0) {
      timeFilter = isToday;
    } else if (selectedTimeRange.days === 1) {
      timeFilter = isYesterday;
    } else {
      const diffTime = Math.abs(now.getTime() - quizDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      timeFilter = diffDays <= selectedTimeRange.days;
    }

    // Difficulty filtering
    const difficultyFilter =
      selectedDifficulty.value === 'all' || quiz.config.difficulty === selectedDifficulty.value;

    return timeFilter && difficultyFilter;
  });

  // Prepare data for line chart (score progression)
  const scoreData = filteredHistory.map(quiz => {
    const quizDate = new Date(quiz.date);
    const now = new Date();
    const isToday = quizDate.toDateString() === now.toDateString();
    const isYesterday =
      quizDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

    return {
      date:
        isToday || isYesterday
          ? quizDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : quizDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
      fullDate: quizDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score: quiz.results.score,
      difficulty: quiz.config.difficulty,
      timeTaken: quiz.results.timeTaken,
    };
  });

  // Prepare data for bar chart (average scores by difficulty)
  const difficultyData = filteredHistory.reduce(
    (acc, quiz) => {
      const difficulty = quiz.config.difficulty;
      if (!acc[difficulty]) {
        acc[difficulty] = { total: 0, count: 0 };
      }
      acc[difficulty].total += quiz.results.score;
      acc[difficulty].count++;
      return acc;
    },
    {} as Record<string, { total: number; count: number }>
  );

  const barData = Object.entries(difficultyData)
    .map(([difficulty, data]) => ({
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      averageScore: Math.round(data.total / data.count),
    }))
    .sort((a, b) => {
      const order = { easy: 0, medium: 1, hard: 2 };
      return (
        order[a.difficulty.toLowerCase() as keyof typeof order] -
        order[b.difficulty.toLowerCase() as keyof typeof order]
      );
    });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-4">
            <CardTitle>Performance Timeline</CardTitle>
            <div className="flex flex-col gap-2 md:flex-row">
              <Select
                value={selectedDifficulty.value}
                onValueChange={value => {
                  const difficulty = difficulties.find(d => d.value === value);
                  if (difficulty) setSelectedDifficulty(difficulty);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedTimeRange.label}
                onValueChange={value => {
                  const range = timeRanges.find(r => r.label === value);
                  if (range) setSelectedTimeRange(range);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map(range => (
                    <SelectItem key={range.label} value={range.label}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  content={props => (
                    <CustomTooltip
                      {...props}
                      selectedTimeRange={selectedTimeRange}
                      selectedDifficulty={selectedDifficulty}
                    />
                  )}
                  cursor={{ stroke: 'hsl(var(--muted))' }}
                />
                <Area
                  type="linear"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  dot={false}
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Average Score by Difficulty</CardTitle>
            <Select
              value={selectedTimeRange.label}
              onValueChange={value => {
                const range = timeRanges.find(r => r.label === value);
                if (range) setSelectedTimeRange(range);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" vertical={false} />
                <XAxis
                  dataKey="difficulty"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg space-y-2">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Difficulty</p>
                            <p className="text-sm text-muted-foreground">{data.difficulty}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Average Score</p>
                            <p className="text-sm text-muted-foreground">{data.averageScore}%</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.1 }}
                />
                <Bar dataKey="averageScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
