let url = "https://yts.mx/api/v2/list_movies.json?limit=50";
let filterQueries = {
    searchQuery: "",
    quality: "All",
    genre: "All",
    rating: "All",
    year: "All",
    orderby: "asc" 
};

async function makeApiCall(url){
    try {
        let req = await fetch(url);
        let res = await req.json();
        //console.log(res);
        addOnScreen(res);
    } catch (error) {
        console.log(error);
        return;
    }
}

makeApiCall(url);

function addOnScreen(obj){
    let moviesArray = obj.data.movies;
    //filter using js for the rest
    let filteredMovies = filterArray(moviesArray);
    let div = document.getElementById("container");
    div.innerHTML="";
    for (const movie of filteredMovies) {
        let genresString = movie.genres.reduce((prev, next) => {
            return prev+next+", ";
        }, "");
        div.innerHTML+=`<div class="movieBlock">
            <a href="${movie.url}" target="_blank">
            <img class="movieImage" src="${movie.medium_cover_image}" width="90%">
            </a>
            <h4 class="movieTitle">${movie.title_long}</h4>
            <small>${genresString}</small>
            <br>
            <small>Rating: ${movie.rating}</small>
        </div>`;
    }
}

function filterArray(arr){
    let year = filterQueries.year === "All" ? "" : parseInt(filterQueries.year);
    let rating = filterQueries.rating === "All" ? "" : parseInt(filterQueries.rating);
    let quality = filterQueries.quality === "All" ? "" : filterQueries.quality;
    let genre = filterQueries.genre === "All" ? "" : filterQueries.genre;
    let orderBy = filterQueries.orderby;
    if(year){
        arr = arr.filter(el=>el.year===year);
    }
    if(rating){
        arr = arr.filter(el=>el.rating>=rating);
    }
    if(quality){
        arr = arr.filter(el=>{
            for (const torrent of el.torrents) {
                if(torrent.quality===quality) return el;
            }
        })
    }
    if(genre){
        arr = arr.filter(el=>{
            if(el.genres.includes(genre)) return el;
        })
    }
    if(orderBy==="asc"){
        arr.sort((a, b) => {
            if(a.title<b.title){
                return -1;
            }
            if(a.title>b.title){
                return 1;
            }
            return 0;
        })
    }else{
        arr.sort((a, b) => {
            if(a.title>b.title){
                return -1;
            }
            if(a.title<b.title){
                return 1;
            }
            return 0;
        })
    }

    return arr;
}

let qualitySelection = document.getElementById("quality");
qualitySelection.onchange = event => {
    filterQueries.quality = event.target.value;
    //console.log(filterQueries);
}

let genreSelection = document.getElementById("genre");
genreSelection.onchange = event => {
    filterQueries.genre = event.target.value;
    //console.log(filterQueries);
}

let ratingSelection = document.getElementById("rating");
ratingSelection.onchange = event => {
    filterQueries.rating = event.target.value;
    //console.log(filterQueries);
}

let yearSelection = document.getElementById("year");
yearSelection.onchange = event => {
    filterQueries.year = event.target.value;
    //console.log(filterQueries);
}

let orderbySelection = document.getElementById("orderby");
orderbySelection.onchange = event => {
    filterQueries.orderby = event.target.value;
    //console.log(filterQueries);
}

let searchInput = document.getElementById("search");
searchInput.onchange = event => {
    filterQueries.searchQuery = event.target.value;
    //console.log(filterQueries);
}
//https://yts.mx/browse-movies/batman/1080p/comedy/5/seeds/2021/es

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", ()=>{
    // let endPoint = url;
    //Filtering from the backend using query
    // if(filterQueries.searchQuery){
    //     endPoint+=`&query_term=${filterQueries.searchQuery}`;
    // }
    // if(filterQueries.quality!=="All"){
    //     endPoint+=`&quality=${filterQueries.quality}`;
    // }
    // if(filterQueries.genre!=="All"){
    //     endPoint+=`&genre=${filterQueries.genre}`;
    // }
    // endPoint+=`&order_by=${filterQueries.orderby}`;
    makeApiCall(url);
});