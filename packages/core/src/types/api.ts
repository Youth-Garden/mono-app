export interface ErrorMapperEntry {
  message: string;
  value?: any;
}

export interface ErrorMapperRegistry {
  [key: string]: ErrorMapperEntry;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapperFunction<TInput = any, TOutput = any> = (
  data: TInput
) => TOutput;

export interface MapperRegistry {
  [endpoint: string]: MapperFunction;
}
