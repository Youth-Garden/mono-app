import { StatusCodes } from '../lib/types';

export enum ErrorCode {
  // Auth / Project (100s)
  UNAUTHORIZED = 101,
  INVALID_PROJECT_ID = 102,
  PROJECT_NOT_FOUND = 103,
  PROJECT_INACTIVE = 104,

  // Conversations (200s)
  CONVERSATION_NOT_FOUND = 200,
  CONVERSATION_CLOSED = 201,

  // Messages (300s)
  MESSAGE_NOT_FOUND = 300,
  MESSAGE_EMPTY = 301,

  // Validation / Generic (900s)
  VALIDATION_ERROR = 900,

  // Internal (999)
  INTERNAL_SERVER_ERROR = 999,
}

export type ErrorMeta = {
  statusCode: StatusCodes;
  message: string;
};

export const ErrorMap: Record<ErrorCode, ErrorMeta> = {
  [ErrorCode.UNAUTHORIZED]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  [ErrorCode.INVALID_PROJECT_ID]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid or missing Project ID',
  },
  [ErrorCode.PROJECT_NOT_FOUND]: {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Project not found',
  },
  [ErrorCode.PROJECT_INACTIVE]: {
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Project is inactive',
  },
  [ErrorCode.CONVERSATION_NOT_FOUND]: {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Conversation not found',
  },
  [ErrorCode.CONVERSATION_CLOSED]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Conversation is closed',
  },
  [ErrorCode.MESSAGE_NOT_FOUND]: {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Message not found',
  },
  [ErrorCode.MESSAGE_EMPTY]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Message content cannot be empty',
  },
  [ErrorCode.VALIDATION_ERROR]: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation failed',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
};
