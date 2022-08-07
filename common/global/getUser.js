import { reactLocalStorage } from 'reactjs-localstorage';

export default function getUser(setEmail, setEmailPassword, setProfile){

    let email = reactLocalStorage.get('email')
    let emailPassword = reactLocalStorage.get('emailpassword')
    let profile = reactLocalStorage.get('profile')

    if(setEmail) setEmail(email)
    if(setEmailPassword) setEmailPassword(emailPassword)
    if(setProfile) setProfile(profile)

}