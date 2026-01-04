import { Play, Square } from 'lucide-react';

interface FastingControlsProps {
  isFasting: boolean;
  onStart: () => void;
  onEnd: () => void;
}

export function FastingControls({ isFasting, onStart, onEnd }: FastingControlsProps) {
  return (
    <div className="controls-container">
      {!isFasting ? (
        <button 
          className="btn-start" 
          onClick={onStart}
          aria-label="Start Fast"
        >
          <Play size={24} fill="currentColor" />
          <span>Start Fasting</span>
        </button>
      ) : (
        <button 
          className="btn-stop" 
          onClick={onEnd}
          aria-label="End Fast"
        >
          <Square size={24} fill="currentColor" />
          <span>End Fast</span>
        </button>
      )}
    </div>
  );
}
