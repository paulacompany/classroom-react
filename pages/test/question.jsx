import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { TEST_URL, LOGIN } from "../../env/config"
import getUser from "../../common/getUser"
import Ckeckload from "../../components/Checkload"
import { alertCallback } from "../../common/alertCallback"
import Answer from "../../components/test-page/Answer"

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
    let myFormatArray = useRef()
    let firstTime = useRef(true)

    useEffect(() => {
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
        currentURL.current = location.href.split('?')[0];
        questionId.current = router.query.id
        classListName.current = router.query.class

        async function getMyTestList() {
            if (!email && !password) return
            let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=gettest`)
            let data = await res.text()

            if (data == 'error') {
                alert('error')
                router.push('/test')
            } else {
                myFormatArray.current = data.split(',')
            }
        }
        getMyTestList()

        async function getQuestion() {
            let formData = new FormData()
            formData.append('number', questionId.current)
            formData.append('mode', 'getValue')
            let res = await fetch(TEST_URL, {
                method: 'POST',
                body: formData
            })
            let data = await res.json()
            setTestJson(data)
            setLoadState(true)
        }
        getQuestion()


    }, [router.isReady, email, password])

    async function clickCheck() {

        let formData = new FormData()
        formData.append('classname', classListName.current)
        formData.append('mode', 'getClassQu')
        let res = await fetch(TEST_URL, {
            method: 'POST',
            body: formData
        })
        let data = await res.text()
        formatArray.current = data.split(',')

        if (answer == testJson.answer) {
            setClickState(true)
            setAlert('CORRECT')
        } else {
            setWrongAnswerClickState(true)
            setAnswerPreview(() => {
                return 'Answer: ' + testJson.answer
            })
            setAlert('WRONG')
        }
    }

    function redirectURL(formatArray) {
        let redirectState = true
        formatArray.map(item => {
            let isSame = myFormatArray.current.includes(item)
            if ((item > questionId.current) && !isSame && redirectState) {
                redirectState = false
                location.href = currentURL.current + `?class=${classListName.current}&id=${item}`
            }
        })
        if (redirectState) {
            router.push('/test')
        }
    }

    function renderFunction() {
        if (loadState) {
            return (
                <div>
                    <h1 className="fw-bold">{testJson.name}</h1>
                    <img src={testJson.imageURL} className="test-question-img mt-5" />
                    <p className="text-secondary">by : {testJson.userName}</p>
                    <p className="fw-bold fs-4 mt-2">{testJson.des}</p>
                    <p className="display-6 fw-bold text-danger">{answerPreview}</p>
                    <Answer setAnswer={setAnswer} />
                    {renderButton()}
                    {renderClean()}
                </div>
            )
        } else {
            return ''
        }
    }

    function renderButton() {
        if (clickState || wrongAnswerClickState) {
            return ''
        } else {
            return (
                <button
                    className="btn btn-danger mt-5 mb-5 mx-2"
                    onClick={clickCheck}
                >check</button>
            )
        }
    }

    async function addTheCleanList() {
        let res = await fetch(`${LOGIN}?email=${email}&password=${password}&mode=addtest&number=${questionId.current}`)
        let data = await res.text()
        if (data == 'error') {
            alert('error')
            router.push('/test')
        } else {
            redirectURL(formatArray.current)
        }
    }

    function renderClean() {
        if (clickState) {
            return (
                <div className="d-flex mt-5">
                    <button
                        className="btn btn-success mx-2"
                        onClick={addTheCleanList}
                    >clean</button>
                    <button
                        className="btn btn-warning mx-2"
                        onClick={() => {
                            redirectURL(formatArray.current)
                        }}
                    >skip
                    </button>
                </div>
            )
        } else {
            return ''
        }
    }

    function renderNext() {
        if (wrongAnswerClickState) {
            return (
                <div className="d-flex mt-5">
                    <button
                        className="btn btn-warning mx-2"
                        onClick={() => {
                            redirectURL(formatArray.current)
                        }}
                    >skip
                    </button>
                </div>
            )
        } else {
            return ''
        }
    }

    return (
        <div className="test-container container mt-5 mb-5">
            <Ckeckload loadState={loadState} />
            {alertCallback(alert, setAlert)}
            {renderFunction()}
            {renderNext()}
        </div>
    )
}
