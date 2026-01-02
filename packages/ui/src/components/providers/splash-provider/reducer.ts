import { SplashEvent, SplashState, TaskState } from './types';

export interface SplashMachineState {
  state: SplashState;
  tasks: TaskState[];
  currentTaskId: string | null;
  error: Error | null;
}

export const initialMachineState: SplashMachineState = {
  state: 'idle',
  tasks: [],
  currentTaskId: null,
  error: null,
};

export function splashReducer(
  current: SplashMachineState,
  event: SplashEvent
): SplashMachineState {
  switch (event.type) {
    case 'START':
      return current.state === 'idle'
        ? { ...current, state: 'loading' }
        : current;

    case 'TASK_START':
      return {
        ...current,
        currentTaskId: event.taskId,
        tasks: current.tasks.map((t) =>
          t.id === event.taskId
            ? { ...t, status: 'running', startTime: Date.now() }
            : t
        ),
      };

    case 'TASK_COMPLETE':
      return {
        ...current,
        tasks: current.tasks.map((t) =>
          t.id === event.taskId
            ? {
                ...t,
                status: 'completed',
                result: event.result,
                endTime: Date.now(),
              }
            : t
        ),
      };

    case 'TASK_FAIL':
      return {
        ...current,
        error: event.error,
        tasks: current.tasks.map((t) =>
          t.id === event.taskId
            ? {
                ...t,
                status: 'failed',
                error: event.error,
                endTime: Date.now(),
              }
            : t
        ),
      };

    case 'ALL_READY':
      return current.state === 'loading'
        ? { ...current, state: 'ready', currentTaskId: null }
        : current;

    case 'EXIT_START':
      return current.state === 'ready'
        ? { ...current, state: 'exiting' }
        : current;

    case 'COMPLETE':
    case 'FORCE_COMPLETE':
      return {
        ...current,
        state: 'complete',
        currentTaskId: null,
        tasks: current.tasks.map((t) =>
          t.status === 'pending' || t.status === 'running'
            ? { ...t, status: 'skipped', endTime: Date.now() }
            : t
        ),
      };

    default:
      return current;
  }
}
