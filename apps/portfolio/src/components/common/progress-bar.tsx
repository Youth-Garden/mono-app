import { RefObject } from 'react';

interface ProgressBarProps {
  progressBarRef: RefObject<HTMLDivElement>;
  label?: string;
}

export default function ProgressBar({
  progressBarRef,
  label = '[ SCROLL TO NAVIGATE ]',
}: ProgressBarProps) {
  return (
    <div className="hidden md:block">
      <span className="text-xs text-[#888]">{label}</span>
      <div className="w-full h-[1px] bg-white/10 mt-4 relative overflow-hidden">
        <div
          ref={progressBarRef}
          className="absolute top-0 left-0 h-full bg-white w-0"
        />
      </div>
    </div>
  );
}
