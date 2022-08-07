import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_SHEET_URL } from "../env/config"
import { reactLocalStorage } from "reactjs-localstorage";
import Checkload from "../components/Checkload";
import Bottom from "../components/look-page/Button.jsx";
import LoadItem from "../components/look-page/LoadItem";
import Title from "../components/look-page/Title";
import LookPageReducer from "../common/redux/reducer/LookPageReducer.js";

export default function Look() {
    let dispatch = useDispatch()

    let deleteState = useSelector(state => state.deleteState)
    let look = useSelector(state => state.look)
    let loadState = useSelector(state => state.loadState)

    useEffect(() => {
        let password = reactLocalStorage.get('password')
        dispatch(LookPageReducer.actions.setPassword(password))
    }, [])

    useEffect(() => {
        async function getData() {
            let fetchURL = `${GOOGLE_SHEET_URL}?look=${look}&mode=look`
            let res = await fetch(fetchURL)
            let data = await res.json()
            dispatch(LookPageReducer.actions.setData(data))
            dispatch(LookPageReducer.actions.setLoadState(true))
        }
        getData()
    }, [look, deleteState])

    return (
        <div className="lookContainer container d-flex flex-column justify-content-between h-100">
            <div>
                <div className="m-5">
                    <Checkload loadState={loadState} />
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
