import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getUser from "../../common/getUser";
import Ckeckload from "../../components/Checkload"
import { getMyTestList, getTheTestClass, getTheQuestionId } from "../../components/test-page/function";

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

        getMyTestList(email, password, myTestListRef, router)
        getTheTestClass(setTestJson, setLoadState)
    }, [email, password])

    

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
                                        getTheQuestionId(item, myTestListRef, router)
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