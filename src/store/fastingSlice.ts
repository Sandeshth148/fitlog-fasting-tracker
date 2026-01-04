import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FastingSession {
  id: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  note?: string;
}

interface FastingState {
  isFasting: boolean;
  startTime: number | null;
  currentDuration: number; // Elapsed seconds for current fast
  history: FastingSession[];
}

// Load initial state from local storage if available
const loadState = (): FastingState => {
  try {
    const serializedState = localStorage.getItem('fitlog_fasting_state');
    if (serializedState === null) {
      return {
        isFasting: false,
        startTime: null,
        currentDuration: 0,
        history: []
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      isFasting: false,
      startTime: null,
      currentDuration: 0,
      history: []
    };
  }
};

const initialState: FastingState = loadState();

export const fastingSlice = createSlice({
  name: 'fasting',
  initialState,
  reducers: {
    startFast: (state) => {
      state.isFasting = true;
      state.startTime = Date.now();
      state.currentDuration = 0;
    },
    endFast: (state) => {
      if (state.startTime) {
        const endTime = Date.now();
        const duration = Math.floor((endTime - state.startTime) / 1000);
        
        const newSession: FastingSession = {
          id: crypto.randomUUID(),
          startTime: state.startTime,
          endTime,
          durationSeconds: duration
        };

        state.history.unshift(newSession); // Add to beginning of list
      }
      
      state.isFasting = false;
      state.startTime = null;
      state.currentDuration = 0;
    },
    tick: (state) => {
      if (state.isFasting && state.startTime) {
        state.currentDuration = Math.floor((Date.now() - state.startTime) / 1000);
      }
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(session => session.id !== action.payload);
    },
    // Useful for debugging or manual edits
    resetState: (state) => {
      state.isFasting = false;
      state.startTime = null;
      state.currentDuration = 0;
      state.history = [];
    }
  },
});

export const { startFast, endFast, tick, deleteSession, resetState } = fastingSlice.actions;

// Selectors for computed stats
export const selectStats = (state: { fasting: FastingState }) => {
  const { history } = state.fasting;
  
  if (history.length === 0) {
    return {
      totalFasts: 0,
      averageDuration: 0,
      longestFast: 0,
      currentStreak: 0
    };
  }

  const totalFasts = history.length;
  const totalDuration = history.reduce((sum, session) => sum + session.durationSeconds, 0);
  const averageDuration = totalDuration / totalFasts;
  const longestFast = Math.max(...history.map(s => s.durationSeconds));
  
  // Calculate streak (consecutive days with fasts)
  const sortedHistory = [...history].sort((a, b) => b.endTime - a.endTime);
  let currentStreak = 0;
  let lastDate: Date | null = null;
  
  for (const session of sortedHistory) {
    const sessionDate = new Date(session.endTime);
    sessionDate.setHours(0, 0, 0, 0);
    
    if (!lastDate) {
      currentStreak = 1;
      lastDate = sessionDate;
    } else {
      const daysDiff = Math.floor((lastDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        currentStreak++;
        lastDate = sessionDate;
      } else if (daysDiff > 1) {
        break;
      }
    }
  }

  return {
    totalFasts,
    averageDuration,
    longestFast,
    currentStreak
  };
};

export default fastingSlice.reducer;
