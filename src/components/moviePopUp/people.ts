import { Content, IContent } from '../content'

interface IPeople extends IContent {
  makePage(): void
}

export default class People extends Content implements IPeople {
  private people: any[] = []
  constructor(id: number) {
    super()
    console.log(id)
    this.tmdb
      .getMovieCredits(id)
      .then((content) =>
        content.some((person: any) => {
          if (person.order > 10) return true
          this.people.push([person.name, person.profile_path])
        })
      )
      .then(() => this.makePage())
  }

  makePage = () => {
    let temp = '<ul class="people">'
    this.people.map((person) => {
      console.log(person[1])
      if (!person[1]) {
        temp += `
      <li>
        <img style="border-radius:50%" src="assets/images/defaultPerson.jpeg" width="100" height="100"/>
        <div class="people-name">${person[0]}</div>
      </li>
      `
      } else {
        temp += `
      <li>
        <img style="border-radius:50%" src="https://image.tmdb.org/t/p/w200${person[1]}" width="100" height="100"/>
        <div class="people-name">${person[0]}</div>
      </li>
      `
      }
    })
    temp += '</ul>'
    this.element = temp
    this.renderPage()
  }
}
