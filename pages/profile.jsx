import React, { useState, useEffect } from "react"
import Ckeckload from "../components/Checkload";
import Content from "../components/blog/Content";
import { useRouter } from "next/router";
import { BLOG_URL, LOGIN } from "../env/config";
import getUser from "../public/getUser";
import setEmailAndPassword from "../public/setEmailAndPassword";
const FormData = require('form-data');

export default function Profile() {

    let route = useRouter()

    let [proFile, setProFile] = useState('')
    let [result, setResult] = useState([])
    let [loadState, setLoadState] = useState(false)
    let [email, setEmail] = useState('')

    function checkIsProFile() {

        function turnToOn() {
            if(email){
                setEmailAndPassword(false, false, 'true')
                route.push('/')
            }else{
                alert('You have to login')
                route.push('/')
            }     
        }
        function turnToOff() {
            setEmailAndPassword(false, false, 'false')
            route.push('/')
        }

        if (proFile == 'true') {
            return (
                <button className="btn btn-danger" onClick={turnToOff}>On</button>
            )
        } else {
            return (
                <button className="btn btn-primary" onClick={turnToOn} >Off</button>
            )
        }
    }

    useEffect(() => {
        getUser(setEmail, false, setProFile)

     


        return () => {
            setResult([])
        }

    }, [])


    useEffect(()=>{

        let FormBody = new FormData()

        if(proFile == 'false'){
            setLoadState(true)
        }

        if (proFile == 'true') {
            fetch(`${LOGIN}?mode=getpersonpost&email=${email}`).then(res => {
                return res.text()
            }).then(data => {
                data = data.replace(', ', '')
                getPost(JSON.parse("[" + data + "]"))
            })
        } else {
            return
        }

        function getPost(number) {

            number.map(item => {

                FormBody.append('mode', 'get')
                FormBody.set('sheetid', item)

                fetch(BLOG_URL, {
                    method: 'post',
                    body: FormBody
                }).then(res => {
                    return res.json()
                }).then(data => {
                    setResult(prop => {
                        return [
                            ...prop,
                            data
                        ]
                    })
                })

            })

            setLoadState(true)

        }

        

    }, [proFile])

    return (
        <div className="profile-container container">
            <h1 className="m-5">Profile: {email}</h1>
            <div className="d-flex flex-row align-items-center">
                <p className="h4 m-4">Profile mode:</p>
                {checkIsProFile()}
            </div>
            <Content json={result} />
            <Ckeckload loadState={loadState} />
        </div>
    )
}
