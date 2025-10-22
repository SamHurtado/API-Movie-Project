const movieResults = document.getElementById("movieResults");
const API_KEY = "39b36fc3";


const query = "a";
const filterType = "movie";

async function fetchMovies(query) {
    if (!query || query.length < 1) return;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=${filterType}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieResults.innerHTML = "<p>No movies found.</p>";
        }
    } catch (err) {
        console.error(err);
        movieResults.innerHTML = "<p>Error fetching movies.</p>";
    }
}

function displayMovies(movies) {
    movieResults.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
    `).join("");
}


fetchMovies(query);
