export default class MakeCalendar {
  protected year: number
  protected month: number
  protected day: number
  protected element: string

  constructor() {
    this.element = ''
    this.year = new Date().getFullYear()
    this.month = new Date().getMonth() + 1
    this.day = new Date().getDate()

    const now = document.querySelector('.calendar-now')! as HTMLElement
    now.innerHTML = String(this.year) + '년 ' + String(this.month) + '월'

    this.changeYearMonth(this.year, this.month)
  }

  checkLeapYear(year: number) {
    if (year % 400 == 0) {
      return true
    } else if (year % 100 == 0) {
      return false
    } else if (year % 4 == 0) {
      return true
    } else {
      return false
    }
  }

  getFirstDayOfWeek(year: number, month: number) {
    return new Date(year + '-' + month + '-01').getDay()
  }

  changeYearMonth(year: number, month: number) {
    let month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month == 2) {
      if (this.checkLeapYear(year)) month_day[1] = 29
    }

    let first_day_of_week = this.getFirstDayOfWeek(year, month)
    let arr_calendar = []
    for (let i = 0; i < first_day_of_week; i++) {
      arr_calendar.push('')
    }

    for (let i = 1; i <= month_day[month - 1]; i++) {
      arr_calendar.push(String(i))
    }

    let remain_day = 7 - (arr_calendar.length % 7)
    if (remain_day < 7) {
      for (let i = 0; i < remain_day; i++) {
        arr_calendar.push('')
      }
    }

    this.makeElement(arr_calendar, year, month)
  }

  makeElement = (data: string[], year: number, month: number) => {
    let h = []
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        h.push('<tr>')
      } else if (i % 7 == 0) {
        h.push('</tr>')
        h.push('<tr>')
      }
      if (data[i] === '') {
        h.push(`<td></td>`)
      } else {
        h.push(`<td class="calendar-day"><span>${data[i]}</sapn></td>`)
      }
    }
    h.push('</tr>')
    this.element = h.join('')
  }
}
