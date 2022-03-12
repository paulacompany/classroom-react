import GOOGLE_SHEET_URL from "../../env/config";
import { reactLocalStorage } from 'reactjs-localstorage';

function del(setDel, number) {
    fetch(`${GOOGLE_SHEET_URL}?mode=del&del=${Number(number) + 1}&password=${reactLocalStorage.get('password')}`).then(res => {
        return res.text()
    }).then(data => {
        if (data == 'ok') {
            setDel('ok')
        } else if (data == 'password error') {
            setDel('password error')
        } else {
            setDel('wrong')
        }
        setTimeout(()=>{
            setDel('')
        }, 2000)
    })
}
    

export default del