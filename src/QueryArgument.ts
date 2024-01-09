export type WhereCondition<T> =
  | {
      in?: T[];
      notIn?: T[];
      not?: T;
      gt?: T;
      gte?: T;
      lt?: T;
      lte?: T;
      equals?: T;
      neq?: T;
      like?: T;
      notLike?: T;
      iLike?: T;
      notILike?: T;
      contains?: T;
    }
  | T;

export type GeneratedArguments<T> = {
  [K in keyof T]?: WhereCondition<T[K]>;
};

export type BaseArguments = {
  year: WhereCondition<number>;
  month?: WhereCondition<number>;
  day?: WhereCondition<number>;
  hour?: WhereCondition<number>;
  minutes_since_epoch?: WhereCondition<number>;
  hours_since_epoch?: WhereCondition<number>;
  days_since_epoch?: WhereCondition<number>;
};

export type CombinedArguments<T> = GeneratedArguments<T> & BaseArguments;

export type WhereSpecialCondition<T> = {
  AND?: GeneratedArguments<T>[];
  OR?: GeneratedArguments<T>[];
  NOT?: GeneratedArguments<T>[];
};

export interface QueryArgument<T = unknown> {
  where: CombinedArguments<T> & WhereSpecialCondition<T>;
  limit?: number;
  offset?: number;
}
