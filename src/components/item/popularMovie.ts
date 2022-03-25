import { Movie } from '../movie'

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
                <div class="popular-movie-moreinfo">상세보기</div>
                <div class="popular-movie-trailer">트레일러</div>
              </div>
            </div>
            <div class="popular-movie-poster">
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="180" height="250"/>
            </div>
          </div>
          `
    )

    this.addMovieTo(nowMoviesContainer)
  }
}
