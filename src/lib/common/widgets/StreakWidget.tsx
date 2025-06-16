import clsx from 'clsx';
import { LuFlame } from 'react-icons/lu';

type Props = {
  streak: number;
};

const getStreakColor = (streak: number): string => {
  if (streak == 0) return 'text-neutral-500';
  if (streak <= 1) return 'text-green-400';
  if (streak <= 2) return 'text-lime-400';
  if (streak <= 3) return 'text-yellow-400';
  if (streak <= 4) return 'text-orange-400';
  return 'text-red-500';
};

export const StreakWidget = ({ streak }: Props) => {
  const flameColor = getStreakColor(streak);

  return (
    <div className="flex items-center">
      <LuFlame
        className={clsx('size-8 transition-colors duration-1000', flameColor)}
      />
      <span className="pl-1 text-xl font-extrabold">{streak}</span>
    </div>
  );
};
