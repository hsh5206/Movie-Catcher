import { Movie } from './movie'

export class PopularMovie extends Movie<HTMLElement> {
  constructor(movie: any) {
    const popularMoviesContainer = document.querySelector(
      '.popular-movies'
    )! as HTMLElement
    console.log(movie)
    super(`
            <li>
              <div class="movie-container">
                <div class="movie-title-container">
                  <div class="movie-rank">${movie.rank}</div>
                  <div class="movie-title"> ${movie.title}</div>
                </div>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="150" height="180"/>
              </div>
            </li>
          `)
    this.addMovieTo(popularMoviesContainer)
  }
}
