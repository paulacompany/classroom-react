import { change } from "../../public/change";
import { GOOGLE_SHEET_URL } from "../../env/config.js";

export function getTitle(item) {
    if (!item) return ''
    return (
        `${item.year}年${item.month}月${item.dateToday}日 星期${change(item.day)}`
    )
}



export function loadItem(setAlert, data, isDel, setIsDel, look, password) {
    async function del(setAlert, number, date) {
        let fetchUrl = `
            ${GOOGLE_SHEET_URL}?mode=del&del=${number + 1}
            &password=${password}&deldate=${date}`

        let res = await fetch(fetchUrl);
        let data = await res.text()
        switch (data) {
            case 'ok':
                setAlert('OK')
                break;
            case 'password error':
                setAlert('PASSWORD ERROR')
                break;
            case 'wrong':
                setAlert('ERROR')
                break;
            default:
                setAlert('ERROR')
                break;
        }
        setIsDel(false)
    }
    async function rep(setAlert, number, date) {
        let fetchUrl = `
            ${GOOGLE_SHEET_URL}?mode=rep&rep=${number + 1}
            &password=${password}&repdate=${date}
            `
        let res = await fetch(fetchUrl);
        let data = await res.text()
        switch (data) {
            case 'ok':
                setAlert('OK')
                break;
            case 'password error':
                setAlert('PASSWORD ERROR')
                break;
            case 'wrong':
                setAlert('ERROR')
                break;
            default:
                setAlert('ERROR')
                break;
        }
        setIsDel(false)
    }
    return data.map((item, i) => {
        let itemData = `${item.date}${item.action}` +
            `${item.subject}${item.book}`+
            `${item.pages}${item.des}`

        if (!isDel) {
            if (item.del === 'Del') return
            return (
                <li className="fs-4">{itemData}</li>
            )
        } else {
            if (item.del !== 'Del') {
                return (
                    <li className="fs-4">{itemData}
                        <i className={'bi bi-x-circle-fill mx-3 text-danger'}
                            onClick={() => {
                                del(setAlert, i, look)
                            }}></i>
                    </li>
                )
            } else {
                return (
                    <li className="fs-4">{itemData}
                        <i className={'bi bi-check mx-3 bg-success text-white rounded'}
                            onClick={() => {
                                rep(setAlert, i, look);
                            }}></i>
                    </li>
                )
            }
        }
    })
}