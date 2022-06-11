import React, { useState, useEffect } from "react"
import { GOOGLE_SHEET_URL } from "../env/config"
import { getTitle, loadItem } from "../components/look-page/function.js"
import { alertCallback } from "../common/alertCallback.js";
import { reactLocalStorage } from "reactjs-localstorage";
import Ckeckload from "../components/Checkload";
import Bottom from "../components/look-page/Button.jsx";

export default function Look() {

    let [password, setPassword] = useState('')
    let [look, setLook] = useState(0);
    let [data, setData] = useState([]);
    let [alert, setAlert] = useState('');
    let [isDel, setIsDel] = useState(false)
    let [loadState, setLoadState] = useState(false)

    useEffect(() => {
        let password = reactLocalStorage.get('password')
        setPassword(password)
    }, [])

    useEffect(() => {
        async function getData() {
            let fetchURL = `${GOOGLE_SHEET_URL}?look=${look}&mode=look`
            let res = await fetch(fetchURL)
            let data = await res.json()
            setData(data)
            setLoadState(true)
        }
        getData()
    }, [look, isDel, alert])

    return (
        <div className="lookContainer container d-flex flex-column justify-content-between h-100">
            <div>
                {alertCallback(alert, setAlert)}
                <div className="m-5">
                    <Ckeckload loadState={loadState} />
                </div>
                <div className="fs-2 m-4">
                    {getTitle(data[0])}
                </div>
                <ul className="item m-4">
                    {loadItem(setAlert, data, isDel, setIsDel, look, password)}
                </ul>
            </div>
            <Bottom look={look} setLook={setLook} isDel={isDel} setIsDel={setIsDel} setAlert={setAlert} />
        </div>
    )

}
