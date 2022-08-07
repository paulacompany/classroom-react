import React from "react"
import { GOOGLE_SHEET_URL } from "../../env/config.js"
import { useDispatch, useSelector } from "react-redux"
import LookPageReducer from "../../common/redux/reducer/LookPageReducer.js"


export default function LoadItem(){
    let dispatch = useDispatch()
    // index of the number pages 0 -> today
    let look = useSelector(state => state.look)
    let data = useSelector(state => state.data)
    let deleteState = useSelector(state => state.deleteState)
    let password = useSelector(state => state.password)
    
    async function change(mode, number) {
        
        let fetchUrl = (mode == 'UNDO') ? 
            `${GOOGLE_SHEET_URL}?mode=rep&rep=${number + 1}&password=${password}&repdate=${look}` :
            `${GOOGLE_SHEET_URL}?mode=del&del=${number + 1}&password=${password}&deldate=${look}`
        let res = await fetch(fetchUrl);
        let data = await res.text()
        switch (data) {
            case 'ok':
                dispatch(LookPageReducer.actions.setAlert('OK'))
                break;
            case 'password error':
                dispatch(LookPageReducer.actions.setAlert('PASSWORD ERROR'))
                break;
            default:
                dispatch(LookPageReducer.actions.setAlert('ERROR'))
                break;
        }
        dispatch(LookPageReducer.actions.setDeleteState(false))
    }
    return(
        data.map((item, i) => {
            let itemData = `${item.date}${item.action}` +
                `${item.subject}${item.book}` +
                `${item.pages}${item.des}`
    
            if (!deleteState) {
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
                                    change('DEL', i)
                                }}></i>
                        </li>
                    )
                } else {
                    return (
                        <li className="fs-4">{itemData}
                            <i className={'bi bi-check mx-3 bg-success text-white rounded'}
                                onClick={() => {
                                    change('UNDO', i)
                                }}></i>
                        </li>
                    )
                }
            }
        })
    )
}


    
    
    
