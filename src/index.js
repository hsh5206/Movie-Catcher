import '../style.css'
import { getFirestore} from 'firebase/firestore/lite';
import Login from './login/login';
import Logout from './login/logout';
import { firebaseApp } from './service/firebase';


const db = getFirestore(firebaseApp);

new Login
new Logout