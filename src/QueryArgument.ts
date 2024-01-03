type GeneratedArguments<T> = {
  [K in keyof T]?: T[K];
};

type FixedArguments = {
  year: number[] | number;
  month: number[] | number;
  day: number[] | number;
  hour?: number[] | number;
};

export interface QueryArgument<T> {
  where: GeneratedArguments<T> & FixedArguments;
  limit?: number;
  offset?: number;
}
