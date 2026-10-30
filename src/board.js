// The board's data and pure logic. No DOM here, so the tests run in plain Node.

export const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

export const CARDS = [
  { id: 1, title: "Sketch the landing page", column: "todo", tag: "design" },
  { id: 2, title: "Write the signup email", column: "todo", tag: "copy" },
  { id: 3, title: "Fix the flaky login test", column: "doing", tag: "bug" },
  { id: 4, title: "Add dark mode tokens", column: "doing", tag: "design" },
  { id: 5, title: "Ship the pricing page", column: "done", tag: "launch" },
  { id: 6, title: "Rotate the staging keys", column: "done", tag: "ops" },
];

/** Cards grouped by column, in column order. */
export function groupByColumn(cards, columns = COLUMNS) {
  return columns.map((column) => ({
    ...column,
    cards: cards.filter((card) => card.column === column.id),
  }));
}

/** Move a card to another column, returning a new list. Unknown ids leave the list unchanged. */
export function moveCard(cards, id, column) {
  if (!COLUMNS.some((c) => c.id === column)) throw new Error(`unknown column: ${column}`);
  return cards.map((card) => (card.id === id ? { ...card, column } : card));
}
