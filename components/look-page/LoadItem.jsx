import React from "react"
import { GOOGLE_SHEET_URL } from "../../env/config.js"
import { useDispatch, useSelector } from "react-redux"
import LookPageReducer from "../../common/redux/reducer/LookPageReducer.js"


export default function LoadItem() {
    let dispatch = useDispatch()
    let data = useSelector(state => state.look.data)
    let deleteState = useSelector(state => state.look.deleteState)
    let password = useSelector(state => state.look.password)
    let type = useSelector(state => state.look.type)

    async function change(uuid) {
        let res = await fetch(`${GOOGLE_SHEET_URL}?mode=state&type=${type}&password=${password}&uuid=${uuid}`)
        let status = await res.json()
        switch (status.status) {
            case 403:
                dispatch(LookPageReducer.actions.setAlert('PASSWORD ERROR'))
                break;
            case 200:
                dispatch(LookPageReducer.actions.setAlert('OK'))
                handleChangeTheUiState(uuid)
                break;
            default:
                dispatch(LookPageReducer.actions.setAlert('ERROR'))
                break;
        }
    }

    function handleChangeTheUiState(uuid){
        let indexOfData = data.data.findIndex(item => item.uuid == uuid)
        dispatch(LookPageReducer.actions.setData({
            change: true,
            index: indexOfData
        }))
    }



    if(data.data) return data.data.map((item, i) => {
        if (!deleteState) {
            if (!item.status) return
            return (
                <li className="fs-4">{item.data}</li>
            )
        } else {
            if (item.status) {
                return (
                    <li className="fs-4">{item.data}
                        <i className={'bi bi-x-circle-fill mx-3 text-danger'}
                            onClick={() => {
                                change(item.uuid)
                            }}></i>
                    </li>
                )
            } else {
                return (
                    <li className="fs-4">{item.data}
                        <i className={'bi bi-check mx-3 bg-success text-white rounded'}
                            onClick={() => {
                                change(item.uuid)
                            }}></i>
                    </li>
                )
            }
        }
    })
}





