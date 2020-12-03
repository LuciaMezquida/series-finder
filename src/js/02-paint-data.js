//Paint data into the browser
const paintShows = () => {
  let htmlResult = "";
  for (let i = 0; i < dataList.length; i++) {
    htmlResult += `<li id="${i}" name="${i}" class="color-list list js-list">`;
    htmlResult += "<div class='show-container'>";
    htmlResult += `<h3 class="list-title">${dataList[i].show.name}</h3>`;
    if (dataList[i].show.image === null) {
      htmlResult += `<img src="./assets/images/not-found-image.jpg" width="210" height="260" alt="Image not found"/>`;
    } else {
      htmlResult += `<img class="list-image" src="${dataList[i].show.image.medium}" alt="Image of ${dataList[i].show.name}"/>`;
    }
    htmlResult += "</div>";
    htmlResult += "</li>";
  }
  resultsList.innerHTML = htmlResult;
};
