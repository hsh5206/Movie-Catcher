import MakeCalendar from '../../../function/makeCalendar'

export default class Calendar extends MakeCalendar {
  constructor() {
    super()
    this.renderCalendar()
    console.log(this.element)
  }

  renderCalendar() {
    const calendar = document.querySelector(
      '.calendar-table-tbody'
    )! as HTMLElement
    calendar.innerHTML = this.element
  }
}
