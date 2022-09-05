import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_SHEET_URL } from "../env/config"
import { reactLocalStorage } from "reactjs-localstorage";
import CheckLoad from "../components/CheckLoad";
import Bottom from "../components/look-page/Button";
import LoadItem from "../components/look-page/LoadItem";
import Title from "../components/look-page/Title.jsx";
import LookPageReducer from "../common/redux/reducer/LookPageReducer.js";
import Alert from "../components/Alert";

export default function Look() {
    let dispatch = useDispatch()
    let look = useSelector(state => state.look.look)
    let loadState = useSelector(state => state.look.loadState)
    let alert = useSelector(state => state.look.alert)
    let type = useSelector(state => state.look.type)

    useEffect(() => {
        let localPassword = reactLocalStorage.get('classPassword')
        let localType = reactLocalStorage.get('type')
        dispatch(LookPageReducer.actions.setPassword(localPassword))
        dispatch(LookPageReducer.actions.setType(localType))
    }, [])

    useEffect(() => {
        async function getData() {
            let fetchURL = `${GOOGLE_SHEET_URL}?number=${look}&mode=look&type=${type}`
            let res = await fetch(fetchURL)
            let data = await res.json()
            if(data.status == 200){
                dispatch(LookPageReducer.actions.setData(data))
            }else if(data.status == 403){
                dispatch(LookPageReducer.actions.setAlert('PASSWORD ERROR'))
            }else{
                dispatch(LookPageReducer.actions.setAlert('ERROR'))
            }
            
            dispatch(LookPageReducer.actions.setLoadState(true))
        }
        if(!type) return
        getData()
    }, [look, type])

    function clearAlert(value){
        dispatch(LookPageReducer.actions.alert(value))
    }

    return (
        <div className="lookContainer container d-flex flex-column justify-content-between h-100">
            <div>
                <div className="m-5 mx-0">
                    <Alert alert={alert} setAlert={clearAlert} />
                    <CheckLoad loadState={loadState} />
                </div>
                <div className="fs-2 m-4">
                    <Title />
                </div>
                <ul className="item m-4">
                    <LoadItem />
                </ul>
            </div>
            <Bottom />
        </div>
    )

}
