import React, { useState, useEffect } from "react";
import { LOGIN } from "../../env/config";
import Alert from "../../components/Alert";

export default function Verify() {

    let [alert, setAlert] = useState('')
    let [code, setCode] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    useEffect(() => {
        let url = location.href
        let urlFormat = new URL(url);
        let parameter = urlFormat.searchParams.get('email');
        if (!parameter) location.href = '/'
        setEmail(parameter)
    }, [])

    async function click() {
        if (!code || code == 0) return
        if (!email) return
        let res = await fetch(`${LOGIN}?email=${email}&number=${code}&mode=verify&password=${password}`)
        let data = await res.json()
        if (data.message == 'success') {
            setAlert('VERIFIED_ERROR')
            setCode('')
        } else if (data.message == 'verify success') {
            location.href = '/login'
        } else {
            setAlert('ERROR')
            setCode('')
        }
    }

    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
            <Alert alert={alert} setAlert={setAlert} />
            <div className="bg-light rounded p-3 login-content-container">
                <h3 className="mb-5 mt-5 mx-3">Verify</h3>
                <p className="h3 m-2">code:</p>
                <input type={'number'}
                    className="form-control mb-5"
                    onChange={e => {
                        setCode(e.target.value)
                    }}
                    value={code}
                />
                <p className="h3 m-2">password:</p>
                <p className="text-secondary mx-1">如果驗證碼錯誤會使用此密碼</p>
                <input type={'password'}
                    className="form-control mb-5"
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                />
                <div className="w-100 mb-5">
                    <button className="btn btn-danger mx-2" onClick={click}>submit</button>
                </div>
            </div>
        </div>
    )
}

