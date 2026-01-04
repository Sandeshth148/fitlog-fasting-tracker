import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { type RootState } from './store/store';
import { startFast, endFast, tick, deleteSession, selectStats, type FastingSession } from './store/fastingSlice';
import { TimerDisplay } from './components/TimerDisplay';
import { FastingControls } from './components/FastingControls';
import { FastingHistory } from './components/FastingHistory';
import { StatsCards } from './components/StatsCards';
import { ConfirmDialog } from './components/ConfirmDialog';
import { FastingInsights } from './components/FastingInsights';
import { Modal } from './components/Modal';

interface AppProps {
  user?: string;
}

function App({ user }: AppProps) {
  const dispatch = useDispatch();
  const { isFasting, currentDuration, history } = useSelector((state: RootState) => state.fasting);
  const stats = useSelector((state: RootState) => selectStats(state));

  // Modal state
  const [showEndFastDialog, setShowEndFastDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<FastingSession | null>(null);

  // Get last 10 fasts
  const recentHistory = useMemo(() => history.slice(0, 10), [history]);

  // Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isFasting) {
      // Tick immediately
      dispatch(tick());
      // Then every second
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFasting, dispatch]);

  const handleStart = () => {
    dispatch(startFast());
  };

  const handleEnd = () => {
    setShowEndFastDialog(true);
  };

  const confirmEndFast = () => {
    dispatch(endFast());
  };

  const handleDelete = (id: string) => {
    setSessionToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      dispatch(deleteSession(sessionToDelete));
      setSessionToDelete(null);
    }
  };

  const handleViewInsights = (session: FastingSession) => {
    setSelectedSession(session);
    setShowInsightsModal(true);
  };

  return (
    <div className="fasting-container">
      <div className="header">
        <h1>🍎 Fasting Tracker</h1>
      </div>
      
      {user && (
        <div className="user-welcome">
          <p>Welcome back, <strong>{user}</strong>! 👋</p>
          <p className="user-subtitle">
            {isFasting ? 'Keep going! You are doing great.' : 'Ready to start your next fast?'}
          </p>
        </div>
      )}

      <StatsCards 
        totalFasts={stats.totalFasts}
        averageDuration={stats.averageDuration}
        longestFast={stats.longestFast}
        currentStreak={stats.currentStreak}
      />

      <TimerDisplay 
        elapsedSeconds={currentDuration} 
        isActive={isFasting} 
      />

      <FastingControls 
        isFasting={isFasting} 
        onStart={handleStart} 
        onEnd={handleEnd} 
      />

      <FastingHistory 
        history={recentHistory} 
        onDelete={handleDelete}
        onViewInsights={handleViewInsights}
      />

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showEndFastDialog}
        onClose={() => setShowEndFastDialog(false)}
        onConfirm={confirmEndFast}
        title="End Fast"
        message="Are you sure you want to end your fast? Your progress will be saved to history."
        confirmText="End Fast"
        cancelText="Keep Fasting"
        variant="warning"
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Session"
        message="Are you sure you want to delete this fasting session? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Insights Modal */}
      {selectedSession && (
        <Modal
          isOpen={showInsightsModal}
          onClose={() => setShowInsightsModal(false)}
          title="Fasting Insights"
        >
          <FastingInsights durationSeconds={selectedSession.durationSeconds} />
        </Modal>
      )}
    </div>
  );
}

export default App;
