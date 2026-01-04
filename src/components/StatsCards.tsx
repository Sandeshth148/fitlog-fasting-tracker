import { Clock, TrendingUp, Award, Flame } from 'lucide-react';

interface StatsCardsProps {
  totalFasts: number;
  averageDuration: number;
  longestFast: number;
  currentStreak: number;
}

const formatHours = (seconds: number) => {
  const hours = (seconds / 3600).toFixed(1);
  return `${hours}h`;
};

export function StatsCards({ totalFasts, averageDuration, longestFast, currentStreak }: StatsCardsProps) {
  const stats = [
    {
      icon: Clock,
      label: 'Total Fasts',
      value: totalFasts.toString(),
      color: '#3b82f6'
    },
    {
      icon: TrendingUp,
      label: 'Avg Duration',
      value: formatHours(averageDuration),
      color: '#10b981'
    },
    {
      icon: Award,
      label: 'Longest Fast',
      value: formatHours(longestFast),
      color: '#f59e0b'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: '#ef4444'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <Icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
