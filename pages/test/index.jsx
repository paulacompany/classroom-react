import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { TEST_URL, LOGIN } from "../../env/config";
import { useRouter } from "next/router";
import getUser from "../../common/getUser";
import Ckeckload from "../../components/Checkload"

export default function Test() {

    const router = useRouter()

    let [testJson, setTestJson] = useState([])
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [loadState, setLoadState] = useState(false)
    let myTestListRef = useRef()
    let firstTime = useRef(true)

    useEffect(() => {
        getUser(setEmail, setPassword, false)

        if(firstTime.current){
            firstTime.current = false
            return
        }

        async function getMyTestList(){
            if(!email && !password){
                location.href = '/login'
                return
            }
            let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=gettest`)
            let data = await res.text()
            if(data == 'error'){
                alert('error')
                router.push('/test')
            }else{
                myTestListRef.current = data.split(',')
            }
        }

        getMyTestList()

        async function getTheTestClass() {

            let formData = new FormData()
            formData.append('mode', 'getClass')
            let res = await fetch(TEST_URL, {
                method: 'POST',
                body: formData
            })
            let data = await res.json()
            setTestJson(data)
            setLoadState(true)
        }
        getTheTestClass()
    }, [email, password])

    async function getTheQuestionId(className) {
        let formData = new FormData()
        formData.append('classname', className)
        formData.append('mode', 'getClassQu')
        let res = await fetch(TEST_URL, {
            method: 'POST',
            body: formData
        })
        let data = await res.text()
        let formatArray = data.split(',')
        let redirectState = true
        formatArray.map((item, number)=>{
            console.log('hi');
            if(!myTestListRef.current.includes(item) && redirectState){
                redirectState = false
                location.href = `/test/question?class=${className}&id=${formatArray[number]}`
            }
        })
        if(redirectState){
            router.push('/')
        }
    }

    return (
        <div className="test-container container mt-5">
            <div className="d-flex align-items-center">
                <h1 className="w-100 fw-bold display-3">Testing</h1>
                <div className="w-100 d-flex justify-content-end align-items-center">
                    <Link href={'/test/contribution'}><button className="btn btn-success mx-1">contribute</button></Link>
                </div>
            </div>
            <div className="m-0 m-sm-5 mt-5">
                <Ckeckload loadState={loadState} />
                {
                    testJson.map(item => {
                        return (
                            <div className="border d-flex align-items-center test-subject-container justify-content-between mb-2">
                                <p className="h2 p-0 m-3">{item}</p>
                                <button
                                    className="btn btn-primary m-3"
                                    onClick={()=>{
                                        getTheQuestionId(item)
                                    }}
                                >test</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}