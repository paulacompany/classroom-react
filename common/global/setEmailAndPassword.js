import { reactLocalStorage } from 'reactjs-localstorage';

export default function setEmailAndPassword(email, emailPassword) {
    
    if(email !== false) reactLocalStorage.set('email', email)
    if(emailPassword !== false) reactLocalStorage.set('password', emailPassword)

}