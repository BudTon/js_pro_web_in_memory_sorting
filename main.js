/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/sortTab/filmList.js
const filmList = [{
  id: 26,
  title: "Побег из Шоушенка",
  imdb: 9.3,
  year: 1994
}, {
  id: 25,
  title: "Крёстный отец",
  imdb: 9.2,
  year: 1972
}, {
  id: 27,
  title: "Крёстный отец 2",
  imdb: 9.0,
  year: 1974
}, {
  id: 1047,
  title: "Тёмный рыцарь",
  imdb: 9.0,
  year: 2008
}, {
  id: 223,
  title: "Криминальное чтиво",
  imdb: 8.9,
  year: 1994
}];
;// CONCATENATED MODULE: ./src/js/sortTab/Tab.js

class Tab {
  constructor(element) {
    this._element = element;
  }
  deleteTab() {
    this._element.innerHTML = "";
  }
  creatTab(keySort, direction) {
    this.deleteTab();
    let sortDirection = document.querySelectorAll("thead > tr > th");
    sortDirection.forEach(th => {
      if (th.innerHTML.includes("↓")) th.innerHTML = th.innerHTML.split(" ")[0];
      if (th.innerHTML.includes("↑")) th.innerHTML = th.innerHTML.split(" ")[0];
    });
    sortDirection.forEach(th => {
      if (th.innerHTML === keySort) {
        if (direction === "up") th.innerHTML += " ↑";
        if (direction === "down") th.innerHTML += " ↓";
      }
    });
    filmList.forEach(film => {
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
      filmElementImdb.innerHTML = `imdb: ${Number(item.dataset.imdb).toFixed(2)}`;
      item.insertAdjacentElement("beforeEnd", filmElementImdb);
      this._element.appendChild(item);
    });
    let sortedList = [];
    if (keySort === "title") {
      if (direction === "up") {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) => rowA.dataset[`${keySort}`] > rowB.dataset[`${keySort}`] ? 1 : -1);
      } else {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) => rowA.dataset[`${keySort}`] > rowB.dataset[`${keySort}`] ? -1 : 1);
      }
    } else {
      if (direction === "up") {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) => Number(rowA.dataset[`${keySort}`]) > Number(rowB.dataset[`${keySort}`]) ? 1 : -1);
      } else {
        sortedList = Array.from(this._element.rows).sort((rowA, rowB) => Number(rowA.dataset[`${keySort}`]) > Number(rowB.dataset[`${keySort}`]) ? -1 : 1);
      }
    }
    sortedList.forEach(el => {
      console.log(el);
      this._element.appendChild(el);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector("tbody");
  const tab = new Tab(element);
  window.tab = tab;
  const listKey = [{
    id: "up"
  }, {
    id: "down"
  }, {
    title: "up"
  }, {
    title: "down"
  }, {
    year: "up"
  }, {
    year: "down"
  }, {
    imdb: "up"
  }, {
    imdb: "down"
  }];

  // //Вариант 1 - остановка после прохождения всей сортировки столбцов в таблице
  // const tabInterval = setInterval(function () {
  //   const sort = listKey.shift();
  //   const keySort = Object.keys(sort)[0];
  //   const direction = Object.values(sort)[0];
  //   tab.creatTab(keySort, direction);
  //   if (!listKey.length) clearInterval(tabInterval);
  // }, 3000);

  // Вариант 2 - безконечная сортировки столбцов в таблице
  let i = 0;
  setInterval(function () {
    const sort = listKey[i];
    i += 1;
    const keySort = Object.keys(sort)[0];
    const direction = Object.values(sort)[0];
    tab.creatTab(keySort, direction, i);
    if (listKey.length === i) i = 0;
  }, 3000);
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;