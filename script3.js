//This code will be used later to have a 'suprise me button'
// function randomPopularNumber(){
//   return Math.round(Math.random() * 10)
// }
// randomPopularNumber()
let mode = 'light'
let currentIteration = 1
const Key = '2f8a5b2429e4b9b5d1b814e625899d6b';
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${Key}&page=${currentIteration}`;
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=`;
const search = document.getElementById('search'); 
const form = document.getElementById('form');
const main = document.getElementById('main');  
const nextPage = document.getElementById('next')
const firstPage =  document.getElementById('firstPage')
const previous = document.getElementById('go')
const lightMode= document.getElementById('lightswitch')

//debugger
//initially getting fav movies by popularity
getMovies(api_url);



//fetching the data from TMDB API
async function getMovies(api_url){
    const response = await fetch(api_url);
    const responseData = await response.json();
    
    //invoked for showing the movies
    displayMovies(responseData.results);
}

//displaying movies
function displayMovies(movies){
    //clear main
    main.innerHTML = '';
    
    //iterating through the movies object
    if(movies.length==0)
    {
    alert("No match found")
    getMovies(api_url);
    }
    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        
        movieElement.innerHTML = `
        <img src=${IMGPATH + poster_path} alt=${title}>
        <div class="movie-info">
        <h3>${title}</h3>
        <span class=${getClassByRate(vote_average)}>${vote_average}</span>
        </div>
        
        <div class="overview">
        <h4>Overview:</h4>
        ${overview}
        </div>       
        <button class = 'add-btn' > Add to watchlist</button>

        `;
        main.appendChild(movieElement);
    });
}

//adding 
function getClassByRate(vote){
    if (vote >= 8) {
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }
}

// Searching the movie
form.addEventListener('submit', function(e){
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});

nextPage.addEventListener('click', () => {
        currentIteration++;
        getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${Key}&page=${currentIteration}`)
        //invoked for showing the movies
        displayMovies(responseData.results);
    }
);

firstPage.addEventListener('click', () => {
    currentIteration = 1;
    getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${Key}&page=${currentIteration}`)
    //invoked for showing the movies
    displayMovies(responseData.results);
})

previous.addEventListener('click', () => {
    if (currentIteration>1){
    currentIteration--;
    getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${Key}&page=${currentIteration}`)}
    //invoked for showing the movies
    displayMovies(responseData.results);
});
//debugger
lightMode.addEventListener('click', () => {
    console.log('working')
    if( mode === "light"){
        document.body.style.backgroundColor = 'black'
        mode = 'black'
        lightMode.innerText = 'Light Mode'
    } else {
        document.body.style.backgroundColor = 'white'
        mode = 'light'
        lightMode.innerText = 'Dark Mode'
    }
})


// Adding movies to watchlist
const watchlist = document.getElementById('watchlist');
const watchlistBtns = document.querySelectorAll('.add-btn');

let moviesInWatchlist = [];

// Check if there are saved movies in local storage
if (localStorage.getItem('watchlist')) {
  moviesInWatchlist = JSON.parse(localStorage.getItem('watchlist'));
}

// Show the movies saved in the watchlist
function showMoviesInWatchlist() {
  watchlist.innerHTML = '';

  moviesInWatchlist.forEach((movie) => {
    const {poster_path, title, vote_average, overview} = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
    <img src=${IMGPATH + poster_path} alt=${title}>
    <div class="movie-info">
      <h3>${title}</h3>
      <span class=${getClassByRate(vote_average)}>${vote_average}</span>
    </div>

    <div class="overview">
      <h4>Overview:</h4>
      ${overview}
    </div>
    `;

    watchlist.appendChild(movieElement);
  });
}

// Add the clicked movie to the watchlist
function addToWatchlist(movie) {
  moviesInWatchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(moviesInWatchlist));
  showMoviesInWatchlist();
}

// Handle the add to watchlist button click event
main.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const clickedMovie = clickedElement.parentElement.parentElement;

  if (clickedElement.classList.contains('add-btn')) {
    const movie = {
      title: clickedMovie.querySelector('h3').innerText,
      vote_average: clickedMovie.querySelector('span').innerText,
      poster_path: clickedMovie.querySelector('img').getAttribute('src').slice(IMGPATH.length),
      overview: clickedMovie.querySelector('.overview').innerText
    };

    addToWatchlist(movie);
  }
});

// Initialize the watchlist section
showMoviesInWatchlist();



