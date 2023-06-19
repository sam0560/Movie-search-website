const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const resultsContainer = document.getElementById('video');
// const viewDetailButtons = document.querySelectorAll('.view');

// const detailContainer = document.getElementById('detail');
// const titleElement = document.getElementById('title');
// const yearElement = document.getElementById('year');
// const genreElement = document.getElementById('genre');
// const summaryElement = document.getElementById('summ');
// const castElement = document.getElementById('cast');



//  Fetch from Api
const fetchMoviesBySearch = async (searchTerm) => {
const apiKey = 'fe356b2c';
const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200 && data.Response === 'True') {
        return data.Search;
        } else {
        return null;
        }
    } catch (error) {
        return null;
    }
};

searchButton.addEventListener('click', async (event) => {
event.preventDefault();

const searchTerm = searchInput.value;

try{
    const movies = await fetchMoviesBySearch(searchTerm);

        if (movies) {
        resultsContainer.innerHTML = ''; // Clear previous results

        movies.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('card');

            const movieId = `${movie.imdbID}`
            // const redirectionUrl = `detail.html?id=http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
            const redirectionUrl = `detail.html?id=${movieId}`;

            // const viewDetailButtons = movieCard.querySelector('.view');


            movieCard.innerHTML = `
            <div class="card-image">
            <img src="${movie.Poster}" alt="image of card" class="card-img">
            <div class="card-desc">
                <div class="flex-card-desc">
                    <div class="text">
                    <div class="movie-title">
                        <div class="left-info">
                        <img src="/images/play-movie-icon.png" alt="play icon" class="play-icon">
                        <div class="title-rls">
                            <p class="mv-title">${movie.Title}</p>
                            <p class="release">${movie.Year}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <button class="view">
                        <a href="${redirectionUrl}">
                            view
                        </a>
                    </button>
                </div>
                </div>
            </div>
            `;
            resultsContainer.append(movieCard);
        });

        } else {
        resultsContainer.innerHTML = `No movies found for search term '${searchTerm}'.`;
        }
    }
    catch (error)  {
        resultsContainer.innerHTML = `${error}`;
    };
});