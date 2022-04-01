import { Movie } from '../../movie'

export class NowMovie extends Movie<HTMLElement> {
  constructor(movie: any) {
    const popularMoviesContainer = document.querySelector(
      '.now-movies'
    )! as HTMLElement
    super(
      `
            <li>
              <div class="movie-container">
                <div class="now-movie-title"> ${movie.title}</div>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="150" height="180"/>
              </div>
            </li>
          `,
      movie
    )
    this.addMovieTo(popularMoviesContainer)
  }
}
