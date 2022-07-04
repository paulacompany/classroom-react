import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { LOGIN } from "../../env/config";

export default function Signup() {

    let router = useRouter()

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [checkItem, setCheckItem] = useState(false);
    let [checkNumber, setCheckNumber] = useState();

    function click() {
        fetch(`${LOGIN}?email=${email}&password=${password}&mode=sign`).then(res => {
            return res.text()
        }).then(data => {
            if (data == 'success') {
                setCheckItem(true)
            } else {
                alert('error')
            }
        })
    }

    function checkDom() {
        if (checkItem) {
            return (
                <>
                    <p className="h3 m-2 mt-5">confirmed code</p>
                    <p className="mx-2">please check your email</p>
                    <input className="form-control mb-5" type={'number'} onKeyUp={e => {
                        setCheckNumber(e.target.value)
                        if (e.key == 'Enter') {
                            checkFetch(email, password, checkNumber)
                        }
                    }} />
                    <button
                        className="btn btn-primary d-block mb-3"
                        onClick={() => {
                            checkFetch(email, password, checkNumber)
                        }}
                    >register</button>
                </>
            )
        } else {
            return ''
        }
    }

    async function checkFetch(email, password, code) {
        let res = await fetch(`${LOGIN}?email=${encodeURI(email)}&password=${encodeURI(password)}&mode=conform&number=${encodeURI(code)}`)
        let data = await res.text()

        if (data == 'ok') {
            router.push('/')
        } else if (data == 'You already register it before') {
            alert(data)
        } else {
            alert(`${data}. Please sign up again.`)
        }
    }

    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
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
                {checkDom()}
                <Link href={'/login'}><a>you have a account?</a></Link>
            </div>
        </div>
    )
}