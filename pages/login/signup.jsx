import React, { useState } from "react";
import Link from "next/link";
import { LOGIN } from "../../env/config";
import Alert from "../../components/Alert.jsx"

export default function Signup() {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [alert, setAlert] = useState('')

    async function click(){
        if(!email) return
        if(!password) return
        let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=register`)
        let data = await res.json()
        if(data.status == 200){
            location.href = `/login/verify?email=${email}`
        }else if(data.message == 'you have registered'){
            setAlert('HAVE_VERIFIED')
        }else{
            setAlert('ERROR')
        }
    }


    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
            <Alert alert={alert} setAlert={setAlert} />
            <div className="bg-light rounded p-3 login-content-container">
                <h3 className="mb-5 mt-5 mx-3">Sign up</h3>
                <p className="h3 m-2">email:</p>
                <input type={'email'} className="form-control mb-5" onChange={e => {
                    setEmail(e.target.value)
                }} />
                <p className="h3 m-2">password:</p>
                <input type={'password'} className="form-control mb-5" onChange={e => {
                    setPassword(e.target.value)
                }} />
                <div className="w-100 mb-5">
                    <button className="btn btn-danger mx-2" onClick={click}>sign up</button>
                </div>
                <Link href={'/login'}><a>you have a account?</a></Link>
            </div>
        </div>
    )
}