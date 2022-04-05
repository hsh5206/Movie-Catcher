import MakeCalendar from '../../../function/makeCalendar'
import DB from '../../../service/db'
import TMDB from '../../../service/tmdb_api'
import Card from './card'

export default class Calendar extends MakeCalendar {
  private db: DB
  private tmdb: TMDB
  constructor(db: DB, tmdb: TMDB) {
    super()
    this.tmdb = tmdb
    this.db = db
    this.renderCalendar()
  }

  renderCalendar = () => {
    const calendar = document.querySelector(
      '.calendar-table-tbody'
    )! as HTMLElement
    calendar.innerHTML = this.element

    this.addEvent()
    this.addMovie()
  }

  addEvent = () => {
    const days = document.querySelectorAll('.calendar-day')
    for (let i = 0; i < days.length; i++) {
      days[i].addEventListener('click', () => {
        const day = days[i].firstElementChild?.innerHTML
        const date =
          String(this.year) +
          '-' +
          (String(this.month).length == 2
            ? String(this.month)
            : '0' + String(this.month)) +
          '-' +
          (String(day).length == 2 ? String(day) : '0' + String(day))
        new Card(
          this.db,
          this.tmdb,
          days[i].lastElementChild?.childNodes! as NodeListOf<HTMLElement>,
          date
        )
      })
    }
  }

  addMovie = () => {
    const days = document.querySelectorAll('.calendar-day')
    for (let i = 0; i < days.length; i++) {
      const day = days[i].firstElementChild?.innerHTML
      const date =
        String(this.year) +
        '-' +
        (String(this.month).length == 2
          ? String(this.month)
          : '0' + String(this.month)) +
        '-' +
        day
      this.db.renderCardToCalendar(date, (result: any) => {
        const template = document.createElement('template')
        Object.keys(result).map((key) => {
          this.tmdb
            .getMoreMovieInfo(key)
            .then((movieInfo) => {
              template.innerHTML = `<div> <img class="calendar-day-poster" id="${movieInfo.id}" src="https://image.tmdb.org/t/p/w200${movieInfo.poster_path}" width="20px" height="30px"/> </div>`
            })
            .then(() => {
              const element = template.content.firstElementChild! as HTMLElement
              const parent = days[i].lastElementChild! as HTMLElement
              parent.insertAdjacentElement('beforeend', element)
            })
        })
      })
    }
  }
}
