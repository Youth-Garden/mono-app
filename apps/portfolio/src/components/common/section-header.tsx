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
}: SectionHeaderProps) {
  return (
    <div>
      <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
        {sectionNumber}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
        {title.split(' & ').map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <>
                {' & '}
                <br />{' '}
              </>
            )}
          </span>
        ))}
      </h2>
      {scrollHint && progressBarRef && (
        <div className="hidden md:block mt-8">
          <span className="text-xs text-[#888]">{scrollHint}</span>
          <div className="w-full h-[1px] bg-white/10 mt-4 relative overflow-hidden">
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
