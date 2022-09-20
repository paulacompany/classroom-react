import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_SHEET_URL } from "../../env/config"
import { reactLocalStorage } from "reactjs-localstorage";
import CheckLoad from "../../components/CheckLoad";
import Button from "../../components/look-page/Button";
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
    let dataCache = useRef([])

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
            dispatch(LookPageReducer.actions.setLoadState(false))
            if (firstTime.current) {
                firstTime.current = false
                return
            }
            if (!type) {
                location.href = '/look/setting'
                return
            }
            let dataStorage = reactLocalStorage.get('data_storage')
            if (dataStorage && look == 0) {
                let dataStorageFormat = JSON.parse(dataStorage)
                dispatch(LookPageReducer.actions.setData(dataStorageFormat))
            }
            let previousData = identifyNumber(look)
            if (previousData) {
                dispatch(LookPageReducer.actions.setData(previousData))
                dispatch(LookPageReducer.actions.setLoadState(true))
                getTheCache(look - 1)
                getTheCache(look - 2)
                return
            }
            let fetchURL = `${GOOGLE_SHEET_URL}?number=${look}&mode=look&type=${type}`
            let res = await fetch(fetchURL)
            let data = await res.json()
            if (data.status == 200) {
                dispatch(LookPageReducer.actions.setData(data))
                if (look == 0) {
                    reactLocalStorage.set('data_storage', JSON.stringify(data))
                }
                await getTheCache(look - 1)
                await getTheCache(look - 2)
            } else if (data.message == 'over range') {
                dispatch(LookPageReducer.actions.setAlert('LAST'))
            } else {
                dispatch(LookPageReducer.actions.setAlert('ERROR'))
                location.href = '/look/setting'
                return
            }

            dispatch(LookPageReducer.actions.setLoadState(true))
        }
        getData();
        async function getTheCache(number) {
            dispatch(LookPageReducer.actions.setLoadState(true))
            if(identifyNumber(number)) return
            let fetchURL = `${GOOGLE_SHEET_URL}?number=${number}&mode=look&type=${type}`
            let res = await fetch(fetchURL)
            let data = await res.json()
            if (data.status == 200) {
                let dataClone = data
                dataClone.number = number
                dataCache.current.push(dataClone)
            }
            console.log('getTheCache');
        }
        function identifyNumber(number) {
            for (var i = 0; i <= dataCache.current.length - 1; i++) {
                if (dataCache.current[i].number == number) {
                    return dataCache.current[i]
                }
            }
            return false
        }
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
            <Button />
        </div>
    )

}
