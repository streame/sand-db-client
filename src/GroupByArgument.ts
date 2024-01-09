import { CombinedArguments, WhereSpecialCondition } from "./QueryArgument.js";

export type GeneratedArguments<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]?: true;
};

export type TimestampArguments = {
  year?: true;
  month?: true;
  day?: true;
  hour?: true;
};

export type GroupByCombinedArguments<T> = GeneratedArguments<T> &
  TimestampArguments;

export interface GroupByArgument<T = unknown> {
  by: (keyof T | keyof TimestampArguments)[];
  where: CombinedArguments<T> & WhereSpecialCondition<T>;
  _count?: GroupByCombinedArguments<T>;
  _sum?: GroupByCombinedArguments<T>;
}
