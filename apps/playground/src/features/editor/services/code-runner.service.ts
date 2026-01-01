import { ApiEndpoint, ServerConfig } from '@/shared/constants/server';
import { BaseRequest } from '@repo/core';
import { ExecuteCodeParams, RunCodeResponse } from '../types';

/**
 * Code Runner Service
 * Uses Piston API for code execution
 */
class CodeRunnerService extends BaseRequest {
  constructor() {
    super({ baseURL: ServerConfig.CodeRunner });
  }

  public async execute({
    languageId,
    version,
    code,
  }: ExecuteCodeParams): Promise<RunCodeResponse> {
    const response = await this.post<RunCodeResponse>(ApiEndpoint.CodeExecute, {
      language: languageId,
      version: version,
      files: [{ content: code }],
    });

    return response.data;
  }
}

export const codeRunnerService = new CodeRunnerService();
