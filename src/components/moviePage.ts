import TMDB from '../service/tmdb_api'

export default class MoviePage<T extends HTMLElement> {
  private element: T | undefined
  private movie: any
  constructor(movie_id: any) {
    const tmdb = new TMDB(process.env.TMDB_API_KEY)
    const moreInfo = tmdb.getMoreMovieInfo(movie_id)
    moreInfo
      .then((movie) => {
        this.movie = { ...movie }
      })
      .then(() => this.addPage())
  }

  private addPage = () => {
    const template = document.createElement('template')
    template.innerHTML = `
    <div class="popup-movie-container">
      <div class="back">X</div>
      <div class="header-img">
        <div class="movie-info">
          <img class="movie-poster" src="https://image.tmdb.org/t/p/w200${this.movie.poster_path}" width="180" height="250"/>
          <div class="movie-main">
            <div class="movie-title">${this.movie.title}</div>
            <div class="movie-tagline">"${this.movie.tagline}"</div>
            <div class="movie-release">${this.movie.release_date}</div>
            <div class="movie-vote">${this.movie.vote_average} / 10</div>
            <div class="movie-runtime">${this.movie.runtime}분</div>
            <div class="movie-genres"></div>
            <div class="movie-genres">${this.movie.production_countries[0].name}</div>
          </div>
      </div>
        <nav class="movie-nav">
          <ul class="movie-nav-ul">
            <li>줄거리</li>
            <li>트레일러</li>
            <li>출연진</li>
            <li>비슷한 컨텐츠</li>
          </ul>
        </nav>
        <div class="movie-overview">${this.movie.overview}</div>
      </div>
    </div>`
    this.element = template.content.firstElementChild! as T
    const parent = document.querySelector('.movie-page')! as HTMLElement
    this.renderMovie(parent)
    const button = document.querySelector('.back')! as HTMLButtonElement
    button.addEventListener('click', () => {
      this.removeMovie(parent)
    })
    const headerImg = document.querySelector('.header-img')! as HTMLElement
    headerImg.style.backgroundImage = `url(https://image.tmdb.org/t/p/w200${this.movie.backdrop_path})`
    const genres = document.querySelector('.movie-genres')! as HTMLElement
    let temp: string[] = []
    this.movie.genres.forEach((element: any) => {
      temp.push(element.name)
    })
    genres.innerText = temp.join(' | ')
  }

  private renderMovie(parent: HTMLElement) {
    var winY = window.pageYOffset
    const moviePopup = document.querySelector('.movie-popup')! as HTMLElement
    moviePopup.style.top = `${winY}px`
    parent.appendChild(this.element! as T)
  }

  private removeMovie = (parent: HTMLElement) => {
    parent.removeChild(this.element! as T)
    const moviePopup = document.querySelector('.movie-popup')! as HTMLElement
    moviePopup.style.display = 'none'
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'scroll'
  }
}
