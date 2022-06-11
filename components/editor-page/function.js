import moment from "moment";
import { change, howManyDaysLeft } from "../../common/change";
import { GOOGLE_SHEET_URL } from "../../env/config"

const todayYear = moment().format('YYYY')
const todayMonth = moment().format('MM')
const todayDate = moment().format('DD')
const todayDay = moment().format('d')

export function addSubject(item, subject, setSubject) {
    let subjectIndex = subject.indexOf(item)
    if (subjectIndex <= -1) {
        setSubject(prop => [
            ...prop,
            item
        ])
    } else {
        setSubject(subject.filter((value) => {
            return value !== item
        }))
    }
}

export function addDoing(item, setDoing) {
    setDoing(item)
}

export function addBook(item, setBook) {
    setBook(item)
}

export function getTheFormatDate(setLogDate, date) {
    let DateDay = moment(date, "YYYY[-]MM[-]DD").format('d')
    let spendDay = moment(`${todayYear}-${todayMonth}-${todayDate}`).to(date)
    if (spendDay == 'a few seconds ago') {
        setLogDate('今天')
    } else if (spendDay == 'in a day') {
        setLogDate('明天')
    } else if (spendDay == 'in 2 days') {
        setLogDate('後天')
    } else if (spendDay == 'in 7 days') {
        setLogDate('下禮拜')
    } else {
        //put "in xx days" off
        spendDay = spendDay.replace('in', '')
        spendDay = spendDay.replace('days', '')
        spendDay = Number(spendDay)
        if (howManyDaysLeft(todayDay) + 6 > spendDay) {
            if (howManyDaysLeft(todayDay) <= spendDay) {
                setLogDate('下星期' + change(DateDay))
            } else {
                setLogDate('星期' + change(DateDay))
            }
        } else {
            setLogDate(date);
        }
    }
}

export async function sendDataToDataBase({
    clickStates,
    setClickStates,
    setAlert,
    subject,
    doing,
    book,
    logDate,
    pages,
    desView,
    password }) {

    if (!clickStates) return
    setClickStates(false)
    let fetchUrl = `${GOOGLE_SHEET_URL}?year=${todayYear}&month=${todayMonth}&datetoday=${todayDate}&day=${todayDay}&subject=${subject}&action=${doing}&book=${book}&date=${logDate}&pages=${pages}&des=${desView}&password=${password}&mode=select`
    let res = await fetch(fetchUrl)
    let status = await res.text()
    switch (status) {
        case 'ok':
            setAlert('OK')
            location.reload()
            break;
        case 'password error':
            setAlert('PASSWORD ERROR')
            break;
        case 'error':
            setAlert('ERROR')
            break;
        default:
            setAlert('ERROR')
            break;
    }
    window.alert('Please check the new message.')
    setClickStates(true)
}
