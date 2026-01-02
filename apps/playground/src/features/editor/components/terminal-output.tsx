'use client';

import { cn } from '@/shared/utils/css';
import {
  Check,
  Clock,
  Copy,
  Loader2,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { useState } from 'react';

interface TerminalOutputProps {
  output: string[] | null;
  isLoading: boolean;
  isError?: boolean;
  executionTime?: number | null;
}

export default function TerminalOutput({
  output,
  isLoading,
  isError,
  executionTime,
}: TerminalOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 bg-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            Terminal Output
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Execution Time */}
          {executionTime !== null &&
            executionTime !== undefined &&
            !isLoading && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatTime(executionTime)}</span>
              </div>
            )}
          {/* Copy Button */}
          {output && !isLoading && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Copy output"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
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
