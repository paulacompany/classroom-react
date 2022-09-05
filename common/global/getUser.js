import { reactLocalStorage } from 'reactjs-localstorage';

export default function getUser(setEmail, setEmailPassword){

    let email = reactLocalStorage.get('email')
    let emailPassword = reactLocalStorage.get('password')

    if(setEmail) setEmail(email)
    if(setEmailPassword) setEmailPassword(emailPassword)

}