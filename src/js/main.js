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
    htmlResult += "<div class='show-container'>";
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

//Make favourites list
let favouritesDataList = [];
const keepFavourites = (event) => {
  let selectedListId = event.currentTarget.id;
  const indexFav = favouritesDataList.indexOf(dataList[selectedListId]);
  console.log(indexFav);
  if (indexFav === -1) {
    favouritesDataList.push(dataList[selectedListId]);
  }
  paintFavourites();
  // else {
  //   favouritesDataList.splice(indexFav, 1);
  // }
};
//Paint favourites list
const paintFavourites = () => {
  let htmlFavourite = "";
  htmlFavourite += "<h2 class='favourite-title'>Mis favoritas</h2>";
  for (let i = 0; i < favouritesDataList.length; i++) {
    htmlFavourite += `<li id="${i}" class="js-list">`;
    htmlFavourite += "<div>";
    htmlFavourite += `<h3 class="list-title">${favouritesDataList[i].show.name}</h3>`;
    if (favouritesDataList[i].show.image === null) {
      htmlFavourite += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="100" height="130" alt="Image not found"/>`;
    } else {
      htmlFavourite += `<img class="list-image" src="${favouritesDataList[i].show.image.medium}" alt="Image of ${favouritesDataList[i].show.name}" width="100"/>`;
    }
    htmlFavourite += "<button>x</button>";
    htmlFavourite += "</div>";
    htmlFavourite += "</li>";
  }
  favouriteList.innerHTML = htmlFavourite;
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
