// $(document).ready(() => {
//     $('#searchForm').on('submit', (e) => {
//         let searchText = $('#searchText').val()
//         getMovies(searchText)
//         e.preventDefault();
//     })
// });


// function getMovies(searchText) {
//     axios.get('https://api.themoviedb.org/3/search/movie?api_key=8627dd0c03cf4e18f1848b33cc61368f&query=' + searchText)
//         .then((res) => {
//             console.log(res);
//             let movies = res.data.results;
//             let output = '';
//             $.each(movies, (index, movie) => {
//                 output += `
//                <div class='col-md-3'>
//                <div class='well text-center'>
//                <img src='${movie.poster_path}'/>
//                <h5>${movie.title}</h5>
//                <a onclick='movieSelected('${movie.id}')' class='btn btn-primary' href='#'>Movie Details</a>
//                </div>
//                </div>
//                `;
//             })
//             $('#movies').html(output);
//         }).catch((err) => {
//             console.log(err)
//         })
// }


const buttonElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const movieSearchable = document.querySelector('#movies-searchable')
const moviesContainer = document.querySelector('#movies-container')


function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img 
            src= ${IMAGE_URL + movie.poster_path} 
            data-movie-id=${movie.id}
            />`;
        }
    })
}



function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie')

    const movieTemplate = `
    <h2>${title}</h2>
    <section class='section'>
    ${movieSection(movies)} 
    </section>
    <div class='content'>
    <p id='content-close'>X</p>
    </div>
    `;


    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = ''
    const movies = data.results;
    const movieBlock = createMovieContainer(movies)
    movieSearchable.appendChild(movieBlock)
    console.log('data:', data)
}
function renderMovies(data) {

    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title)
    moviesContainer.appendChild(movieBlock)
    console.log('data:', data)
}



function handleError(err) {
    console.log('Error: ', err)
}

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);
    inputElement.value = ''
    console.log('Value')
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe
}


function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">X</p>'
    console.log('Videos= ', data)
    const videos = data.results
    const length = videos.length > 4 ? 4 : videos.length
    const iframeContainer = document.createElement('div');
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer)
    }
}


document.onclick = function (eve) {

    const target = eve.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log('IM IMG')
        const movieId = target.dataset.movieId;
        console.log(movieId)
        const section = eve.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display')

        const path = `movie/${movieId}/videos`
        const url = generateUrl(path)
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log(error)
            })

    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')

    }

}

searchMovie('Avengers')
getUpcomingMovie()

getTopRatedMovies()

getPopularMovies()