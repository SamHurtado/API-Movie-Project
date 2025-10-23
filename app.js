const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const moviesLink = document.getElementById("moviesLink");
const recentContainer = document.querySelector(".movie-scroll");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const scrollWrapper = document.querySelector(".movie-scroll-wrapper");
const seriesContainer = document.querySelector(".series-scroll");
const scrollAmount = 200;
const API_KEY = "39b36fc3";
let allSeries = []
let allMovies = [];
let filterType = "";
let scrollPosition = 0;


async function fetchRecentSeries(year = 2024) {
    const queries = ["a", "the", "love", "man"];
    seriesContainer.innerHTML = "";

    for (let q of queries) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&y=${year}&type=series`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        allSeries = allSeries.concat(data.Search);
        allSeries = removeDuplicates(allSeries);
      }
    } catch (err) {
        console.error(err);
    }
}

displayRecentSeries(allSeries);
}

function removeDuplicates(arr) {
    const seen = new Set();
    return arr.filter(item => {
        if (seen.has(item.imdbID)) return false;
        seen.add(item.imdbID);
        return true;
    })
}

function displayRecentSeries(series) {
    series.forEach(show => {
        const card = document.createElement("div");
        card.classList.add("series-card--scroll");
        card.innerHTML = `
        <img src="${show.Poster !== "N/A" ? show.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="${show.Title}">
    `;
        seriesContainer.appendChild(card);
    });
}
fetchRecentSeries();

async function fetchRecentMovies(year = 2024) {
    const queries = ["a", "the", "love", "man"];
    recentContainer.innerHTML = "";

    for (let q of queries) {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&y=${year}&type=movie`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                allMovies = allMovies.concat(data.Search);
                allMovies = removeDuplicates(allMovies);
            }
            } catch (err) {
                console.error(err);
            }
        }

        displayRecentMovies(allMovies);
    }

    function displayRecentMovies(movies) {
        movies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card--scroll");
            card.innerHTML = `
            
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="${movie.Title}">
        `;
        recentContainer.appendChild(card);
        });
    }

    leftArrow.addEventListener("click", () => {
        scrollWrapper.scrollBy({left: -scrollAmount, behavior: 'smooth' })
    });
    rightArrow.addEventListener("click", () => {
        scrollWrapper.scrollBy({left: scrollAmount, behavior: 'smooth' });
    });

    fetchRecentMovies();


searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

async function fetchMovies(query) {
    if (query.length < 3) 
        movieResults.innerHTML = "";
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieResults.innerHTML = `<p>No movies found.</p>`;
        }
    } catch (error) {
        console.error(error);
        movieResults.innerHTML = `<p>Error fetching movies.</p>`;
    }
});

function displayMovies(movies) {
    if (!movies || movies.length === 0) {
        movieResults.innerHTML = "";
        movieResults.style.display = "none";
        return;
    }

    movieResults.style.display = "flex";

    const containerWidth = movieResults.clientWidth;
    const cardWidth = 180 + 20;
    const maxCards = Math.floor(containerWidth / cardWidth);
    const moviesToShow = movies.slice(0, maxCards);

    movieResults.innerHTML = moviesToShow.map(movie => `
        <div class="movie-card">
            <img 
                src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" 
                alt="${movie.Title}">
            <div class="overlay">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        </div>
    `).join("");
}



searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    fetchMovies(query);
});

moviesLink.addEventListener("click", (e) => {
    e.preventDefault();
    filterType = filterType === "movie" ? "" : "movie";
    moviesLink.classList.toggle("active");
    const query = searchInput.value.trim() || "a";
    fetchMovies(query);
});