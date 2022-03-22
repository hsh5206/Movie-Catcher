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
    location.replace('index.html')
  }
}