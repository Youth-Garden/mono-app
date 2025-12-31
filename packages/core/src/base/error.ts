import type { ErrorMapperEntry, ErrorMapperRegistry } from '../types/api';

export interface IErrorMapper {
  getError(
    code: string,
    errors?: ErrorMapperRegistry
  ): ErrorMapperEntry | undefined;
  hasError(code: string): boolean;
  addError(code: string, entry: ErrorMapperEntry): void;
  setDefaultError(entry: ErrorMapperEntry): void;
  getFallbackError(): ErrorMapperEntry;
}

/**
 * ErrorMapper class for mapping error codes to user-friendly messages
 */
export class ErrorMapper implements IErrorMapper {
  protected _mapper: ErrorMapperRegistry = {
    error_unknown: {
      message: 'The connection is having issues. Please try again later.',
      value: {},
    },
  };

  constructor(init: ErrorMapperRegistry = {}) {
    this._mapper = {
      ...this._mapper,
      ...init,
    };
  }

  public getError(
    code: string,
    errors: ErrorMapperRegistry = {}
  ): ErrorMapperEntry | undefined {
    return { ...this._mapper, ...errors }[code];
  }

  public hasError(code: string): boolean {
    return code in this._mapper;
  }

  public addError(code: string, entry: ErrorMapperEntry): void {
    this._mapper[code] = entry;
  }

  public setDefaultError(entry: ErrorMapperEntry): void {
    this._mapper['error_unknown'] = entry;
  }

  public getFallbackError(): ErrorMapperEntry {
    return (
      this._mapper['error_unknown'] || {
        message: 'An unknown error occurred',
        value: {},
      }
    );
  }
}
