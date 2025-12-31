'use client';

import { cn } from '@/shared/utils/css';
import { Loader2, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalOutputProps {
  output: string[] | null;
  isLoading: boolean;
  isError?: boolean;
}

export default function TerminalOutput({
  output,
  isLoading,
  isError,
}: TerminalOutputProps) {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4 bg-white/5">
        <TerminalIcon className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          Terminal Output
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-400 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Compiling and executing...</span>
          </div>
        ) : output ? (
          <div className="space-y-1">
            {output.map((line, i) => (
              <div
                key={i}
                className={cn(
                  'break-all whitespace-pre-wrap',
                  isError ? 'text-red-400' : 'text-gray-300'
                )}
              >
                {line}
              </div>
            ))}
            <div
              className={cn(
                'mt-2 text-xs opacity-50',
                isError ? 'text-red-400' : 'text-green-400'
              )}
            >
              {isError
                ? 'Process exited with error.'
                : 'Process finished successfully.'}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2 opacity-50">
            <div className="w-12 h-12 rounded-full border border-dashed border-gray-600 flex items-center justify-center">
              <TerminalIcon className="h-6 w-6" />
            </div>
            <p>Ready to compile.</p>
          </div>
        )}
      </div>
    </div>
  );
}
