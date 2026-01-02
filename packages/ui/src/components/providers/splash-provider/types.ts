// Splash Provider Types

export type SplashState = 'idle' | 'loading' | 'ready' | 'exiting' | 'complete';
export type TaskStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'skipped';

export interface SplashTask {
  id: string;
  execute: () => Promise<unknown>;
  weight?: number;
  critical?: boolean;
  timeout?: number;
  fallback?: () => unknown;
  retries?: number;
}

export interface TaskState {
  id: string;
  status: TaskStatus;
  weight: number;
  critical: boolean;
  error?: Error;
  result?: unknown;
  startTime?: number;
  endTime?: number;
}

export interface SplashConfig {
  minDisplayTime?: number;
  exitAnimationDuration?: number;
  autoStart?: boolean;
  debug?: boolean;
}

export const DEFAULT_CONFIG: Required<SplashConfig> = {
  minDisplayTime: 2000,
  exitAnimationDuration: 300,
  autoStart: true,
  debug: false,
};

export interface SplashContextValue {
  state: SplashState;
  progress: number;
  currentTask: TaskState | null;
  tasks: TaskState[];
  error: Error | null;
  isReady: boolean;
  start: () => void;
  forceComplete: () => void;
  registerTask: (task: SplashTask) => void;
  waitFor: (taskId: string) => Promise<unknown>;
}

export type SplashEvent =
  | { type: 'START' }
  | { type: 'TASK_START'; taskId: string }
  | { type: 'TASK_COMPLETE'; taskId: string; result: unknown }
  | { type: 'TASK_FAIL'; taskId: string; error: Error }
  | { type: 'ALL_READY' }
  | { type: 'EXIT_START' }
  | { type: 'COMPLETE' }
  | { type: 'FORCE_COMPLETE' };
