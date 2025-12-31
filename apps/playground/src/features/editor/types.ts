export type Language = {
  id: string; // Piston runtime id
  name: string;
  version: string;
  monacoId: string; // Monaco editor language id
  defaultCode: string; // Default code snippet
};

export interface RunCodeResponse {
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
}

export interface RunCodeRequest {
  language: Language;
  code: string;
}

export interface ExecuteCodeParams {
  languageId: string;
  version: string;
  code: string;
}
