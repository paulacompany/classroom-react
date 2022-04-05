import { reactLocalStorage } from 'reactjs-localstorage';

export default function setEmailAndPassword(email, emailPassword) {
    reactLocalStorage.set('email', email)
    reactLocalStorage.set('emailpassword', emailPassword)

}