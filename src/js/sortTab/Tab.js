import { filmList } from "./filmList.js";
export default class Tab {
  constructor(element) {
    this._element = element;
  }
  deleteTab() {
    this._element.innerHTML = "";
  }

  creatTab(keySort, direction) {
    this.deleteTab();
    let sortDirection = document.querySelectorAll("thead > tr > th");
    sortDirection.forEach((th) => {
      if (th.innerHTML.includes("↓")) th.innerHTML = th.innerHTML.split(" ")[0];
      if (th.innerHTML.includes("↑")) th.innerHTML = th.innerHTML.split(" ")[0];
    });

    sortDirection.forEach((th) => {
      if (th.innerHTML === keySort) {
        if (direction === "up") th.innerHTML += " ↑";
        if (direction === "down") th.innerHTML += " ↓";
      }
    });

    filmList.forEach((film) => {
      const item = document.createElement("tr");
      item.dataset.id = film.id;
      item.dataset.title = film.title;
      item.dataset.year = film.year;
      item.dataset.imdb = film.imdb;
      const filmElementId = document.createElement("td");
      filmElementId.innerHTML = item.dataset.id;
      item.insertAdjacentElement("beforeEnd", filmElementId);
      const filmElementTitle = document.createElement("td");
      filmElementTitle.innerHTML = item.dataset.title;
      item.insertAdjacentElement("beforeEnd", filmElementTitle);
      const filmElementYear = document.createElement("td");
      filmElementYear.innerHTML = `(${item.dataset.year})`;
      item.insertAdjacentElement("beforeEnd", filmElementYear);
      const filmElementImdb = document.createElement("td");
      filmElementImdb.innerHTML = `imdb: ${Number(item.dataset.imdb).toFixed(
        2,
      )}`;
      item.insertAdjacentElement("beforeEnd", filmElementImdb);
      this._element.appendChild(item);
    });
    let sortedList = [];
    if (keySort === "title") {
      if (direction === "up") {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) =>
          rowA.dataset[`${keySort}`] > rowB.dataset[`${keySort}`] ? 1 : -1,
        );
      } else {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) =>
          rowA.dataset[`${keySort}`] > rowB.dataset[`${keySort}`] ? -1 : 1,
        );
      }
    } else {
      if (direction === "up") {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) =>
          Number(rowA.dataset[`${keySort}`]) >
          Number(rowB.dataset[`${keySort}`])
            ? 1
            : -1,
        );
      } else {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) =>
          Number(rowA.dataset[`${keySort}`]) >
          Number(rowB.dataset[`${keySort}`])
            ? -1
            : 1,
        );
      }
    }
    sortedList.forEach((el) => {
      console.log(el);
      this._element.appendChild(el);
    });
  }
}
