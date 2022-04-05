import DB from '../../../service/db'
import TMDB from '../../../service/tmdb_api'

export default class Card {
  private tmdb: TMDB
  movie: any
  element: any
  date: string
  db: DB
  parent: HTMLElement
  leng: number
  constructor(db: DB, tmdb: TMDB, list: NodeListOf<HTMLElement>, date: string) {
    this.db = db
    this.tmdb = tmdb
    this.date = date
    this.leng = list.length
    const template = document.createElement('template')
    let query = `
      <div class="card-list">
        <div class="card-back">X</div>
        <div class="card-slide-container">
          <div class="left"><</div>
          <div class="card-slide"></div>
          <div class="right">></div>
        </div>
      </div>`
    template.innerHTML = query
    const cardList = template.content.firstElementChild! as HTMLElement
    const page = document.querySelector('.card-page')! as HTMLElement
    page.appendChild(cardList)
    this.parent = document.querySelector('.card-slide')! as HTMLElement
    if (this.leng != 1) {
      this.parent.style.width = `${this.leng * 60}vw`
    }

    const button = document.querySelector('.card-back')! as HTMLButtonElement
    button.addEventListener('click', () => {
      this.removeMovie(cardList)
    })
    button.style.zIndex = '4'
    button.style.color = 'red'

    if (this.leng == 1) {
      const left = document.querySelector('.left')! as HTMLElement
      const right = document.querySelector('.right')! as HTMLElement
      left.style.visibility = 'hidden'
      right.style.visibility = 'hidden'
    }

    list.forEach((div) => {
      const id = div.firstElementChild?.id
      if (id) {
        this.tmdb
          .getMoreMovieInfo(id)
          .then((result) => {
            this.movie = { ...result }
          })
          .then(() => {
            this.makeCard()
          })
      }
    })
  }

  makeCard = () => {
    const template = document.createElement('template')
    let query = `
    <div class="card-element">
      <div class="card-content">
        <div class="card-back-drop">
          <div class="card-info-header">
            <div class="card-movie-info">
              <div class="card-movie-title">${this.movie.title}</div>
              <div class="card-movie-tagline">"${this.movie.tagline}"</div>
              <div class="card-movie-release">${this.movie.release_date}</div>
              <div class="card-movie-vote">${this.movie.vote_average} / 10</div>
              <div class="card-movie-runtime">${this.movie.runtime}분</div>
              <div class="card-movie-genres"></div>
              <div class="card-movie-country">${this.movie.production_countries[0]?.name}</div>
            </div>
          </div>
          <div class="card-add-form">
            <div class="card-add-container">
              <input class="card-date" type="date" name="startday">
              <div class="card-add-btn">수정하기</div>
            </div>
            <textarea class="card-thinking"></textarea>
          </div>
        </div>
      </div>
    </div>
    `

    template.innerHTML = query
    this.element = template.content.firstElementChild! as HTMLElement
    this.renderMovie(this.parent)

    this.element.style.backgroundImage = !this.movie.poster_path
      ? `url(./assets/images/defaultPoster.jpeg)`
      : `url(https://image.tmdb.org/t/p/w200${this.movie.poster_path})`
    const genres = this.element.querySelector(
      '.card-movie-genres'
    )! as HTMLElement
    let temp: string[] = []
    this.movie.genres.forEach((element: any) => {
      temp.push(element.name)
    })
    genres.innerText = temp.join(' | ')

    this.getCardInfo()
  }

  getCardInfo = () => {
    console.log(this.date)
    this.db.syncCards(this.movie.id, this.date, (x: any) => {
      const date = this.element.querySelector('.card-date')! as HTMLInputElement
      date.value = this.date
      const opinion = this.element.querySelector(
        '.card-thinking'
      )! as HTMLTextAreaElement
      opinion.innerHTML = x.data
      console.log(x)
    })
  }

  private renderMovie = (parent: HTMLElement) => {
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'hidden'
    var winY = window.pageYOffset
    const moviePopup = document.querySelector('.card')! as HTMLElement
    moviePopup.style.display = 'flex'
    moviePopup.style.top = `${winY}px`
    parent.appendChild(this.element)
  }

  private removeMovie = (element: HTMLElement) => {
    const page = document.querySelector('.card-page')! as HTMLElement
    page.removeChild(element)
    const moviePopup = document.querySelector('.card')! as HTMLElement
    moviePopup.style.display = 'none'
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'scroll'
  }
}
