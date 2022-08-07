import React, { useEffect, useRef, useState } from "react";
import Login from "../components/setting-page/Login";
import Button from "../components/setting-page/Button";
import New from "../components/setting-page/New";
import {reactLocalStorage} from 'reactjs-localstorage';
import { useRouter } from 'next/router'

export default function Setting() {

    let router = useRouter()

    let [login, setLogin] = useState('');
    let [click, setClick] = useState(false);
    let [alert, setAlert] = useState(<div></div>);
    let isFirstTime = useRef(false);
    let isFirstLog = useRef(false);

    useEffect(()=>{
        if(isFirstTime.current){
            reactLocalStorage.set('password', login)
            setAlert(
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <p className="h5">SUCCESS!!! It will be disappear few second later</p>
                </div>
            )
        }else{
            isFirstTime.current = true
            return
        }
    }, [click])


    useEffect(()=>{

        if(isFirstLog.current){
            setTimeout(()=>{
                router.push('/')
            }, 500)
        }else{
            isFirstLog.current = true
            return
        }

    }, [alert])

    return (
        <div className="setting-container d-flex flex-column justify-content-center align-items-center">
            {alert}
            <div className="d-flex flex-column align-items-center bg-info p-3 rounded">
                <p className="h1 m-3">Login</p>
                <Login setLogin={setLogin} login={login} />
                <Button setClick={setClick}/>
                <New />
            </div>
        </div>
    )
}