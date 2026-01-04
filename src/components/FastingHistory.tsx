import { Trash2, History, Info } from 'lucide-react';
import type { FastingSession } from '../store/fastingSlice';
import { format } from 'date-fns';

interface FastingHistoryProps {
  history: FastingSession[];
  onDelete: (id: string) => void;
  onViewInsights: (session: FastingSession) => void;
}

const formatDuration = (seconds: number) => {
  const hours = (seconds / 3600).toFixed(1);
  return `${hours}h`;
};

export function FastingHistory({ history, onDelete, onViewInsights }: FastingHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="history-empty">
        <History size={32} />
        <p>No completed fasts yet. Start one today!</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h3>Recent Fasts</h3>
      <div className="history-list">
        {history.map((session) => (
          <div key={session.id} className="history-item">
            <div className="history-info">
              <span className="history-date">
                {format(session.startTime, 'MMM d, yyyy')}
              </span>
              <span className="history-time">
                {format(session.startTime, 'HH:mm')} - {format(session.endTime, 'HH:mm')}
              </span>
            </div>
            <div className="history-duration">
              {formatDuration(session.durationSeconds)}
            </div>
            <div className="history-actions">
              <button 
                className="btn-insights"
                onClick={() => onViewInsights(session)}
                aria-label="View Insights"
                title="View fasting insights"
              >
                <Info size={16} />
              </button>
              <button 
                className="btn-delete"
                onClick={() => onDelete(session.id)}
                aria-label="Delete Session"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
