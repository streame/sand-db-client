import { describe, expect, test } from "@jest/globals";
import { QueryArgument } from "./QueryArgument.js";

describe("QueryArgument", () => {
  test("creates valid arguments", () => {
    const queryArgument: QueryArgument<any> = {
      where: {
        year: 2024,
        foo: {
          in: ["1", "2"],
        },
        bar: {
          equals: "baz",
        },
      },
    };
    expect(queryArgument).toBeDefined();

    const queryArgument2: QueryArgument = {
      where: {
        year: 2024,
        AND: [
          {
            year: {
              equals: 2024,
            },
            month: 12,
          },
        ],
      },
    };
    expect(queryArgument2).toBeDefined();
  });
});
