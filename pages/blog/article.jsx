import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { BLOG_URL } from "../../env/config"
const FormData = require('form-data');


function checkLoad(loadState) {
    if (loadState) {
        return
    } else {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border spinner-border-lg" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}


export default function id() {
    const router = useRouter()

    let bodyRef = useRef();

    let FormBody = new FormData()

    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    let [load, setLoad] = useState(false)


    useEffect(() => {
        if (!router.isReady) return;

        let id = router.query.id

        FormBody.append('mode', 'get')
        FormBody.append('sheetid', id)

        fetch(BLOG_URL, {
            method: 'post',
            body: FormBody
        }).then(res => {
            return res.json()
        }).then(data => {
            setTitle(data.title)
            setBody(data.body)
            setLoad(true)
        })

    }, [router.isReady])


    useEffect(()=>{
        bodyRef.current.innerHTML = body
    },[body])

    return (
        <div className="id-container container mt-5 mb-5">
            <h1 className="mb-5 nt-3 display-1">{title}</h1>
            {checkLoad(load)}
            <div ref={bodyRef}></div>
        </div>
    )


}