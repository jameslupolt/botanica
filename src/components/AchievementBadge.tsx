import { Lock } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  compact?: boolean;
}

export function AchievementBadge({ achievement, unlocked, compact }: AchievementBadgeProps) {
  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
          unlocked
            ? 'bg-leaf-100 text-leaf-700'
            : 'bg-bark-100 text-bark-400'
        }`}
        title={achievement.description}
      >
        <span>{unlocked ? achievement.icon : '🔒'}</span>
        <span className="font-medium">{achievement.title}</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-4 text-center transition-all ${
        unlocked
          ? 'bg-white border-leaf-200 shadow-sm'
          : 'bg-bark-50 border-bark-100 opacity-60'
      }`}
    >
      <div
        className={`mx-auto mb-3 flex items-center justify-center w-14 h-14 rounded-full ${
          unlocked
            ? 'bg-leaf-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
            : 'bg-bark-100'
        }`}
      >
        {unlocked ? (
          <span className="text-2xl">{achievement.icon}</span>
        ) : (
          <Lock className="h-6 w-6 text-bark-400" />
        )}
      </div>
      <h4 className={`font-semibold text-sm ${unlocked ? 'text-bark-900' : 'text-bark-500'}`}>
        {achievement.title}
      </h4>
      <p className="mt-1 text-xs text-bark-400">{achievement.description}</p>
    </div>
  );
}
