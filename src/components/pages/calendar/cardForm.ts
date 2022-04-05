import DB from '../../../service/db'

export default class CardForm {
  private movie: any
  private element: any
  constructor(info: any) {
    const template = document.createElement('template')
    this.movie = info
    let query = ''
    query += `
    <div class="card-container">
      <div class="card-content">
        <div class="card-back-drop">
          <div class="card-back">X</div>
          <div class="card-info-header"/>
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
              <div class="card-add-btn">추가하기</div>
            </div>
            <textarea class="card-thinking"></textarea>
          </div>
        </div>
      </div>
    </div>
    `

    template.innerHTML = query
    this.element = template.content.firstElementChild

    const parent = document.querySelector('.card-page')! as HTMLElement
    this.renderMovie(parent)

    const button = document.querySelector('.card-back')! as HTMLButtonElement
    button.addEventListener('click', () => {
      this.removeMovie(parent)
    })

    const addBtn = document.querySelector('.card-add-btn')! as HTMLElement
    addBtn.addEventListener('click', () => {
      const cardDate = document.querySelector('.card-date')! as HTMLInputElement
      const cardThinking = document.querySelector(
        '.card-thinking'
      )! as HTMLTextAreaElement
      if (!cardDate.value || !cardThinking.value) {
        window.alert('정보를 모두 입력해주세요')
      } else {
        const db = new DB()
        db.addCard(this.movie.id, cardDate.value, cardThinking.value)
      }

      alert('추가 완료')
      location.reload()
    })

    const headerImg = document.querySelector('.card-container')! as HTMLElement
    headerImg.style.backgroundImage = !this.movie.poster_path
      ? `url(./assets/images/defaultPoster.jpeg)`
      : `url(https://image.tmdb.org/t/p/w200${this.movie.poster_path})`
    const genres = document.querySelector('.card-movie-genres')! as HTMLElement
    let temp: string[] = []
    this.movie.genres.forEach((element: any) => {
      temp.push(element.name)
    })
    genres.innerText = temp.join(' | ')
  }

  private renderMovie = (parent: HTMLElement) => {
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'hidden'
    var winY = window.pageYOffset
    const moviePopup = document.querySelector('.card')! as HTMLElement
    moviePopup.style.top = `${winY}px`
    parent.appendChild(this.element)
  }

  private removeMovie = (parent: HTMLElement) => {
    parent.removeChild(this.element)
    const moviePopup = document.querySelector('.card')! as HTMLElement
    moviePopup.style.display = 'none'
    const body = document.querySelector('body')! as HTMLElement
    body.style.overflow = 'scroll'
  }
}
