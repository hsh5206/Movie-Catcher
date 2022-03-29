import { Content, IContent } from './../content'

interface ITrailer extends IContent {
  makePage(): void
}

export default class Trailer extends Content implements ITrailer {
  private videos: any[] = []
  constructor(id: number) {
    super()
    this.tmdb
      .getMovieTrailers(id)
      .then((content) =>
        content.forEach((trail: any) => {
          this.videos.push([trail.name, trail.key])
        })
      )
      .then(() => this.makePage())
  }

  makePage = () => {
    let temp = '<div>'
    this.videos.map((video) => {
      temp += `
      <div>
        <div>${video[0]}</div>
        <iframe
          width="300"
          height="160"
          src="https://www.youtube.com/embed/${video[1]}"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    `
    })
    temp += '</div>'
    this.element = temp
    this.renderPage()
  }
}
