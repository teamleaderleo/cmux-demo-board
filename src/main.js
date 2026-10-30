import { CARDS, groupByColumn } from "./board.js";

const root = document.querySelector("#board");

function render(cards) {
  root.replaceChildren(
    ...groupByColumn(cards).map((column) => {
      const section = document.createElement("section");
      section.className = "column";
      section.setAttribute("aria-labelledby", `col-${column.id}`);

      const heading = document.createElement("h2");
      heading.id = `col-${column.id}`;
      heading.textContent = `${column.title} `;
      const count = document.createElement("span");
      count.className = "count";
      count.textContent = String(column.cards.length);
      heading.append(count);

      const list = document.createElement("ul");
      for (const card of column.cards) {
        const item = document.createElement("li");
        item.className = "card";
        item.tabIndex = 0;
        item.innerHTML = `<span class="tag tag-${card.tag}"></span><span class="title"></span>`;
        item.querySelector(".tag").textContent = card.tag;
        item.querySelector(".title").textContent = card.title;
        list.append(item);
      }
      section.append(heading, list);
      return section;
    }),
  );
}

render(CARDS);
