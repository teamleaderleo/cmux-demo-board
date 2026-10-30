import { test } from "node:test";
import assert from "node:assert/strict";
import { CARDS, COLUMNS, groupByColumn, moveCard } from "../src/board.js";

test("every card lands in exactly one column", () => {
  const groups = groupByColumn(CARDS);
  assert.deepEqual(groups.map((g) => g.id), COLUMNS.map((c) => c.id));
  assert.equal(groups.reduce((n, g) => n + g.cards.length, 0), CARDS.length);
});

test("moveCard moves one card and leaves the rest", () => {
  const moved = moveCard(CARDS, 1, "done");
  assert.equal(moved.find((c) => c.id === 1).column, "done");
  assert.equal(moved.filter((c) => c.column !== CARDS.find((o) => o.id === c.id).column).length, 1);
  assert.equal(CARDS.find((c) => c.id === 1).column, "todo", "the input list is not mutated");
});

test("moveCard refuses an unknown column", () => {
  assert.throws(() => moveCard(CARDS, 1, "later"), /unknown column/);
});
