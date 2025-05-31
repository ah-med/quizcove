import { Card, CardContent } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';

interface PerformanceOverviewCardProps {
  totalQuizzes: number;
  averageScore: number;
  totalTimeSpent: number;
  mostAttemptedTopic: string;
}

export const PerformanceOverviewCard = ({
  totalQuizzes,
  averageScore,
  totalTimeSpent,
  mostAttemptedTopic,
}: PerformanceOverviewCardProps) => {
  const metrics = [
    {
      label: 'Total Quizzes',
      value: totalQuizzes.toString(),
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
    },
    {
      label: 'Total Time Spent',
      value: formatTime(totalTimeSpent),
    },
    {
      label: 'Most Attempted Topic',
      value: mostAttemptedTopic || 'None',
    },
  ];

  return (
    <Card data-testid="performance-overview-card">
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} data-testid="metric-item" className="flex flex-col items-center p-4">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="text-2xl font-bold mt-1">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
