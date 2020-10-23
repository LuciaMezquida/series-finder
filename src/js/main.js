"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");
let dataList = [];
const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      dataList = data;
      paintShows();
    });
};
const paintShows = () => {
  let html = "";
  for (let i = 0; i < dataList.length; i++) {
    html += "<li>";
    html += "<div>";
    html += `<h3 class="list-title">${dataList[i].show.name}</h3>`;
    if (dataList[i].show.image === null) {
      html += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="210" height="250" alt="Image not found"/>`;
    } else {
      html += `<img class="list-image" src="${dataList[i].show.image.medium}" alt="image of ${dataList[i].show.name}"/>`;
    }
    html += "</div>";
    html += "</li>";
  }
  resultsList.innerHTML = html;
};

button.addEventListener("click", triggerSearch);
triggerSearch();
