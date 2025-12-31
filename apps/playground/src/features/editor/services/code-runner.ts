import apiClient from '@/shared/api-client';
import { ExecuteCodeParams, RunCodeResponse } from '../types';

export const executeCode = async ({
  languageId,
  version,
  code,
}: ExecuteCodeParams): Promise<RunCodeResponse> => {
  const response = await apiClient.post<RunCodeResponse>(
    '/execute',
    {
      language: languageId,
      version: version,
      files: [
        {
          content: code,
        },
      ],
    },
    {
      baseUrl: 'https://emkc.org/api/v2/piston',
    }
  );

  return response.data;
};
