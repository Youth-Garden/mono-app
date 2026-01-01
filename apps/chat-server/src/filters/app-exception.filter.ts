import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { AppException } from '../exceptions/app-exception';
import { ErrorCode, ErrorMap } from '../exceptions/error-codes';
import { StatusCodes } from '../lib/types/status-codes';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const { status, code, message, errors } =
      this.mapExceptionToResponse(exception);

    const payload = {
      code,
      statusCode: status,
      message,
      errors: errors ?? null,
      data: null,
    };

    res.status(status).send(payload);
  }

  private mapExceptionToResponse(exception: unknown) {
    if (exception instanceof AppException) {
      return this.fromAppException(exception);
    }

    if (exception instanceof HttpException) {
      return this.fromHttpException(exception);
    }

    return this.fromUnknown(exception);
  }

  private fromAppException(e: AppException) {
    const status = e.getStatus();
    const resp = e.getResponse() as any;

    return {
      status,
      code: resp?.code ?? ErrorCode.INTERNAL_SERVER_ERROR,
      message:
        resp?.message ?? ErrorMap[ErrorCode.INTERNAL_SERVER_ERROR].message,
      errors: resp?.details ?? null,
    };
  }

  private fromHttpException(e: HttpException) {
    const status = e.getStatus();
    const resp = e.getResponse() as any;

    // Validation errors
    if (this.isValidationError(status, resp)) {
      return this.fromValidation(resp);
    }

    let code = ErrorCode.INTERNAL_SERVER_ERROR;
    let defaultMessage = ErrorMap[ErrorCode.INTERNAL_SERVER_ERROR].message;

    if (status === StatusCodes.BAD_REQUEST) {
      code = ErrorCode.VALIDATION_ERROR;
      defaultMessage = ErrorMap[ErrorCode.VALIDATION_ERROR].message;
    }

    const message = resp?.message || resp?.error || defaultMessage;

    return {
      status,
      code,
      message,
      errors: typeof resp === 'object' ? resp : null,
    };
  }

  private fromValidation(resp: any) {
    const status = StatusCodes.BAD_REQUEST;
    const arr = resp?.message || resp?.errors;

    const errors = arr.map((v: any) => ({
      field: v.property,
      constraints: v.constraints,
    }));

    return {
      status,
      code: ErrorCode.VALIDATION_ERROR,
      message: ErrorMap[ErrorCode.VALIDATION_ERROR].message,
      errors,
    };
  }

  private fromUnknown(_exception: unknown) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMap[ErrorCode.INTERNAL_SERVER_ERROR].message,
      errors: null,
    };
  }

  private isValidationError(status: number, resp: any) {
    const msgs = resp?.message || resp?.errors;
    return (
      status === StatusCodes.BAD_REQUEST &&
      Array.isArray(msgs) &&
      msgs.every((v: any) => v.constraints)
    );
  }
}
