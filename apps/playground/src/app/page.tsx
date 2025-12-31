'use client';

import CodeEditor from '@/features/editor/components/code-editor';
import TerminalOutput from '@/features/editor/components/terminal-output';
import { SUPPORTED_LANGUAGES } from '@/features/editor/constants/languages';
import { useCodeRunner } from '@/features/editor/hooks/use-code-runner';
import { Language } from '@/features/editor/types';
import { ChevronDown, Code2, Play } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0]! // JavaScript default
  );
  const [code, setCode] = useState<string>(selectedLanguage.defaultCode);
  const { output, isLoading, isError, runCode } = useCodeRunner();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = SUPPORTED_LANGUAGES.find((l) => l.id === e.target.value);
    if (newLang) {
      setSelectedLanguage(newLang);
      setCode(newLang.defaultCode);
    }
  };

  return (
    <main className="flex h-screen w-full flex-col bg-neutral-950 text-white overflow-hidden p-4 md:p-6 gap-4">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">DevStudio</h1>
            <p className="text-xs text-gray-400">Universal Code Runner</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage.id}
              onChange={handleLanguageChange}
              className="h-10 appearance-none rounded-lg border border-white/10 bg-black/40 pl-4 pr-10 text-sm font-medium text-white transition-colors hover:border-white/20 focus:border-blue-500 focus:outline-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.id}
                  value={lang.id}
                  className="bg-neutral-900"
                >
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="h-8 w-px bg-white/10" />

          <button
            onClick={() => runCode({ language: selectedLanguage, code })}
            disabled={isLoading}
            className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isLoading ? (
              <>Running...</>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                RUN CODE
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12 overflow-hidden">
        {/* Editor Area */}
        <div className="col-span-1 lg:col-span-8 h-full">
          <CodeEditor
            language={selectedLanguage}
            code={code}
            onChange={(val) => setCode(val || '')}
          />
        </div>

        {/* Terminal Area */}
        <div className="col-span-1 lg:col-span-4 h-full">
          <TerminalOutput
            output={output}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </main>
  );
}
