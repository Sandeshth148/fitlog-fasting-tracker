interface TimerDisplayProps {
  elapsedSeconds: number;
  isActive: boolean;
}

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export function TimerDisplay({ elapsedSeconds, isActive }: TimerDisplayProps) {
  return (
    <div className={`timer-container ${isActive ? 'active' : ''}`}>
      <div className="timer-icon">
        <span className={`icon-emoji ${isActive ? 'pulse' : ''}`}>⏱️</span>
      </div>
      <div className="timer-value">
        {formatTime(elapsedSeconds)}
      </div>
      <div className="timer-label">
        {isActive ? 'Current Fast Duration' : 'Ready to Fast'}
      </div>
    </div>
  );
}
