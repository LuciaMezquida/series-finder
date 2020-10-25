const triggerSearch=()=>{let t=searchingGap.value;fetch("//api.tvmaze.com/search/shows?q="+t).then(t=>t.json()).then(t=>{dataList=t,paintShows(),0===dataList.length&&(resultsList.innerHTML="<p class ='not-found-message'>No results found</p>"),listenListResults(),paintFavourites(),setFavourites(),listenEachDelButton(),selectShowsFav()})},paintShows=()=>{let t="";for(let e=0;e<dataList.length;e++)t+=`<li id="${e}" name="${e}" class="color-list list js-list">`,t+="<div class='show-container'>",t+=`<h3 class="list-title">${dataList[e].show.name}</h3>`,null===dataList[e].show.image?t+='<img src="./assets/images/not-found-image.jpg" width="210" height="260" alt="Image not found"/>':t+=`<img class="list-image" src="${dataList[e].show.image.medium}" alt="Image of ${dataList[e].show.name}"/>`,t+="</div>",t+="</li>";resultsList.innerHTML=t},localStorageName="favourites",getFavourites=t=>{let e=parseInt(t.currentTarget.id),s=-1;for(let t=0;t<favouritesDataList.length;t++)if(favouritesDataList[t].show.id==dataList[e].show.id){s=t;break}-1===s?(favouritesDataList.push(dataList[e]),t.currentTarget.classList.add("paint-favourite")):(favouritesDataList.splice(s,1),t.currentTarget.classList.remove("paint-favourite")),paintFavourites(),listenEachDelButton()},paintFavourites=()=>{let t="";for(let e=0;e<favouritesDataList.length;e++)t+=`<li name"${e}" class="fav-list js-fav">`,t+=`<h3 class="fav-list-title">${favouritesDataList[e].show.name}</h3>`,t+="<div class='fav-container'>",null===favouritesDataList[e].show.image?t+='<img src="./assets/images/not-found-image.jpg" width="100" height="130" alt="Image not found"/>':t+=`<img class="list-image" src="${favouritesDataList[e].show.image.medium}" alt="Image of ${favouritesDataList[e].show.name}" width="100"/>`,t+=`<button class="delete-button button" name="${e}">x</button>`,t+="</div>",t+="</li>";favouriteList.innerHTML=t,setFavourites()},selectShowsFav=()=>{for(let t=0;t<favouritesDataList.length;t++)for(let e=0;e<dataList.length;e++)if(favouritesDataList[t].show.id===dataList[e].show.id){document.querySelectorAll(".js-list")[e].classList.add("paint-favourite")}},setFavourites=()=>{localStorage.setItem("favourites",JSON.stringify(favouritesDataList))},recoverFavourites=()=>{const t=JSON.parse(localStorage.getItem("favourites"));null===t?triggerSearch():(favouritesDataList=t,paintFavourites(),listenListResults())},listenEachDelButton=()=>{const t=document.querySelectorAll(".delete-button");for(const e of t)e.addEventListener("click",deleteEachFav)},deleteEachFav=t=>{const e=parseInt(t.currentTarget.name);favouritesDataList.splice(e,1),paintFavourites(),paintShows(),selectShowsFav(),listenEachDelButton(),listenListResults()},deleteAllButton=document.querySelector(".js-delete-all");deleteAllButton.addEventListener("click",(function(){const t=document.querySelectorAll(".js-list");for(const e of t)e.classList.remove("paint-favourite");favouritesDataList=[],favouriteList.innerHTML="",localStorage.clear()}));const searchingGap=document.querySelector(".js-search"),button=document.querySelector(".js-btn"),resultsList=document.querySelector(".js-results-list"),favouriteList=document.querySelector(".js-favourite-list");let dataList=[],favouritesDataList=[];const listenListResults=()=>{const t=document.querySelectorAll(".js-list");for(let e of t)e.addEventListener("click",getFavourites)};button.addEventListener("click",triggerSearch),document.addEventListener("keydown",(function(t){"Enter"===t.key&&(t.preventDefault(),triggerSearch())})),recoverFavourites();