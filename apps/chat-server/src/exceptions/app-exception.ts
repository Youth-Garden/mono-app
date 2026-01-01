import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorMap } from './error-codes';

export class AppException extends HttpException {
  constructor(code: ErrorCode, details?: any) {
    const meta = ErrorMap[code] ?? {
      statusCode: 500,
      message: 'Unknown error',
    };

    const payload = {
      code,
      message: meta.message,
      details,
    };

    super(payload, meta.statusCode);
  }
}
