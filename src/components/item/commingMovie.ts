import { Movie } from '../movie'

export class CommingMovies extends Movie<HTMLElement> {
  constructor(movie: any) {
    super(
      `
            <li>
              <div class="movie-container">
                <div class="comming-movie-dday">D-${movie.dday}</div>
                <div class="comming-movie-title">${movie.title}</div>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="150" height="180"/>
              </div>
            </li>
          `,
      movie
    )
    this.movie = movie
    const commingMoviesContainer = document.querySelector(
      '.comming-movies'
    )! as HTMLElement
    this.addMovieTo(commingMoviesContainer)
  }
}
