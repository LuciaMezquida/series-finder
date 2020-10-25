//Call API to get info
const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      dataList = data;
      paintShows();
      if (dataList.length === 0) {
        resultsList.innerHTML = "<p class ='not-found-message'>No results found</p>";
      }
      listenListResults();
      paintFavourites();
      setFavourites();
      listenEachDelButton();
      selectShowsFav();
    });
};
