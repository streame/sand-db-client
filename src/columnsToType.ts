import { InterfaceDeclaration } from "ts-morph";
import { Column, ColumnType, Properties } from "./types.js";

const colTypeToTSType = (type: ColumnType, properties?: Properties): string => {
  switch (type) {
    case "String":
    case "VarChar":
    case "Char":
      return "string";
    case "Timestamp":
    case "Date":
      return "Date";
    case "Int":
    case "Decimal":
    case "BigInt":
    case "Double":
      return "number";
    case "Boolean":
      return "boolean";
    case "Array":
      return `${colTypeToTSType(properties!.itemType!)}[]`;
    case "Map":
      return `Record<${colTypeToTSType(properties!.keyType!)}, ${properties!
        .valueType!}>`;
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const columnsToType = (
  columns: Column[],
  interfaceDeclaration: InterfaceDeclaration
) => {
  columns.map((column) => {
    interfaceDeclaration.addProperty({
      name: `${column.name}${column.isTimestamp ? "" : "?"}`,
      type: colTypeToTSType(column.type, column.properties),
    });
  });
};
