import React, { useState } from "react";
import Link from "next/link";
import { LOGIN } from "../../env/config";
import setEmailAndPassword from "../../common/global/setEmailAndPassword";
import Alert from "../../components/Alert";

export default function Login() {

    let [email, setEmail] = useState('')
    let [emailPassword, setEmailPassword] = useState('')
    let [alert, setAlert] = useState('')


    async function click() {
        if(!email) return
        if(!emailPassword) return
        let res = await fetch(`${LOGIN}?email=${email}&password=${emailPassword}&mode=login`)
        let data = await res.json()
        if (data.status == 200) {
            setAlert('OK')
            setEmailAndPassword(email, emailPassword, 'false')
            location.href = '/'
        }else if(data.message == 'password incorrect or not verify'){
            setAlert('PASSWORD ERROR')
        }else if(data.status == 404){
            setAlert('CANNOT FIND USER')
            location.href = '/login/signup'
        }else{
            setAlert('ERROR')
        }
    }

    function logOut() {
        setEmailAndPassword('', '', 'false')
        location.reload()
    }

    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
            <Alert alert={alert} setAlert={setAlert} />
            <div className="bg-light rounded p-3 login-content-container">
                <h3 className="mb-5 mt-5 mx-3">Login</h3>
                <p className="h3 m-2">email:</p>
                <input type={'email'} className="form-control mb-5" onChange={e => { setEmail(e.target.value) }} />
                <p className="h3 m-2">password:</p>
                <input type={'password'} className="form-control mb-5" onChange={e => { setEmailPassword(e.target.value) }} />
                <div className="w-100 mb-5">
                    <button className="btn btn-danger mx-2" onClick={click}>login</button>
                    <button className="btn btn-warning mx-2" onClick={logOut}>log out</button>
                </div>
                <Link href={'/login/signup'}><a>sign up now?</a></Link>
            </div>
        </div>
    )
}