'use client';

import CodeEditor from '@/features/editor/components/code-editor';
import TerminalOutput from '@/features/editor/components/terminal-output';
import { SUPPORTED_LANGUAGES } from '@/features/editor/constants/languages';
import { useCodeRunner } from '@/features/editor/hooks/use-code-runner';
import { Language } from '@/features/editor/types';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import { Code2, Play } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'devstudio_code';
const STORAGE_LANG_KEY = 'devstudio_language';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES[0]! // JavaScript default
  );
  const [code, setCode] = useState<string>(selectedLanguage.defaultCode);
  const [isHydrated, setIsHydrated] = useState(false);
  const { output, isLoading, isError, runCode, executionTime } =
    useCodeRunner();

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_LANG_KEY);
    const savedCode = localStorage.getItem(STORAGE_KEY);

    if (savedLang) {
      const lang = SUPPORTED_LANGUAGES.find((l) => l.id === savedLang);
      if (lang) {
        setSelectedLanguage(lang);
        setCode(savedCode ?? lang.defaultCode);
      }
    } else if (savedCode) {
      setCode(savedCode);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever code or language changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, code);
    localStorage.setItem(STORAGE_LANG_KEY, selectedLanguage.id);
  }, [code, selectedLanguage, isHydrated]);

  const handleRun = useCallback(() => {
    runCode({ language: selectedLanguage, code });
  }, [runCode, selectedLanguage, code]);

  // Global keyboard shortcut: Ctrl+Enter to run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isLoading) {
          handleRun();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun, isLoading]);

  const handleLanguageChange = (value: string) => {
    const newLang = SUPPORTED_LANGUAGES.find((l) => l.id === value);
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
          <Select
            value={selectedLanguage.id}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[160px] h-10 border-white/10 bg-black/40 text-white hover:border-white/20 focus:ring-blue-500">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-white/10">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.id}
                  value={lang.id}
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="h-8 w-px bg-white/10" />

          <Button
            onClick={handleRun}
            disabled={isLoading}
            className="h-10 px-6 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] font-bold"
            title="Ctrl+Enter"
          >
            {isLoading ? (
              <>Running...</>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                RUN CODE
              </>
            )}
          </Button>
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
            executionTime={executionTime}
          />
        </div>
      </div>
    </main>
  );
}
