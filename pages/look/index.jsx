import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_SHEET_URL } from "../../env/config"
import { reactLocalStorage } from "reactjs-localstorage";
import CheckLoad from "../../components/CheckLoad";
import Bottom from "../../components/look-page/Button";
import LoadItem from "../../components/look-page/LoadItem";
import Title from "../../components/look-page/Title.jsx";
import LookPageReducer from "../../common/redux/reducer/LookPageReducer.js";
import Alert from "../../components/Alert";
import { useRef } from "react";
import Link from "next/link";

export default function Look() {
    let dispatch = useDispatch()
    let look = useSelector(state => state.look.look)
    let loadState = useSelector(state => state.look.loadState)
    let alert = useSelector(state => state.look.alert)
    let type = useSelector(state => state.look.type)
    let firstTime = useRef(true)

    useEffect(() => {
        let hash = location.hash.substring(1);
        let localPassword = reactLocalStorage.get('classPassword')
        let localType = reactLocalStorage.get('type')
        if (hash != '') {
            dispatch(LookPageReducer.actions.setType(hash))
            dispatch(LookPageReducer.actions.setPassword(localPassword))
            return
        } else {
            if (!localType) {
                location.href = '/look/setting'
                return
            } else {
                location.href += '#' + localType
                location.reload();
            }
        }

    }, [])

    useEffect(() => {
        async function getData() {
            if (firstTime.current) {
                firstTime.current = false
                return
            }
            if (!type) {
                location.href = '/look/setting'
                return
            }
            let fetchURL = `${GOOGLE_SHEET_URL}?number=${look}&mode=look&type=${type}`
            let res = await fetch(fetchURL)
            let data = await res.json()
            console.log(data);
            if (data.status == 200) {
                dispatch(LookPageReducer.actions.setData(data))
            } else {
                dispatch(LookPageReducer.actions.setAlert('ERROR'))
                location.href = '/look/setting'
                return
            }

            dispatch(LookPageReducer.actions.setLoadState(true))
        }
        getData();
    }, [look, type])

    function clearAlert(value) {
        dispatch(LookPageReducer.actions.setAlert(value))
    }

    return (
        <div className="lookContainer container d-flex flex-column justify-content-between h-100">
            <div>
                <div className="m-5 mx-0">
                    <Alert alert={alert} setAlert={clearAlert} />
                    <Link href="/look/setting">
                        <a className="h6">setting {'>'}</a>
                    </Link>
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
