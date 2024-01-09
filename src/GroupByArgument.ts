import { CombinedArguments, WhereSpecialCondition } from "./QueryArgument.js";

export type GeneratedArguments<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]?: true;
};

export type BaseArguments = {
  year?: true;
  month?: true;
  day?: true;
  hour?: true;
  minutes_since_epoch?: true;
  hours_since_epoch?: true;
  days_since_epoch?: true;
};

export type GroupByCombinedArguments<T> = GeneratedArguments<T> & BaseArguments;

export interface GroupByArgument<T = unknown> {
  by: (keyof T | keyof BaseArguments)[];
  where: CombinedArguments<T> & WhereSpecialCondition<T>;
  _count?: GroupByCombinedArguments<T>;
  _sum?: GroupByCombinedArguments<T>;
}
