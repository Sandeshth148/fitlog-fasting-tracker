export interface FastingPhase {
  name: string;
  startHour: number;
  endHour: number;
  color: string;
  icon: string;
  benefits: string[];
  description: string;
}

export const FASTING_PHASES: FastingPhase[] = [
  {
    name: 'Anabolic',
    startHour: 0,
    endHour: 4,
    color: '#3b82f6',
    icon: '🍽️',
    benefits: ['Blood sugar spike', 'Insulin release', 'Nutrient absorption'],
    description: 'Your body is processing the food you ate, storing energy as glycogen.'
  },
  {
    name: 'Catabolic',
    startHour: 4,
    endHour: 16,
    color: '#8b5cf6',
    icon: '⚡',
    benefits: ['Glycogen depletion', 'Blood sugar stabilization', 'Growth hormone increase'],
    description: 'Your body starts using stored glycogen for energy. Insulin levels drop.'
  },
  {
    name: 'Fat Burning',
    startHour: 16,
    endHour: 24,
    color: '#f59e0b',
    icon: '🔥',
    benefits: ['Ketosis begins', 'Fat breakdown', 'Mental clarity', 'Increased energy'],
    description: 'Your body switches to burning fat for fuel, producing ketones.'
  },
  {
    name: 'Ketosis',
    startHour: 24,
    endHour: 48,
    color: '#10b981',
    icon: '🧠',
    benefits: ['Deep ketosis', 'Autophagy activation', 'Brain optimization', 'Cellular repair'],
    description: 'Peak fat burning. Your cells begin cleaning out damaged components.'
  },
  {
    name: 'Deep Autophagy',
    startHour: 48,
    endHour: 72,
    color: '#ec4899',
    icon: '🔬',
    benefits: ['Maximum autophagy', 'Immune system reset', 'Stem cell regeneration', 'Anti-aging'],
    description: 'Your body is in deep cellular repair mode, recycling old proteins.'
  },
  {
    name: 'Immune Reset',
    startHour: 72,
    endHour: Infinity,
    color: '#6366f1',
    icon: '🛡️',
    benefits: ['Immune system regeneration', 'Inflammation reduction', 'Longevity benefits'],
    description: 'Extended fasting triggers immune system renewal and regeneration.'
  }
];

export interface FastingStats {
  caloriesBurned: number;
  fatBurned: number; // in grams
  ketosisLevel: number; // 0-100
  autophagyLevel: number; // 0-100
  phase: FastingPhase;
  phasesCompleted: FastingPhase[];
}

export function calculateFastingInsights(durationSeconds: number): FastingStats {
  const hours = durationSeconds / 3600;
  
  // Find current phase
  const currentPhase = FASTING_PHASES.find(
    phase => hours >= phase.startHour && hours < phase.endHour
  ) || FASTING_PHASES[FASTING_PHASES.length - 1];

  // Find all completed phases
  const phasesCompleted = FASTING_PHASES.filter(
    phase => hours >= phase.endHour
  );

  // Calculate calories burned (rough estimate: 50-70 cal/hour during fasting)
  const caloriesBurned = Math.round(hours * 60);

  // Calculate fat burned (rough estimate: 0.5-1g per hour after 12 hours)
  const fatBurningHours = Math.max(0, hours - 12);
  const fatBurned = Math.round(fatBurningHours * 0.7 * 10) / 10;

  // Calculate ketosis level (increases after 16 hours, peaks at 48)
  let ketosisLevel = 0;
  if (hours >= 16) {
    ketosisLevel = Math.min(100, ((hours - 16) / 32) * 100);
  }

  // Calculate autophagy level (starts at 24 hours, peaks at 72)
  let autophagyLevel = 0;
  if (hours >= 24) {
    autophagyLevel = Math.min(100, ((hours - 24) / 48) * 100);
  }

  return {
    caloriesBurned,
    fatBurned,
    ketosisLevel: Math.round(ketosisLevel),
    autophagyLevel: Math.round(autophagyLevel),
    phase: currentPhase,
    phasesCompleted
  };
}

export function getPhaseProgress(durationSeconds: number, phase: FastingPhase): number {
  const hours = durationSeconds / 3600;
  
  if (hours < phase.startHour) return 0;
  if (hours >= phase.endHour) return 100;
  
  const phaseLength = phase.endHour - phase.startHour;
  const hoursInPhase = hours - phase.startHour;
  
  return Math.round((hoursInPhase / phaseLength) * 100);
}
