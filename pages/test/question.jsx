import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { TEST_URL, LOGIN } from "../../env/config"
import getUser from "../../common/getUser"
import Ckeckload from "../../components/Checkload"
import { alertCallback } from "../../common/alertCallback"

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
    let answerARef = useRef()
    let answerBRef = useRef()
    let answerCRef = useRef()
    let answerDRef = useRef()
    let answerOtherRef = useRef()
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

    function changeA() {
        setAnswer('a')
        answerOtherRef.current.value = ''
    }

    function changeB() {
        setAnswer('b')
        answerOtherRef.current.value = ''
    }

    function changeC() {
        setAnswer('c')
        answerOtherRef.current.value = ''
    }

    function changeD() {
        setAnswer('d')
        answerOtherRef.current.value = ''
    }

    function changeOther(e) {
        setAnswer(e.target.value)
        answerARef.current.checked = false
        answerBRef.current.checked = false
        answerCRef.current.checked = false
        answerDRef.current.checked = false
    }

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
                    <div className="mt-5">
                        <div className="d-flex align-items-center">
                            <input type={'radio'} className="form-check-input mt-0 fs-4" value={'a'} name="answer" id="answerA" onChange={changeA} ref={answerARef} />
                            <label htmlFor="answerA" className="fs-4 px-3">a.</label>
                            <input type={'radio'} className="form-check-input mt-0 fs-4" value={'b'} name="answer" id="answerB" onChange={changeB} ref={answerBRef} />
                            <label htmlFor="answerB" className="fs-4 px-3">b.</label>
                            <input type={'radio'} className="form-check-input mt-0 fs-4" value={'c'} name="answer" id="answerC" onChange={changeC} ref={answerCRef} />
                            <label htmlFor="answerC" className="fs-4 px-3">c.</label>
                            <input type={'radio'} className="form-check-input mt-0 fs-4" value={'d'} name="answer" id="answerD" onChange={changeD} ref={answerDRef} />
                            <label for="answerD" className="fs-4 px-3">d.</label>
                        </div>
                        <input type={'text'} className="form-control mt-3" placeholder="Other Answer" onChange={changeOther} ref={answerOtherRef} />
                    </div>
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
