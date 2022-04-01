import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { BLOG_URL } from "../../env/config"
const FormData = require('form-data');

export default function id() {
    const router = useRouter()

    let bodyRef = useRef();

    let FormBody = new FormData()

    let [title, setTitle] = useState('wait');
    let [body, setBody] = useState('');
    let [img, setImg] = useState('');


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
            setImg(data.img)
        })

    }, [router.isReady])


    useEffect(()=>{
        bodyRef.current.innerHTML = body
    },[body])

    return (
        <div className="id-container container mt-5 mb-5">
            <h1 className="mb-5 nt-3 display-1">{title}</h1>
            <div ref={bodyRef}></div>
        </div>
    )


}