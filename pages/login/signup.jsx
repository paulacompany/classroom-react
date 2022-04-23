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
                    <p className="h3 m-2 mt-5">conform code (Please press enter):</p>
                    <input className="form-control mb-5" type={'number'} onKeyUp={e => {
                        setCheckNumber(e.target.value)
                        if(e.key == 'Enter'){
                            checkFetch(email, password, checkNumber)
                        }
                    }} />
                </>
            )
        } else {
            return ''
        }
    }

    function checkFetch(email, password, code) {
        fetch(`${LOGIN}?email=${email}&password=${password}&mode=conform&number=${code}`).then(res => {
            return res.text()
        }).then(data => {
            console.log(email, password, code);
            if (data == 'ok') {
                router.push('/')
            }else if (data == 'you check it before') {
                alert(data)
            } else {
                alert(`${data}. Please sign up again.`)
            }
        })
    }

    return (
        <div className="container mh-100 login-container">
            <h1 className="m-5">Sign up</h1>
            <p className="h3 m-2">email:</p>
            <input type={'email'} className="form-control mb-5" onChange={e => {
                setEmail(e.target.value)
            }} />
            <p className="h3 m-2">password:</p>
            <input type={'password'} className="form-control mb-5" onChange={e => {
                setPassword(e.target.value)
            }} />
            <div className="w-100">
                <button className="btn btn-danger mx-2 btn-lg" onClick={click}>sign up</button>
                <Link href={'/login'}><button className="btn btn-success mx-2">login</button></Link>
            </div>
            {checkDom()}
        </div>
    )
}