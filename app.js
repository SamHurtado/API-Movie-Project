const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");
const moviesLink = document.getElementById("moviesLink");
const recentContainer = document. querySelector(".movie-scroll");

const API_KEY = "39b36fc3";

let filterType = "";

async function fetchRecentMovies(year = 2024) {
    const queries = ["a", "the", "love", "man"];
    recentContainer.innerHTML = "";

    for (let q of queries) {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&y=${year}&type=movie`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                displayRecentMovies(data.Search);
            }
            } catch (err) {
                console.error(err);
            }
        }
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
    movieResults.innerHTML = movies.map(movie => `
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