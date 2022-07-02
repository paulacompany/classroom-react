import React, { useEffect, useState, useRef } from "react";
import { IMAGE_AUTH, TEST_URL } from "../../env/config.js"
import getUser from "../../common/getUser.js"

export default function Contribution() {

    let [name, setName] = useState('')
    let [file, setFile] = useState()
    let [describe, setDescribe] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [classList, setClassList] = useState('')
    let [submitState, setSubmitState] = useState(0)
    let [classListJson, setClassListJson] = useState([])
    let [answer, setAnswer] = useState('')
    let imgPreviewRef = useRef()
    let clickStatus = useRef(true)
    let answerARef = useRef()
    let answerBRef = useRef()
    let answerCRef = useRef()
    let answerDRef = useRef()
    let answerOtherRef = useRef()


    useEffect(() => {
        async function getTheClassList() {
            let formData = new FormData()
            formData.append('mode', 'getClass')
            let res = await fetch(TEST_URL, {
                method: 'POST',
                body: formData
            })
            let data = await res.json()
            setClassListJson(data)
        }

        getTheClassList()
    }, [])


    useEffect(() => {

        getUser(setEmail, setPassword, false)
        if (submitState == 0) return
        if (!clickStatus.current) return
        async function sendToImgur() {

            if (!email || !password) {
                alert('Please login first')
                return
            }


            if (!name && !file) {
                alert('Check the information complete')
                return
            } else if (!answer && !classList) {
                alert('Check the information complete')
                return
            }

            let formData = new FormData()

            formData.append('type', 'file')
            formData.append('image', file)

            let headers = {
                Authorization: `Bearer ${IMAGE_AUTH}`,
            }

            clickStatus.current = false

            let res = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: headers,
                body: formData
            })
            let data = await res.json()
            console.log(data);
            if (data.status !== 200) {
                alert('server error, please try again!')
            } else {
                sendToGoogleSheet(data.data.link)
                alert('success step 1')
            }
        }

        async function sendToGoogleSheet(url) {
            console.log(url);
            let formData = new FormData()
            formData.append('name', name)
            formData.append('imageurl', url)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('des', describe)
            formData.append('classname', classList)
            formData.append('answer', answer)

            let res = await fetch(TEST_URL, {
                method: 'POST',
                body: formData
            })
            let data = await res.text()

            alert(data + ' step 2')

            if (data == 'ok') {
                location.reload()
            } else {
                clickStatus.current = true
            }
        }
        sendToImgur()


    }, [submitState])

    function submit() {
        setSubmitState(prop => prop + 1)
    }

    function fileChange(e) {
        setFile(e.target.files[0])
        imgPreviewRef.current.src = URL.createObjectURL(e.target.files[0])
    }

    function nameChange(e) {
        setName(e.target.value)
    }

    function describeChange(e) {
        setDescribe(e.target.value)
    }

    function classListChange(e) {
        setClassList(e.target.value)
    }

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

    return (
        <div className="container m-0 m-sm-5 mt-3 mb-3">
            <h1>contribution</h1>
            <div className="m-0 m-sm-0">
                <p className="h3 mt-5 mb-5">upload image :</p>
                <div className="">
                    <img ref={imgPreviewRef} alt="You image is not the correct file type" src="/img/reveal.png" className="test-preview-img border d-block" />
                    <input
                        type={'file'}
                        id="file"
                        className="d-none"
                        onChange={fileChange}
                    />
                    <label for="file" className="btn btn-primary mt-3 btn-lg">upload</label>
                </div>

                <p className="h3 mt-5 mb-5">choose the class :</p>
                <div className="mx-3">
                    <input type={'text'} list="classList" className="form-control" onChange={classListChange} />
                    <datalist id="classList">
                        {
                            classListJson.map(item => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })
                        }
                    </datalist>
                </div>

                <p className="h3 mt-5 mb-5">choose the name :</p>
                <input
                    type="text"
                    className="form-control mx-3"
                    placeholder="Username"
                    onChange={nameChange}
                />

                <p className="h3 mt-5 mb-5">select the answer :</p>
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


                <p className="h3 mt-5 mb-5">describe :</p>
                <div className="form-floating mx-3">
                    <textarea
                        className="form-control describe"
                        placeholder="Describe"
                        id="floatingTextarea2"
                        onChange={describeChange}
                    />
                    <label for="floatingTextarea2">Description</label>
                </div>

                <button
                    className="btn btn-danger mt-5"
                    onClick={submit}
                >
                    submit
                </button>
            </div>
        </div>
    )
}