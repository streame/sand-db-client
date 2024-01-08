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

type GeneratedArguments<T> = {
  [K in keyof T]?: WhereCondition<T[K]>;
};

export type TimestampArguments = {
  year: WhereCondition<number>;
  month?: WhereCondition<number>;
  day?: WhereCondition<number>;
  hour?: WhereCondition<number>;
};

type CombinedArguments<T> = GeneratedArguments<T> & TimestampArguments;

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
