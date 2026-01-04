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
      icon: '⏰',
      label: 'Total Fasts',
      value: totalFasts.toString(),
      color: '#3b82f6'
    },
    {
      icon: '📈',
      label: 'Avg Duration',
      value: formatHours(averageDuration),
      color: '#10b981'
    },
    {
      icon: '🏆',
      label: 'Longest Fast',
      value: formatHours(longestFast),
      color: '#f59e0b'
    },
    {
      icon: '🔥',
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: '#ef4444'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => {
        return (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <span className="icon-emoji" style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
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
