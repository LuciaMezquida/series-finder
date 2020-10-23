"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");

//Call API to get info
let dataList = [];
const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      dataList = data;
      paintShows();
      if (dataList.length == 0) {
        resultsList.innerHTML = "<p class ='not-found-message'>No se han encontrado resultados</p>";
      }
      listenListResults();
    });
};
//Paint data into the browser
const paintShows = () => {
  let htmlResult = "";
  for (let i = 0; i < dataList.length; i++) {
    htmlResult += `<li id="${i}" class="js-list">`;
    htmlResult += "<div>";
    htmlResult += `<h3 class="list-title">${dataList[i].show.name}</h3>`;
    if (dataList[i].show.image === null) {
      htmlResult += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="210" height="260" alt="Image not found"/>`;
    } else {
      htmlResult += `<img class="list-image" src="${dataList[i].show.image.medium}" alt="Image of ${dataList[i].show.name}"/>`;
    }
    htmlResult += "</div>";
    htmlResult += "</li>";
  }
  resultsList.innerHTML = htmlResult;
};

//Paint favourites list
let favouritesDataList = [];
const keepFavourites = (event) => {
  let selectedListId = event.currentTarget.id;
  const indexFav = favouritesDataList.indexOf(dataList[selectedListId]);
  console.log(indexFav);
  if (indexFav === -1) {
    favouritesDataList.push(dataList[selectedListId]);
  }
  // else {
  //   favouritesDataList.splice(indexFav, 1);
  // }

  //favouriteList.innerHTML = htmlFavourite;
  console.log(favouritesDataList);
  //console.log(event.currentTarget);
  //console.log(htmlFavourite);
};
//listen every list item
const listenListResults = () => {
  const listResults = document.querySelectorAll(".js-list");
  for (let item of listResults) {
    item.addEventListener("click", keepFavourites);
  }
};

button.addEventListener("click", triggerSearch);
triggerSearch();
