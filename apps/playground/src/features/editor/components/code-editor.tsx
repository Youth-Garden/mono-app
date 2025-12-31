'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
// We need to import the editor type for strict typing
import type { editor } from 'monaco-editor';
import { Language } from '../types';

interface CodeEditorProps {
  language: Language;
  code: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({
  language,
  code,
  onChange,
}: CodeEditorProps) {
  // Strict typing: Ref holds either the editor instance or null
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editorInstance, monaco) => {
    editorRef.current = editorInstance;

    // Define a custom theme that matches the portfolio's "Glass" aesthetic
    monaco.editor.defineTheme('devstudio-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000', // Transparent to show glass bg
        'editor.lineHighlightBackground': '#ffffff10',
        'editorCursor.foreground': '#ffffff',
        'editor.selectionBackground': '#ffffff20',
      },
    });

    monaco.editor.setTheme('devstudio-dark');
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 bg-white/5">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
          {language.name} Editor
        </span>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
      </div>
      <div className="h-[calc(100%-2.5rem)] pt-2">
        <Editor
          height="100%"
          language={language.monacoId}
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme="devstudio-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Geist Mono, monospace',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
          }}
        />
      </div>
    </div>
  );
}
