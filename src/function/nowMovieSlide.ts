export default class NowMovieSlide {
  private now_view: number = 0
  private interval: NodeJS.Timer
  private buttons: NodeListOf<HTMLInputElement>
  private now: HTMLElement
  private time: number = 5000
  constructor() {
    this.buttons = document.querySelectorAll(
      '.now-movies-button'
    )! as NodeListOf<HTMLInputElement>
    this.now = document.querySelector('.now-movies')! as HTMLElement
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons.item(i).addEventListener('click', () => {
        this.now.style.transform = `translate(-${i * 100}vw)`
        this.buttons.item(this.now_view).checked = false
        this.now_view = i
        this.buttons.item(this.now_view).checked = true
        clearInterval(this.interval)
        this.interval = setInterval(this.moveBanner, this.time)
      })
    }
    this.now.addEventListener('mouseover', () => clearInterval(this.interval))
    this.now.addEventListener(
      'mouseleave',
      () => (this.interval = setInterval(this.moveBanner, this.time))
    )
    this.interval = setInterval(this.moveBanner, this.time)
  }

  private moveBanner = () => {
    this.buttons.item(this.now_view).checked = false
    if (this.now_view !== 4) {
      this.now.style.transform = `translate(-${(this.now_view + 1) * 100}vw)`
      this.now_view += 1
    } else {
      this.now.style.transform = 'translate(-0vw)'
      this.now_view = 0
    }
    this.buttons.item(this.now_view).checked = true
  }
}
