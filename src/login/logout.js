import AuthService from '../service/auth_service';

export default class Logout {
  constructor(){
    this.auth = new AuthService
    const logout = document.querySelector('.logout-button')
    logout.addEventListener('click', () => {
    this.auth.logout()
    this.goToMain()
  })
  }
  goToMain = () => {
    sessionStorage.removeItem('id')
    const main = document.querySelector('.main')
    main.style.display = 'none'
    const loginPage = document.querySelector('.login')
    loginPage.style.display = 'flex'
  }
}