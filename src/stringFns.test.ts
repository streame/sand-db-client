import { describe, expect, test } from "@jest/globals";
import { stringToClass } from "./stringFns.js";

describe("stringFns", () => {
  test("converts strings", async () => {
    const result = stringToClass("hello world");

    expect(result).toBe("HelloWorld");
  });
});
