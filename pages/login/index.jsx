import React, { useState } from "react";
import Link from "next/link";
import { LOGIN } from "../../env/config";
import { useRouter } from "next/router";
import setEmailAndPassword from "../../common/global/setEmailAndPassword";

export default function Login() {

    let [email, setEmail] = useState('')
    let [emailPassword, setEmailPassword] = useState('')

    let router = useRouter();

    async function click() {
        let res = await fetch(`${LOGIN}?email=${encodeURI(email)}&password=${encodeURI(emailPassword)}&mode=check`)
        let data = await res.text()
        if (data == 'password error') {
            alert(data)
        } else if (data == 'ok') {
            setEmailAndPassword(email, emailPassword, 'false')
            router.reload()
        } else {
            alert('error')
        }
    }

    function logOut() {
        setEmailAndPassword('', '', 'false')
        router.reload()
    }

    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
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