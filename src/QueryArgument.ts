type GeneratedArguments<T> = {
  [K in keyof T]?: T[K];
};

export type TimestampArguments = {
  year: number[] | number;
  month?: number[] | number;
  day?: number[] | number;
  hour?: number[] | number;
};

export interface QueryArgument<T = unknown> {
  where: GeneratedArguments<T> & TimestampArguments;
  limit?: number;
  offset?: number;
}
