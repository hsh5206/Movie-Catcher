export default class MoviePage<T extends HTMLElement> {
  private element: T
  private movie: any
  constructor(movie: any) {
    this.movie = movie
    const template = document.createElement('template')
    template.innerHTML = `
    <div class="popup-movie-container">
      <div class="back">X</div>
      <div class="header-img">
        <div class="movie-info">
          <img class="movie-poster" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" width="180" height="250"/>
          <div class="movie-main">
            <div class="movie-title">${this.movie.title}</div>
            <div class="movie-release">${this.movie.release_date}</div>
            <div class="movie-vote">${this.movie.vote_average} / 10</div>
          </div>
      </div>
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
    headerImg.style.backgroundImage = `url(https://image.tmdb.org/t/p/w200${movie.backdrop_path})`
  }

  private renderMovie(parent: HTMLElement) {
    var winY = window.pageYOffset
    console.log(winY)
    const moviePopup = document.querySelector('.movie-popup')! as HTMLElement
    moviePopup.style.top = `${winY}px`
    parent.appendChild(this.element)
  }

  private removeMovie(parent: HTMLElement) {
    parent.removeChild(this.element)
    const moviePopup = document.querySelector('.movie-popup')! as HTMLElement
    moviePopup.style.display = 'none'
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'scroll'
  }
}
