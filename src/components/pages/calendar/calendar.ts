import MakeCalendar from '../../../function/makeCalendar'

export default class Calendar extends MakeCalendar {
  constructor() {
    super()
    this.renderCalendar()
  }

  renderCalendar() {
    const calendar = document.querySelector(
      '.calendar-table-tbody'
    )! as HTMLElement
    calendar.innerHTML = this.element
  }
}
