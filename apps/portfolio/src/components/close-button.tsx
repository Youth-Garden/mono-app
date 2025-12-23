'use client';

interface CloseButtonProps {
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

export default function CloseButton({
  onClick,
  isOpen,
  className = '',
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 group pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-white group-hover:text-gray-300 transition-all duration-300">
        {isOpen ? 'Close' : 'Menu'}
      </span>
      <div
        className={`h-[1px] bg-white/50 group-hover:bg-white transition-all duration-500 ${
          isOpen ? 'w-12' : 'w-8'
        }`}
      />
    </button>
  );
}
