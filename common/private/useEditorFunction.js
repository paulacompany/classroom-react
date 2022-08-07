import moment from "moment";
import { change, howManyDaysLeft } from "../global/change.js";
import { GOOGLE_SHEET_URL } from "../../env/config.js"
import { useDispatch, useSelector } from "react-redux"
import EditorPageReducer from "../redux/reducer/EditorPageReducer.js"

const todayYear = moment().format('YYYY')
const todayMonth = moment().format('MM')
const todayDate = moment().format('DD')
const todayDay = moment().format('d')


export default function useEditorFunction() {

    let dispatch = useDispatch()

    let subject = useSelector(state => state.editor.subject)
    let clickStates = useSelector(state => state.editor.clickStates)
    let doing = useSelector(state => state.editor.doing)
    let book = useSelector(state => state.editor.book)
    let date = useSelector(state => state.editor.date)
    let pages = useSelector(state => state.editor.pages)
    let des = useSelector(state => state.editor.des)
    let password = useSelector(state => state.editor.password)

    class FunctionEditor {
        constructor(page) {
            this.page = page
        }
        addSubject(item) {
            let subjectIndex = subject.indexOf(item)
            // if the item does't in the array, then add it into
            // if it does, delete it
            // it will return -1 if the data doesn't in the array
            if (subjectIndex <= -1) {
                dispatch(EditorPageReducer.actions.subject([...subject, item]))
            } else {
                let reloadArray = subject.filter(value => value !== item)
                dispatch(EditorPageReducer.actions.subject(reloadArray))
            }
        }
        addDoing(item) {
            dispatch(EditorPageReducer.actions.doing(item))
        }
        addBook(item) {
            dispatch(EditorPageReducer.actions.book(item))
        }
        addDate(date) {
            let DateDay = moment(date, "YYYY[-]MM[-]DD").format('d')
            let spendDay = moment(`${todayYear}-${todayMonth}-${todayDate}`).to(date)
            if (spendDay == 'a few seconds ago') {
                dispatch(EditorPageReducer.actions.date('今天'))
            } else if (spendDay == 'in a day') {
                dispatch(EditorPageReducer.actions.date('明天'))
            } else if (spendDay == 'in 2 days') {
                dispatch(EditorPageReducer.actions.date('後天'))
            } else if (spendDay == 'in 7 days') {
                dispatch(EditorPageReducer.actions.date('下禮拜'))
            } else {
                //put "in xx days" off
                spendDay = spendDay.replace('in', '')
                spendDay = spendDay.replace('days', '')
                spendDay = Number(spendDay)
                if (howManyDaysLeft(todayDay) + 6 > spendDay) {
                    if (howManyDaysLeft(todayDay) <= spendDay) {
                        dispatch(EditorPageReducer.actions.date('下星期' + change(DateDay)))
                    } else {
                        dispatch(EditorPageReducer.actions.date('星期' + change(DateDay)))
                    }
                } else {
                    dispatch(EditorPageReducer.actions.date(date))
                }
            }
        }
        addPages(item) {
            dispatch(EditorPageReducer.actions.pages(item))
        }
        addDes(item) {
            let reloadItem = item ? `(${item})` : item
            dispatch(EditorPageReducer.actions.des(reloadItem))
        }
        addPassword(password) {
            dispatch(EditorPageReducer.actions.password(password))
        }
        async sendDataBase() {
            if (!clickStates) return
            dispatch(EditorPageReducer.actions.clickStates(false))
            let fetchUrl = `${GOOGLE_SHEET_URL}?year=${todayYear}&month=${todayMonth}&datetoday=${todayDate}&day=${todayDay}&subject=${subject}&action=${doing}&book=${book}&date=${date}&pages=${encodeURI(pages)}&des=${encodeURI(des)}&password=${encodeURI(password)}&mode=select`
            let res = await fetch(fetchUrl)
            let status = await res.text()
            switch (status) {
                case 'ok':
                    dispatch(EditorPageReducer.actions.alert('OK'))
                    location.reload()
                    break;
                case 'password error':
                    dispatch(EditorPageReducer.actions.alert('PASSWORD ERROR'))
                    break;
                case 'error':
                    dispatch(EditorPageReducer.actions.alert('ERROR'))
                    break;
                default:
                    dispatch(EditorPageReducer.actions.alert('ERROR'))
                    break;
            }
            dispatch(EditorPageReducer.actions.clickStates(true))
        }
    }
    return FunctionEditor
}