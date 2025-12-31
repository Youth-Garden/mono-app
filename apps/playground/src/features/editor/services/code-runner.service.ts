import { CoreRequest } from '@/configs/api-client';
import { ExecuteCodeParams, RunCodeResponse } from '../types';

class CodeRunnerService extends CoreRequest {
  public async execute({
    languageId,
    version,
    code,
  }: ExecuteCodeParams): Promise<RunCodeResponse> {
    const response = await this.post<RunCodeResponse>('/execute', {
      language: languageId,
      version: version,
      files: [
        {
          content: code,
        },
      ],
    });

    return response.data;
  }
}

export const codeRunnerService = new CodeRunnerService();
