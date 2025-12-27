import { memo } from 'react';

const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default memo(BackgroundGrid);
