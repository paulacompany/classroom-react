import GOOGLE_SHEET_URL from "../../env/config";
import { reactLocalStorage } from 'reactjs-localstorage';

function rep(setRep, number, date) {
    console.log(GOOGLE_SHEET_URL, Number(number) + 1, reactLocalStorage.get('password'), date);
    fetch(`${GOOGLE_SHEET_URL}?mode=rep&rep=${Number(number) + 1}&password=${reactLocalStorage.get('password')}&repdate=${date}`).then(res => {
        return res.text()
    }).then(data => {
        if (data == 'ok') {
            setRep('ok')
        } else if (data == 'password error') {
            setRep('password error')
        } else {
            setRep('wrong')
        }
        setTimeout(()=>{
            setRep('')
        }, 2000)
    })
}
    

export default rep