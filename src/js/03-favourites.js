//Make favourites list
const localStorageName = "favourites";
const getFavourites = (event) => {
  let selectedListId = parseInt(event.currentTarget.id);
  let indexFav = -1;
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
  listenEachDelButton();
};
//Paint favourites list
const paintFavourites = () => {
  let htmlFavourite = "";
  for (let i = 0; i < favouritesDataList.length; i++) {
    htmlFavourite += `<li name"${i}" class="fav-list js-fav">`;
    htmlFavourite += `<h3 class="fav-list-title">${favouritesDataList[i].show.name}</h3>`;
    htmlFavourite += "<div class='fav-container'>";
    if (favouritesDataList[i].show.image === null) {
      htmlFavourite += `<img src="./assets/images/not-found-image.jpg" width="100" height="130" alt="Image not found"/>`;
    } else {
      htmlFavourite += `<img class="list-image" src="${favouritesDataList[i].show.image.medium}" alt="Image of ${favouritesDataList[i].show.name}" width="100"/>`;
    }
    htmlFavourite += `<button class="delete-button button" name="${i}">x</button>`;
    htmlFavourite += "</div>";
    htmlFavourite += "</li>";
  }
  favouriteList.innerHTML = htmlFavourite;
  setStorageFavourites();
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
