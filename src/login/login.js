import AuthService from '../service/auth_service';

export default class Login {
  constructor(){
    this.auth = new AuthService
    const login = document.querySelector('.login-button')
    login.addEventListener('click', (e) => {
    this.auth.login(e.currentTarget.textContent)
      .then(data => this.goToMain(data.user.uid));
  })
  }
  goToMain = (userId) => {
    sessionStorage.setItem('id',userId)
    const main = document.querySelector('.main')
    main.style.display = 'flex'
    const loginPage = document.querySelector('.login')
    loginPage.style.display = 'none'
  }
}