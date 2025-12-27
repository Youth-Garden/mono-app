import { RefObject } from 'react';

interface SectionHeaderProps {
  sectionNumber: string;
  title: string;
  scrollHint?: string;
  progressBarRef?: RefObject<HTMLDivElement>;
}

export default function SectionHeader({
  sectionNumber,
  title,
  scrollHint,
  progressBarRef,
  className,
}: SectionHeaderProps & { className?: string }) {
  return (
    <div className={`flex flex-col justify-between h-full ${className || ''}`}>
      <div>
        <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
          {sectionNumber}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold uppercase leading-[0.9]">
          {title.split(' & ').map((part, i, arr) => (
            <span key={i} className="inline lg:block">
              {part}
              {i < arr.length - 1 && (
                <>
                  <span className="lg:hidden"> & </span>
                  <span className="hidden lg:block my-1">&</span>
                </>
              )}
            </span>
          ))}
        </h2>
      </div>
      {scrollHint && progressBarRef && (
        <div className="hidden md:block mt-8">
          <span className="text-xs text-[#888]">{scrollHint}</span>
          <div className="w-full h-px bg-white/10 mt-4 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-white w-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
