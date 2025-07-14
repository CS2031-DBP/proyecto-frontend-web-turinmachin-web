import { LuFlame } from 'react-icons/lu';

export interface Props {
  streak: number;
  streakSafe: boolean;
}

const getStreakColor = (streak: number): string => {
  if (streak == 0) return 'text-neutral-500';
  if (streak <= 1) return 'text-green-400';
  if (streak <= 2) return 'text-lime-400';
  if (streak <= 3) return 'text-yellow-400';
  if (streak <= 4) return 'text-orange-400';
  return 'text-red-500';
};

export const StreakIndicator = ({ streak, streakSafe }: Props) => {
  const color = getStreakColor(streak);
  const fillClass = streakSafe && streak > 0 ? 'fill-current' : 'fill-none';
  return (
    <div className="flex items-center not-md:hidden">
      <LuFlame className={`${color} ${fillClass}`} size={36} />
      <span className="pl-1 text-lg font-extrabold">{streak}</span>
    </div>
  );
};
