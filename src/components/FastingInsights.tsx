import { Flame, Zap, Activity, Sparkles } from 'lucide-react';
import { calculateFastingInsights, FASTING_PHASES, getPhaseProgress } from '../utils/fastingInsights';

interface FastingInsightsProps {
  durationSeconds: number;
}

export function FastingInsights({ durationSeconds }: FastingInsightsProps) {
  const insights = calculateFastingInsights(durationSeconds);
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  return (
    <div className="insights-container">
      <div className="insights-header">
        <h3>Fasting Insights</h3>
        <div className="insights-duration">
          {hours}h {minutes}m fast
        </div>
      </div>

      {/* Current Phase */}
      <div className="current-phase">
        <div className="phase-badge" style={{ backgroundColor: insights.phase.color }}>
          <span className="phase-icon">{insights.phase.icon}</span>
          <span className="phase-name">{insights.phase.name}</span>
        </div>
        <p className="phase-description">{insights.phase.description}</p>
      </div>

      {/* Key Metrics */}
      <div className="insights-metrics">
        <div className="metric-card">
          <div className="metric-icon" style={{ color: '#ef4444' }}>
            <Flame size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{insights.caloriesBurned}</div>
            <div className="metric-label">Calories Burned</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ color: '#f59e0b' }}>
            <Zap size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{insights.fatBurned}g</div>
            <div className="metric-label">Fat Burned</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ color: '#10b981' }}>
            <Activity size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{insights.ketosisLevel}%</div>
            <div className="metric-label">Ketosis</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ color: '#8b5cf6' }}>
            <Sparkles size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{insights.autophagyLevel}%</div>
            <div className="metric-label">Autophagy</div>
          </div>
        </div>
      </div>

      {/* Fasting Timeline */}
      <div className="fasting-timeline">
        <h4>Fasting Phases</h4>
        <div className="timeline-phases">
          {FASTING_PHASES.map((phase) => {
            const progress = getPhaseProgress(durationSeconds, phase);
            const isActive = insights.phase.name === phase.name;
            const isCompleted = progress === 100;

            return (
              <div 
                key={phase.name} 
                className={`timeline-phase ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="timeline-phase-header">
                  <span className="timeline-icon">{phase.icon}</span>
                  <span className="timeline-name">{phase.name}</span>
                  <span className="timeline-time">
                    {phase.startHour}h - {phase.endHour === Infinity ? '72h+' : `${phase.endHour}h`}
                  </span>
                </div>
                <div className="timeline-progress-bar">
                  <div 
                    className="timeline-progress-fill" 
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: phase.color 
                    }}
                  />
                </div>
                {isActive && (
                  <div className="timeline-benefits">
                    {phase.benefits.map((benefit, idx) => (
                      <span key={idx} className="benefit-tag">✓ {benefit}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Achieved */}
      {insights.phasesCompleted.length > 0 && (
        <div className="benefits-achieved">
          <h4>Benefits Achieved 🎉</h4>
          <div className="benefits-list">
            {insights.phasesCompleted.flatMap(phase => 
              phase.benefits.map((benefit, idx) => (
                <div key={`${phase.name}-${idx}`} className="benefit-item">
                  <span className="benefit-check">✓</span>
                  <span>{benefit}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
