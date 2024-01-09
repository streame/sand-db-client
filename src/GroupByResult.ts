export type GeneratedArguments<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]?: number;
};

export type BaseArguments = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minutesSinceEpoch?: string;
  hoursSinceEpoch?: string;
  daysSinceEpoch?: string;
};

type GroupByCombinedArguments<T> = GeneratedArguments<T> & BaseArguments;

export interface GroupByItem<T> extends BaseArguments {
  _count?: GroupByCombinedArguments<T>;
  _sum?: GroupByCombinedArguments<T>;
}

export interface GroupByResult<T = unknown> {
  items?: GroupByItem<T>[];
  count?: number;
  continuationToken?: string;
}
