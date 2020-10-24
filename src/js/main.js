"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");

//Call API to get info
let dataList = [];
let favouritesDataList = [];
const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      dataList = data;
      paintShows();
      listenListResults();
      paintFavourites();
      if (dataList.length == 0) {
        resultsList.innerHTML = "<p class ='not-found-message'>No results found</p>";
      }
      setFavourites();
      listenEachFavButton();
      //que al recargar la página me marque los favoritos
      selectShowsFav();
      console.log(favouritesDataList);
    });
};

//Paint data into the browser
const paintShows = () => {
  let htmlResult = "";
  for (let i = 0; i < dataList.length; i++) {
    htmlResult += `<li id="${i}" name="${i}" class="js-list">`;
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
const localStorageName = "favourites";
console.log(favouritesDataList);
const getFavourites = (event) => {
  let selectedListId = parseInt(event.currentTarget.id);
  let indexFav = favouritesDataList.indexOf(dataList[selectedListId]);

  for (let i = 0; i < favouritesDataList.length; i++) {
    if (favouritesDataList[i].show.id == dataList[selectedListId].show.id) {
      indexFav = i;
      break;
    }
  }

  if (indexFav === -1) {
    favouritesDataList.push(dataList[selectedListId]);
    event.currentTarget.classList.add("paint-favourite");
  } else {
    favouritesDataList.splice(indexFav, 1);
    event.currentTarget.classList.remove("paint-favourite");
  }
  paintFavourites();
  listenEachFavButton();
};
//Paint favourites list
const paintFavourites = () => {
  let htmlFavourite = "";
  for (let i = 0; i < favouritesDataList.length; i++) {
    htmlFavourite += `<li name"${i}" class="js-fav">`;
    htmlFavourite += "<div>";
    htmlFavourite += `<h3 class="list-title">${favouritesDataList[i].show.name}</h3>`;
    if (favouritesDataList[i].show.image === null) {
      htmlFavourite += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="100" height="130" alt="Image not found"/>`;
    } else {
      htmlFavourite += `<img class="list-image" src="${favouritesDataList[i].show.image.medium}" alt="Image of ${favouritesDataList[i].show.name}" width="100"/>`;
    }
    htmlFavourite += `<button class="delete-button button" name="${i}">x</button>`;
    htmlFavourite += "</div>";
    htmlFavourite += "</li>";
  }
  favouriteList.innerHTML = htmlFavourite;
  setFavourites();
};
//List every delete button
const deleteEachFav = (event) => {
  const indexButton = parseInt(event.currentTarget.name);
  favouritesDataList.splice(indexButton, 1);
  paintFavourites();
  paintShows();
  selectShowsFav();
  listenEachFavButton();
  listenListResults();
};
const listenEachFavButton = () => {
  const deleteEachFavButton = document.querySelectorAll(".delete-button");
  for (const item of deleteEachFavButton) {
    item.addEventListener("click", deleteEachFav);
  }
};
//Set favourites list
const setFavourites = () => {
  localStorage.setItem(localStorageName, JSON.stringify(favouritesDataList));
};

//Recover favourites list
const recoverFavourites = () => {
  const favouriteDataRecovered = JSON.parse(localStorage.getItem(localStorageName));
  if (favouriteDataRecovered === null) {
    triggerSearch();
  } else {
    favouritesDataList = favouriteDataRecovered;
    paintFavourites();
    listenListResults();
  }
};

//Select favourites
const selectShowsFav = () => {
  for (let i = 0; i < favouritesDataList.length; i++) {
    for (let j = 0; j < dataList.length; j++) {
      if (favouritesDataList[i].show.id === dataList[j].show.id) {
        const listResults = document.querySelectorAll(".js-list");
        listResults[j].classList.add("paint-favourite");
      }
    }
  }
};

//Delete favourites
const deleteAllButton = document.querySelector(".js-delete-all");
deleteAllButton.addEventListener("click", function () {
  const listResults = document.querySelectorAll(".js-list");
  for (const item of listResults) {
    item.classList.remove("paint-favourite");
  }
  favouritesDataList = [];
  favouriteList.innerHTML = "";
  localStorage.clear();
});

//listen every list item
const listenListResults = () => {
  const listResults = document.querySelectorAll(".js-list");
  for (let item of listResults) {
    item.addEventListener("click", getFavourites);
  }
};

button.addEventListener("click", triggerSearch);
triggerSearch();
recoverFavourites();
