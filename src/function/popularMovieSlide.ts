export default class PopularMovieSlide {
  private popular_view: number = 0
  private interval: NodeJS.Timer
  private buttons: NodeListOf<HTMLInputElement>
  private popular: HTMLElement
  private time: number = 5000
  constructor() {
    this.buttons = document.querySelectorAll(
      '.popular-movies-button'
    )! as NodeListOf<HTMLInputElement>
    this.popular = document.querySelector('.popular-movies')! as HTMLElement
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons.item(i).addEventListener('click', () => {
        this.popular.style.transform = `translate(-${i * 100}vw)`
        this.buttons.item(this.popular_view).checked = false
        this.popular_view = i
        this.buttons.item(this.popular_view).checked = true
        clearInterval(this.interval)
        this.interval = setInterval(this.moveBanner, this.time)
      })
    }
    this.popular.addEventListener('mouseover', () =>
      clearInterval(this.interval)
    )
    this.popular.addEventListener(
      'mouseleave',
      () => (this.interval = setInterval(this.moveBanner, this.time))
    )
    this.interval = setInterval(this.moveBanner, this.time)
  }

  private moveBanner = () => {
    this.buttons.item(this.popular_view).checked = false
    if (this.popular_view !== 4) {
      this.popular.style.transform = `translate(-${
        (this.popular_view + 1) * 100
      }vw)`
      this.popular_view += 1
    } else {
      this.popular.style.transform = 'translate(-0vw)'
      this.popular_view = 0
    }
    this.buttons.item(this.popular_view).checked = true
  }
}
