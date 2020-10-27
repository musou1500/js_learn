import { strictEqual, deepStrictEqual } from "assert";
import {
  rangeInConsole,
  rangeInConsoleWithLimit,
  addAge,
  getAuthorName
} from "./loop.mjs";

// test utilities
const mockLogs = (testFn, assertFn) => {
  const origLog = console.log;
  const origErr = console.error;
  const logLines = [];
  const errorLines = [];
  console.log = num => logLines.push(num);
  console.error = num => errorLines.push(num);
  testFn();
  console.log = origLog;
  console.error = origErr;
  assertFn(logLines, errorLines);
};

const test = (message, fn) => {
  try {
    fn();
  } catch (e) {
    console.error(message);
    throw e;
  }
};

test("`addAge` は `age` プロパティをインクリメントして返す", () =>
  strictEqual(addAge({ age: 2 }).age, 3));

test("`getAuthorName` は `author.name` プロパティがあればそのまま返す", () =>
  strictEqual(getAuthorName({ author: { name: "test" } }), "test"));

test('`getAuthorName` は `author.name` プロパティがなければ "no name"を返す', () => {
  strictEqual(getAuthorName(undefined), "no name");
  strictEqual(getAuthorName({}), "no name");
});

test("`rangeInConsole` は `start` 以上 `end` 未満の数値を出力する", () =>
  mockLogs(
    () => rangeInConsole(1, 5),
    (logs, errors) => {
      deepStrictEqual(logs, [1, 2, 3, 4]);
      strictEqual(errors.length, 0);
    }
  ));

test("`rangeInConsole` は `start` が `end` より大きければエラーを出力する", () =>
  mockLogs(
    () => rangeInConsole(1, 0),
    (logs, errors) => {
      strictEqual(errors.length, 1);
      strictEqual(logs.length, 0);
    }
  ));

test("`rangeInConsoleWithLimit` は `start` 以上 `end` 未満の数値を5つまで出力する", () =>
  mockLogs(
    () => rangeInConsoleWithLimit(1, 5),
    (logs, errors) => {
      deepStrictEqual(logs, [1, 2, 3, 4]);
      strictEqual(errors.length, 0);
    }
  ));

test("`rangeInConsoleWithLimit` は `start` 以上 `end` 未満の数値が5つより多い場合，最初の5つを出力する", () =>
  mockLogs(
    () => rangeInConsoleWithLimit(1, 100),
    (logs, errors) => {
      deepStrictEqual(logs, [1, 2, 3, 4, 5]);
      strictEqual(errors.length, 0);
    }
  ));

console.log("passed!");
