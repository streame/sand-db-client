export type ColumnType =
  | "String"
  | "Timestamp"
  | "Date"
  | "VarChar"
  | "Char"
  | "Int"
  | "BigInt"
  | "SmallInt"
  | "TinyInt"
  | "Float"
  | "Double"
  | "Boolean"
  | "Array"
  | "Map"
  | "Decimal";

export interface Properties {
  length?: number;
  itemType?: ColumnType;
  keyType?: ColumnType;
  valueType?: ColumnType;
  precision?: number;
  scale?: number;
}

export interface Column {
  name: string;
  type: ColumnType;
  isTimestamp: boolean;
  properties?: Properties;
}

export interface Pipeline {
  id: string;
  name: string;
  version: number;
  endpoint: string;
  columns: Column[];
}

export interface Schema {
  pipelines: Pipeline[];
}
