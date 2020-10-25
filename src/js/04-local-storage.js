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
