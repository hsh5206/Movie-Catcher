import { Movie } from '../movie'

export class TopRatedMovie extends Movie<HTMLElement> {
  constructor(movie: any) {
    const popularMoviesContainer = document.querySelector(
      '.toprated-movies'
    )! as HTMLElement
    super(
      `
            <li>
              <div class="movie-container">
                <div class="top-movie-title-container">
                  <div class="top-movie-rank">${movie.rank}</div>
                  <div class="top-movie-title"> ${movie.title}</div>
                </div>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="150" height="180"/>
              </div>
            </li>
          `,
      movie
    )
    this.addMovieTo(popularMoviesContainer)
  }
}
