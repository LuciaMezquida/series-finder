"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");
let dataList = [];
let favouritesDataList = [];

//Listen every list item
const listenListResults = () => {
  const listResults = document.querySelectorAll(".js-list");
  for (let item of listResults) {
    item.addEventListener("click", getFavourites);
  }
};
button.addEventListener("click", triggerSearch);

//Make the input work when hitting enter key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    triggerSearch();
  }
});
recoverFavourites();
