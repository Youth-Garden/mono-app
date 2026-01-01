import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseStatus } from '../lib/types';

type PrismaError =
  | PrismaClientInitializationError
  | PrismaClientKnownRequestError
  | PrismaClientRustPanicError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError;

@Catch(
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaExceptionFilter');

  catch(error: PrismaError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const requestId = request.headers['x-request-id'] ?? 'unknown-request-id';

    response.header('X-Request-Id', requestId.toString());

    this.logger.error(`PrismaError: ${error.message}`, {
      error,
      url: request.url,
      method: request.method,
      requestId,
    });

    let message = 'There was an error, please try again later.';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': // Unique constraint failed
          statusCode = HttpStatus.CONFLICT;
          message = 'A record with this data already exists.';
          break;
        case 'P2025': // Record not found
          statusCode = HttpStatus.NOT_FOUND;
          message = 'The requested record was not found.';
          break;
        case 'P2003': // Foreign key constraint failed
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'The referenced data does not exist.';
          break;
        default:
          break;
      }
    }

    response.status(statusCode).send({
      status: ResponseStatus.ERROR,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: null,
    });
  }
}
