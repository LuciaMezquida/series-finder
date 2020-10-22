"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");

const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].score);
    });
};

button.addEventListener("click", triggerSearch);
