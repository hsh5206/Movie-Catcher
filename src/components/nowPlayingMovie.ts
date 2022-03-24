import { Movie } from './movie'

export class NowPlayingMovie extends Movie<HTMLElement> {
  constructor(movie: any) {
    const nowMoviesContainer = document.querySelector(
      '.now-movies'
    )! as HTMLElement
    super(`
          <div class="now-movie-container">
            <div class="now-movie-info">
              <div class="now-movie-title"> ${movie.title}</div>
              <div class="now-movie-overview"> ${movie.overview}</div>
              <div class="now-movie-date"> ${movie.release_date}</div>
              <div class="now-movie-vote"> ${movie.vote_average} / 10</div>
            </div>
            <div class="now-movie-poster">
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="180" height="250"/>
            </div>
          </div>
          `)
    this.addMovieTo(nowMoviesContainer)
  }
}
