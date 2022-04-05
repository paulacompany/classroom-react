import React, { useState } from "react";
import Link from "next/link";
import { LOGIN } from "../../env/config";
import { useRouter } from "next/router";
import setEmailAndPassword from "../../public/setEmailAndPassword";

export default function Login() {

    let [email, setEmail] = useState('')
    let [emailPassword, setEmailPassword] = useState('')

    let router = useRouter();

    function click(){
        fetch(`${LOGIN}?email=${email}&password=${emailPassword}&mode=check`).then(res=>{
            return res.text()
        }).then(data=>{
            if(data == 'password error'){
                alert(data)
            }else if(data == 'ok'){
                setEmailAndPassword(email, emailPassword)
                router.reload()
                
            }else{
                alert('error')
            }
        })
    }

    function logOut(){
        setEmailAndPassword('', '')
        router.reload()
    }

    return (
        <div className="container mh-100 login-container">
            <h1 className="m-5">Login</h1>
            <p className="h3 m-2">email:</p>
            <input type={'email'} className="form-control mb-5" onChange={e=>{setEmail(e.target.value)}} />
            <p className="h3 m-2">password:</p>
            <input type={'password'} className="form-control mb-5" onChange={e=>{setEmailPassword(e.target.value)}} />
            <div className="w-100">
                <button className="btn btn-danger mx-2 btn-lg" onClick={click}>login</button>
                <Link href={'/login/signup'}><button className="btn btn-success mx-2">sign up</button></Link>
                <button className="btn btn-warning mx-2" onClick={logOut}>log out</button>
            </div>
        </div>
    )
}