import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import getUser from "../../common/getUser"
import Ckeckload from "../../components/Checkload"
import { alertCallback } from "../../common/alertCallback"
import { getMyTestList, getQuestion, renderNext, renderFunction } from "../../components/test-page/function"

export default function Question() {

    const router = useRouter()

    let [testJson, setTestJson] = useState([])
    let [loadState, setLoadState] = useState(false)
    let [answer, setAnswer] = useState('')
    let [clickState, setClickState] = useState(false)
    let [wrongAnswerClickState, setWrongAnswerClickState] = useState(false)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [alert, setAlert] = useState('')
    let [answerPreview, setAnswerPreview] = useState('')

    let currentURL = useRef()
    let classListName = useRef()
    let questionId = useRef()

    let formatArray = useRef()
    let myTestListRef = useRef()
    let firstTime = useRef(true)

    useEffect(() => {
        // get the email and password
        getUser(setEmail, setPassword, false)
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        if (!email && !password) {
            router.push('/login')
        }
    }, [email, password])

    useEffect(() => {
        if (!router.isReady) return
        // init
        currentURL.current = location.href.split('?')[0];
        questionId.current = router.query.id
        classListName.current = router.query.class

        getMyTestList(email, password, myTestListRef)
        getQuestion(questionId, setTestJson, setLoadState)


    }, [router.isReady, email, password])


    return (
        <div className="test-container container mt-5 mb-5">
            <Ckeckload loadState={loadState} />
            {alertCallback(alert, setAlert)}
            {
                renderFunction(
                    clickState,
                    wrongAnswerClickState,
                    setClickState,
                    setWrongAnswerClickState,
                    setAnswerPreview,
                    formatArray,
                    testJson,
                    answer,
                    setAnswer,
                    answerPreview,
                    setAlert,
                    loadState,
                    classListName,
                    email,
                    password,
                    questionId,
                    myTestListRef,
                    currentURL,
                    router
                )
            }
            {renderNext(wrongAnswerClickState, myTestListRef, questionId, currentURL, classListName, formatArray, router)}
        </div>
    )
}
