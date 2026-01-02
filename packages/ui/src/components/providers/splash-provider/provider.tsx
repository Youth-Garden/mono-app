'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type PropsWithChildren,
} from 'react';
import { initialMachineState, splashReducer } from './reducer';
import {
  DEFAULT_CONFIG,
  type SplashConfig,
  type SplashContextValue,
  type SplashEvent,
  type SplashTask,
  type TaskState,
} from './types';
import { areCriticalTasksComplete, calculateProgress, runTask } from './utils';

export const SplashContext = createContext<SplashContextValue | null>(null);

export interface SplashProviderProps extends PropsWithChildren {
  tasks?: SplashTask[];
  config?: SplashConfig;
  onComplete?: () => void;
  onError?: (taskId: string, error: Error) => void;
}

export function SplashProvider({
  children,
  tasks: initialTasks = [],
  config: userConfig,
  onComplete,
  onError,
}: SplashProviderProps) {
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig]
  );

  const [machine, dispatch] = useReducer(splashReducer, {
    ...initialMachineState,
    tasks: initialTasks.map(taskToState),
  });

  const startTimeRef = useRef<number>(0);
  const waitersRef = useRef<
    Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }[]>
  >(new Map());
  const tasksQueueRef = useRef<SplashTask[]>(initialTasks);

  const send = useCallback(
    (event: SplashEvent) => {
      if (config.debug) console.log('[Splash] Event:', event.type);
      dispatch(event);
    },
    [config.debug]
  );

  const executeAllTasks = useCallback(async () => {
    const tasks = tasksQueueRef.current;

    for (const task of tasks) {
      if (machine.state === 'complete') break;

      send({ type: 'TASK_START', taskId: task.id });

      const result = await runTask(task, {
        debug: config.debug,
        onComplete: (id, res) => {
          send({ type: 'TASK_COMPLETE', taskId: id, result: res });
          waitersRef.current.get(id)?.forEach((w) => w.resolve(res));
          waitersRef.current.delete(id);
        },
        onError: (id, err) => {
          send({ type: 'TASK_FAIL', taskId: id, error: err });
          onError?.(id, err);
          waitersRef.current.get(id)?.forEach((w) => w.reject(err));
          waitersRef.current.delete(id);
        },
      });

      if (result.status === 'failed' && result.critical && !task.fallback) {
        if (config.debug)
          console.error(`[Splash] Critical task "${task.id}" failed`);
      }
    }

    send({ type: 'ALL_READY' });
  }, [machine.state, config.debug, send, onError]);

  // Auto-start
  useEffect(() => {
    if (config.autoStart && machine.state === 'idle') {
      startTimeRef.current = Date.now();
      send({ type: 'START' });
    }
  }, [config.autoStart, machine.state, send]);

  // Execute tasks
  useEffect(() => {
    if (machine.state === 'loading') executeAllTasks();
  }, [machine.state, executeAllTasks]);

  // Ready -> Exiting
  useEffect(() => {
    if (machine.state === 'ready') {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, config.minDisplayTime - elapsed);
      const timer = setTimeout(() => send({ type: 'EXIT_START' }), remaining);
      return () => clearTimeout(timer);
    }
  }, [machine.state, config.minDisplayTime, send]);

  // Exiting -> Complete
  useEffect(() => {
    if (machine.state === 'exiting') {
      const timer = setTimeout(() => {
        send({ type: 'COMPLETE' });
        onComplete?.();
      }, config.exitAnimationDuration);
      return () => clearTimeout(timer);
    }
  }, [machine.state, config.exitAnimationDuration, send, onComplete]);

  const start = useCallback(() => {
    if (machine.state === 'idle') {
      startTimeRef.current = Date.now();
      send({ type: 'START' });
    }
  }, [machine.state, send]);

  const forceComplete = useCallback(() => {
    send({ type: 'FORCE_COMPLETE' });
    onComplete?.();
  }, [send, onComplete]);

  const registerTask = useCallback(
    (task: SplashTask) => {
      if (machine.state !== 'idle' && machine.state !== 'loading') {
        console.warn('[Splash] Cannot register task after loading phase');
        return;
      }
      tasksQueueRef.current.push(task);
    },
    [machine.state]
  );

  const waitFor = useCallback(
    (taskId: string): Promise<unknown> => {
      const task = machine.tasks.find((t) => t.id === taskId);
      if (task?.status === 'completed') return Promise.resolve(task.result);
      if (task?.status === 'failed') return Promise.reject(task.error);

      return new Promise((resolve, reject) => {
        const waiters = waitersRef.current.get(taskId) ?? [];
        waiters.push({ resolve, reject });
        waitersRef.current.set(taskId, waiters);
      });
    },
    [machine.tasks]
  );

  const value = useMemo<SplashContextValue>(
    () => ({
      state: machine.state,
      progress: calculateProgress(machine.tasks),
      currentTask:
        machine.tasks.find((t) => t.id === machine.currentTaskId) ?? null,
      tasks: machine.tasks,
      error: machine.error,
      isReady: areCriticalTasksComplete(machine.tasks),
      start,
      forceComplete,
      registerTask,
      waitFor,
    }),
    [machine, start, forceComplete, registerTask, waitFor]
  );

  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  );
}

function taskToState(task: SplashTask): TaskState {
  return {
    id: task.id,
    status: 'pending',
    weight: task.weight ?? 1,
    critical: task.critical ?? false,
  };
}
