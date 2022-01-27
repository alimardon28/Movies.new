// let elResult = document.querySelector('.movies__result');
let elList = document.querySelector('.movies__list');
let elFilmsSelect = document.querySelector(".select");
let elForm = document.querySelector(".form");
let elBookmarkList = document.querySelector(".bookmark__list");


// elResult.textContent = films.length

const bookmarks = [];

const renderBookmarks = function(arr, element){
  arr.forEach(function(item){
    const newBookmarkItem = document.createElement("li");
    const newBookmarkDeleteButton = document.createElement("button");

    newBookmarkItem.classList.add("bookmark__item");
    newBookmarkDeleteButton.classList.add("bookmark__delete");

    newBookmarkItem.textContent = item.title;
    newBookmarkDeleteButton.textContent = "Delete";

    newBookmarkDeleteButton.dataset.bookmarkDeleteButtonId = item.id;


    element.appendChild(newBookmarkItem);
    newBookmarkItem.appendChild(newBookmarkDeleteButton);
  })
}

elBookmarkList.addEventListener("click" , function(evt){
 const isBookmarked =  evt.target.matches(".bookmark__delete");

 if(isBookmarked){
   const bookmarkRemoveBtnId = evt.target.dataset.bookmarkDeleteButtonId;

   const foundIndex = bookmarks.findIndex(film => film.id === bookmarkRemoveBtnId);

   bookmarks.splice(foundIndex, 1);

   elBookmarkList.innerHTML = null;

   renderBookmarks(bookmarks , elBookmarkList);
 }
});

elList.addEventListener("click" , function(evt){
  if(evt.target.matches(".bookmark__button")){
      const bookmarkIdBtn = evt.target.dataset.bookmarkBtnId;

     const foundElement = films.find((film) => film.id === bookmarkIdBtn);

     if(!bookmarks.includes(foundElement)){

       bookmarks.push(foundElement);

       elBookmarkList.innerHTML = null;

       renderBookmarks(bookmarks, elBookmarkList);
     }
  }
});

elFilmsSelect.innerHTML = null

const generateGenres = function(films) {
  const uniqueGenres = []

  films.forEach(film => {
    film.genres.forEach(genre => {
      if(!uniqueGenres.includes(genre)){
        uniqueGenres.push(genre)
      }
    })
  })

  uniqueGenres.forEach(genre => {
    let newFilmOpt = document.createElement("option")

    newFilmOpt.value = genre
    newFilmOpt.textContent = genre

    elFilmsSelect.appendChild(newFilmOpt)
  })
}

const renderFilms = function(filmsArray, element){
  filmsArray.forEach(movie => {
    //CREATE
    let newItem = document.createElement('li');
    let newCard = document.createElement('div');
    let newImg = document.createElement('img');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h5');
    let newCardGenresList = document.createElement('ul');
    let newBookmarkBtn = document.createElement('button');


    movie.genres.forEach(genre => {
      let newCardGenres = document.createElement('li')

      newCardGenres.textContent = genre

      newCardGenresList.appendChild(newCardGenres)
    })

    //SET ATTRIBUTE
    newItem.setAttribute('class', 'movies__item')
    newCard.setAttribute('class', 'card movies__card')
    newImg.setAttribute('class', 'card-img-top')
    newImg.setAttribute('src', movie.poster)
    newCardBody.setAttribute('class', 'card-body')
    newBookmarkBtn.setAttribute('class' ,'bookmark__button')

    //TEXT CONTENT
    newCardTitle.textContent = movie.title
    newBookmarkBtn.textContent ="Bookmark";

    // DATASETS
    newBookmarkBtn.dataset.bookmarkBtnId = movie.id;

    //APPEND CHILD
    element.appendChild(newItem);
    newItem.appendChild(newCard);
    newCard.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardGenresList);
    newCardBody.appendChild(newBookmarkBtn);
  })
}

renderFilms(films, elList)
generateGenres(films)



elForm.addEventListener('submit' , function(evt){
  evt.preventDefault();

  window.localStorage.setItem('movie', JSON.stringify(bookmarks))
elList.innerHTML = null

  let selectValue = elFilmsSelect.value;

  let filteredFilms = []

  films.forEach(film =>{
    if(film.genres.includes(selectValue)){
      window.localStorage.setItem('movie', JSON.stringify(bookmarks))
      filteredFilms.push(film)
    }
  })

  renderFilms(filteredFilms, elList)
})
