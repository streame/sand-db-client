export interface QueryResult<T = unknown> {
  items?: T[];
  count?: number;
  continuationToken?: string;
}
