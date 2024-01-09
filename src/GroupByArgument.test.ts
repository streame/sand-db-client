import { describe, expect, test } from "@jest/globals";
import { GroupByArgument } from "./GroupByArgument.js";

describe("GroupByArgument", () => {
  test("creates valid arguments", () => {
    const groupByArgument: GroupByArgument = {
      where: {
        year: 2024,
      },
      by: ["year"],
      _count: {
        year: true,
      },
    };
    expect(groupByArgument).toBeDefined();

    const groupByArgument2: GroupByArgument = {
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
      by: ["hours_since_epoch"],
      _sum: {
        year: true,
      },
    };
    expect(groupByArgument2).toBeDefined();
  });
});
