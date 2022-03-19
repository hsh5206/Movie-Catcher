import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

class AuthService {
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleProvider = new GoogleAuthProvider()
  }

  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  onAuthChange(onuserChanged) {
    this.firebaseAuth.onAuthStateChanged((user)=>{
      onuserChanged(user);
    })
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider
      default:
        throw new Error('not supported')
    }
  }
}

export default AuthService