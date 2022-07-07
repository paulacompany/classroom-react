import React, { useRef } from "react";



export default function Answer({ setAnswer }) {

    let answerARef = useRef()
    let answerBRef = useRef()
    let answerCRef = useRef()
    let answerDRef = useRef()
    let answerOtherRef = useRef()

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
    )
}