import { delay, withTimeout } from '@repo/utils';
import { SplashTask, TaskState } from './types';

// Progress & State Utils
export function calculateProgress(tasks: TaskState[]): number {
  if (tasks.length === 0) return 0;
  const totalWeight = tasks.reduce((sum, t) => sum + t.weight, 0);
  if (totalWeight === 0) return 0;
  const completedWeight = tasks
    .filter((t) => t.status === 'completed' || t.status === 'skipped')
    .reduce((sum, t) => sum + t.weight, 0);
  return Math.round((completedWeight / totalWeight) * 100);
}

export function areCriticalTasksComplete(tasks: TaskState[]): boolean {
  const criticalTasks = tasks.filter((t) => t.critical);
  if (criticalTasks.length === 0) return true;
  return criticalTasks.every(
    (t) => t.status === 'completed' || t.status === 'skipped'
  );
}

export interface TaskRunnerOptions {
  onStart?: (taskId: string) => void;
  onComplete?: (taskId: string, result: unknown) => void;
  onError?: (taskId: string, error: Error) => void;
  debug?: boolean;
}

export async function runTask(
  task: SplashTask,
  options: TaskRunnerOptions = {}
): Promise<TaskState> {
  const { onStart, onComplete, onError, debug } = options;
  const startTime = Date.now();

  const state: TaskState = {
    id: task.id,
    status: 'running',
    weight: task.weight ?? 1,
    critical: task.critical ?? false,
    startTime,
  };

  if (debug) console.log(`[Splash] Task "${task.id}" started`);
  onStart?.(task.id);

  const maxAttempts = (task.retries ?? 0) + 1;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await withTimeout(task.execute(), task.timeout);
      state.status = 'completed';
      state.result = result;
      state.endTime = Date.now();

      if (debug)
        console.log(
          `[Splash] Task "${task.id}" completed in ${state.endTime - startTime}ms`
        );
      onComplete?.(task.id, result);
      return state;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (debug)
        console.warn(
          `[Splash] Task "${task.id}" attempt ${attempt}/${maxAttempts} failed:`,
          lastError.message
        );

      if (attempt < maxAttempts) {
        await delay(Math.min(1000 * Math.pow(2, attempt - 1), 5000));
      }
    }
  }

  if (task.fallback) {
    try {
      const fallbackResult = task.fallback();
      state.status = 'completed';
      state.result = fallbackResult;
      state.endTime = Date.now();
      if (debug) console.log(`[Splash] Task "${task.id}" used fallback`);
      onComplete?.(task.id, fallbackResult);
      return state;
    } catch {
      // Fallback failed
    }
  }

  state.status = 'failed';
  state.error = lastError!;
  state.endTime = Date.now();
  onError?.(task.id, lastError!);
  return state;
}
