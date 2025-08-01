const API_KEY = "356820b0";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const movieList = document.getElementById("movie-list");
const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
const movieDetailModal = new bootstrap.Modal(
  document.getElementById("movieDetailModal")
);
const movieDetailContent = document.getElementById("movie-detail-content");

/**
 * Fetches data from the OMDB API.
 * @param {string} params - The query parameters for the API (e.g., s=matrix or i=tt0133093).
 * @returns {Promise<Object>} - The JSON response from the API.
 */
async function fetchApiData(params) {
  try {
    const response = await fetch(`${API_URL}&${params}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    displayError(
      "An error occurred while fetching data. Please try again later."
    );
    return null;
  }
}

async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    displayError("Please enter a movie title to search.");
    return;
  }

  clearResults();
  loadingSpinner.classList.remove("d-none");

  const data = await fetchApiData(`s=${searchTerm}`);

  loadingSpinner.classList.add("d-none");

  if (data && data.Response === "True") {
    displayMovies(data.Search);
  } else {
    displayError(data.Error || "No movies found for your search.");
  }
}

/**
 * Displays an array of movies in the movie list.
 * @param {Array<Object>} movies - An array of movie objects from the API.
 */
function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "col-6 col-sm-6 col-md-4 col-lg-3";

    const poster =
      movie.Poster === "N/A"
        ? "https://via.placeholder.com/400x600.png?text=No+Image"
        : movie.Poster;

    movieCard.innerHTML = `
            <div class="card bg-dark text-white movie-card h-100">
                <img src="${poster}" class="card-img-top" alt="${movie.Title} Poster">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-subtitle mb-2 text-white-50">${movie.Year}</p>
                    <button class="btn btn-outline-primary btn-sm mt-auto" onclick="showMovieDetails('${movie.imdbID}')">
                        <i class="fa-solid fa-magnifying-glass"></i> Lihat Detail
                    </button>
                </div>
            </div>
        `;
    movieList.appendChild(movieCard);
  });
}

/**
 * Fetches and displays the details for a specific movie in a modal.
 * @param {string} imdbID - The IMDb ID of the movie.
 */
async function showMovieDetails(imdbID) {
  movieDetailContent.innerHTML =
    '<div class="text-center"><div class="spinner-border text-primary" role="status"></div></div>';
  movieDetailModal.show();

  const movie = await fetchApiData(`i=${imdbID}`);

  if (movie && movie.Response === "True") {
    movieDetailContent.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <img src="${
                          movie.Poster === "N/A"
                            ? "https://via.placeholder.com/400x600.png?text=No+Image"
                            : movie.Poster
                        }" class="img-fluid rounded">
                    </div>
                    <div class="col-md-8">
                        <h3 class="fw-bold">${movie.Title} (${movie.Year})</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Rating:</strong> ⭐ ${
                              movie.imdbRating
                            } / 10</li>
                            <li class="list-group-item"><strong>Rilis:</strong> ${
                              movie.Released
                            }</li>
                            <li class="list-group-item"><strong>Durasi:</strong> ${
                              movie.Runtime
                            }</li>
                            <li class="list-group-item"><strong>Genre:</strong> ${
                              movie.Genre
                            }</li>
                            <li class="list-group-item"><strong>Sutradara:</strong> ${
                              movie.Director
                            }</li>
                            <li class="list-group-item"><strong>Pemeran:</strong> ${
                              movie.Actors
                            }</li>
                            <li class="list-group-item"><strong>Alur Cerita:</strong> ${
                              movie.Plot
                            }</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
  } else {
    movieDetailContent.innerHTML = `<p class="text-danger">Could not retrieve movie details.</p>`;
  }
}

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to display.
 */
function displayError(message) {
  movieList.innerHTML = "";
  errorMessage.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

function clearResults() {
  movieList.innerHTML = "";
  errorMessage.innerHTML = "";
}

searchButton.addEventListener("click", searchMovies);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
