import type { MapperFunction, MapperRegistry } from '../types/api';

export interface IMapper {
  register<TInput = any, TOutput = any>(
    endpoint: string,
    mapperFn: MapperFunction<TInput, TOutput>
  ): void;
  map<TInput = any, TOutput = any>(endpoint: string, data: TInput): TOutput;
  registerMany(registry: MapperRegistry): void;
  has(endpoint: string): boolean;
  getMapper(endpoint: string): MapperFunction | undefined;
  getEndpoints(): string[];
  clear(): void;
}

/**
 * Mapper class for transforming API responses
 */
export class Mapper implements IMapper {
  private _registry: MapperRegistry = {};

  constructor(init: MapperRegistry = {}) {
    this._registry = { ...init };
  }

  /**
   * Register a mapper function for a specific endpoint
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public register<TInput = any, TOutput = any>(
    endpoint: string,
    mapperFn: MapperFunction<TInput, TOutput>
  ): void {
    this._registry[endpoint] = mapperFn;
  }

  /**
   * Apply mapper transformation if available
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public map<TInput = any, TOutput = any>(
    endpoint: string,
    data: TInput
  ): TOutput {
    const mapperFn = this._registry[endpoint];

    if (mapperFn) {
      return mapperFn(data) as TOutput;
    }

    // No mapper found, return data as-is
    return data as unknown as TOutput;
  }

  /**
   * Register multiple mappers at once
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerMany(registry: MapperRegistry): void {
    this._registry = { ...this._registry, ...registry };
  }

  /**
   * Check if a mapper exists for an endpoint
   */
  public has(endpoint: string): boolean {
    return endpoint in this._registry;
  }

  /**
   * Get the mapper function for an endpoint
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getMapper(endpoint: string): MapperFunction | undefined {
    return this._registry[endpoint];
  }

  /**
   * Get all registered endpoints
   */
  public getEndpoints(): string[] {
    return Object.keys(this._registry);
  }

  /**
   * Clear all mappers
   */
  public clear(): void {
    this._registry = {};
  }
}
