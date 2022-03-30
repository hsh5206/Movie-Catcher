import { Movie } from '../movie'
import MoviePage from '../moviePage'

export class PopularMovie extends Movie<HTMLElement> {
  constructor(movie: any) {
    const nowMoviesContainer = document.querySelector(
      '.popular-movies'
    )! as HTMLElement
    super(
      `
          <div class="popular-movie-container">
            <div class="popular-movie-info">
              <div class="popular-movie-header">
                <div class="popular-movie-title"> ${movie.title} </div>
                <div class="popular-movie-dv">
                  <div class="popular-movie-date"> 출시 : ${movie.release_date} </div>
                  <div class="popular-movie-vote"> 평점 : ${movie.vote_average} / 10</div>
                </div>
              </div>
              <div class="popular-movie-overview"> ${movie.overview} </div>
              <div class="popular-movie-info-buttons">
                <div id="${movie.id}" class="popular-movie-moreinfo">상세보기</div>
              </div>
            </div>
            <div class="popular-movie-poster">
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="180" height="250"/>
            </div>
          </div>
          `
    )

    this.addMovieTo(nowMoviesContainer)
    const button = document.getElementById(`${movie.id}`)! as HTMLElement
    button.addEventListener('click', () => {
      const body = document.querySelector('body')! as HTMLElement
      body.style.overflow = 'hidden'
      const moviePage = document.querySelector('.movie-popup')! as HTMLElement
      moviePage.style.display = 'flex'
      new MoviePage(button.id)
    })
  }
}
