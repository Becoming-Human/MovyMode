//This code will be used later to have a 'suprise me button'
// function randomPopularNumber(){
//   return Math.round(Math.random() * 10)
// }
// randomPopularNumber()
let currentIteration = 1
const Key = '2f8a5b2429e4b9b5d1b814e625899d6b';
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${Key}&page=${currentIteration}`;
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=`;
const search = document.getElementById('search'); 
const form = document.getElementById('form');
const main = document.getElementById('main');  
const nextPage = document.getElementById('next')
const firstPage=  document.getElementById('firstPage')
console.log(nextPage)
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