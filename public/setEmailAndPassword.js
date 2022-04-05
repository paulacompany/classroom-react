import { reactLocalStorage } from 'reactjs-localstorage';

export default function setEmailAndPassword(email, emailPassword, profile) {
    
    
    if(email) reactLocalStorage.set('email', email)
    if(emailPassword) reactLocalStorage.set('emailpassword', emailPassword)
    if(profile) reactLocalStorage.set('profile', profile)

}