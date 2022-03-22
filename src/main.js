import '../style/main.css'
import Logout from './login/logout';
import { getFirestore} from 'firebase/firestore/lite';
import { firebaseApp } from './service/firebase';

const db = getFirestore(firebaseApp);

new Logout