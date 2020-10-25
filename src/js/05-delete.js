//List every delete button
const listenEachDelButton = () => {
  const deleteEachFavButton = document.querySelectorAll(".delete-button");
  for (const item of deleteEachFavButton) {
    item.addEventListener("click", deleteEachFav);
  }
};

const deleteEachFav = (event) => {
  const indexButton = parseInt(event.currentTarget.name);
  favouritesDataList.splice(indexButton, 1);
  paintFavourites();
  paintShows();
  selectShowsFav();
  listenEachDelButton();
  listenListResults();
};
//Delete all favourites
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
