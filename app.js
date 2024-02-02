let popular_movies = document.getElementById('popularmovie')
var movie_search = document.getElementById("search")
let img = document.getElementById('imagep')
const api_key = '4e44d9029b1270a757cddc766a1bcb63'

async function loadMovies() {
    let page = 1;
    let movie_array = [];
    while (page<3) {
        const URL = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${api_key}`;
        const res = await fetch(`${URL}`);
        data = await res.json();
        page++;
        movie_array = movie_array.concat(data.results)
    }
    let movie_id_array = []
    movie_array.forEach(element => {
        movie_id_array.push(element.id)
    });
    movies(movie_id_array)
}
loadMovies()

movie_search.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        popular_title = document.getElementById('populartext')
        popular_title.remove()
        var movie = (movie_search.value).trim();
        if (movie.length > 0) {
            load_id(movie)
        }
        movie_search.value = ""
    }
});

async function load_id(title) {
    const URL = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${api_key}`;
    const res = await fetch(`${URL}`);
    data = await res.json();
    let movie_id_array = []
    data.results.forEach(element => {
        movie_id_array.push(element.id)
    });
    movies(movie_id_array)
}

async function get_video(id) {
    let URL_Video_id = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`;
    let res_video_id = await fetch(`${URL_Video_id}`);
    data_video_id = await res_video_id.json();
    let video = data_video_id.results[0].key
    return video
}

function movies(movie_arr) {
    popular_movies.innerHTML = "";
    movie_arr.forEach(async element => {
        let URL_MOVIE = `https://api.themoviedb.org/3/movie/${element}?api_key=${api_key}`;
        let res_movie = await fetch(`${URL_MOVIE}`);
        data_movie = await res_movie.json();
        var movies40=document.createElement('div');
        movies40.classList.add('card');
        let image = 'https://image.tmdb.org/t/p/w500/' + data_movie.poster_path;
        let image1 = 'https://image.tmdb.org/t/p/w500/' + data_movie.backdrop_path;
        let rel_date = data_movie.release_date.split('-')[0]
        let runtime = data_movie.runtime
        let hour = parseInt(runtime/60)
        let min = runtime%60
        let total_time = hour + 'h' + min + 'm'
        let title = data_movie.title
        let vid = await get_video(element)
        let vido  ="https://www.youtube.com/embed/" + vid + "?autoplay=1&mute=1&controls=0"
        let card_content2 = "card-content"
        if (title.length>20) {
            card_content2 = card_content2 + 1 
        }
        movies40.innerHTML = `
        <div class="card-mini"></div>
        <div class="popularimgdiv">
            <img src=${image} alt="" class="popularimg" id="imagep">
            <iframe src=${vido} class="popularvideo" id="videop" name="youtube embed" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <img src=${image1} alt="" class="popularimg1" id="imagep1">
            
        </div>
        <div class=${card_content2}>
            <p class="movie_title" id="movie_title">${title}</p>
            <a class="watch_movie" id="watch_movie" href=${data_movie.homepage}  target="_blank">Watch Now</a>
            <ul class="movie_tag">
                <li>
                    <p class="release_year" id="release_year">${rel_date}</p>
                </li>
                <li>
                    <p class="movie_time" id="movie_time">${total_time}</p>
                </li>
                <li>
                    <p class="movie_language" id="movie_language">${data_movie.spoken_languages[0].english_name}</p>
                </li>
            </ul>
            <p class="overview" id="overview">${data_movie.overview}</p>

        </div>
            `;
            popular_movies.appendChild(movies40);
    });
}

