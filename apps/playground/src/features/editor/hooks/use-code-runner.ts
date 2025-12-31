import { useMutation } from '@tanstack/react-query';
import { executeCode } from '../services/code-runner';
import { RunCodeRequest } from '../types';

export function useCodeRunner() {
  const mutation = useMutation({
    mutationFn: (variables: RunCodeRequest) =>
      executeCode({
        languageId: variables.language.id,
        version: variables.language.version,
        code: variables.code,
      }),
  });

  const output = mutation.data ? mutation.data.run.output.split('\n') : null;

  return {
    runCode: mutation.mutate,
    runCodeAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    output,
    error: mutation.error,
    reset: mutation.reset,
  };
}
