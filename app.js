const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");

const API_KEY = "39b36fc3";

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();


    if (query.length <3) {
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
    movieResults.innerHTML = movies
        .map(
            (movie) => `
            <div class="movie-card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            </div>
            `
            )
            .join("");
}