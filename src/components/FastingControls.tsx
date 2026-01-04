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
          <span className="icon-emoji">▶️</span>
          <span>Start Fasting</span>
        </button>
      ) : (
        <button 
          className="btn-stop" 
          onClick={onEnd}
          aria-label="End Fast"
        >
          <span className="icon-emoji">⏹️</span>
          <span>End Fast</span>
        </button>
      )}
    </div>
  );
}
