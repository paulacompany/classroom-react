import { reactLocalStorage } from 'reactjs-localstorage';

export default function setEmailAndPassword(email, emailPassword, profile) {
    
    if(email !== false) reactLocalStorage.set('email', email)
    if(emailPassword !== false) reactLocalStorage.set('emailpassword', emailPassword)
    if(profile !== false) reactLocalStorage.set('profile', profile)

}