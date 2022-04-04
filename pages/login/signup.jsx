import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { LOGIN } from "../../env/config";

export default function Signup(){

    let router = useRouter()

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    function click(){
        fetch(`${LOGIN}?email=${email}&password=${password}&mode=sign`).then(res=>{
            return res.text()
        }).then(data=>{
            if(data == 'success'){
                alert('Please check your email')
                router.push('/')
            }
        })
    }

    return(
        <div className="container mh-100 login-container">
            <h1 className="m-5">Sign up</h1>
            <p className="h3 m-2">email:</p>
            <input type={'email'} className="form-control mb-5" onChange={e=>{
                setEmail(e.target.value)
            }} />
            <p className="h3 m-2">password:</p>
            <input type={'password'} className="form-control mb-5" onChange={e=>{
                setPassword(e.target.value)
            }} />
            <div className="w-100">
                <button className="btn btn-danger mx-2 btn-lg" onClick={click}>sign up</button>
                <Link href={'/login'}><button className="btn btn-success mx-2">login</button></Link>
            </div>
        </div>
    )
}