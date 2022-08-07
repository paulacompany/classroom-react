import React, { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router'
import { BLOG_URL } from "../../env/config"
import Checkload from "../../components/Checkload";
const FormData = require('form-data');



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
            if (data.title == '') {
                data.title = 'Oops... Something wrong'
                data.body = '<p class="m-5 text-center h1">404<p>'
            }
            setTitle(data.title)
            setBody(data.body)
            setLoad(true)
        })

    }, [router.isReady])


    useEffect(() => {
        bodyRef.current.innerHTML = body
        if (!body) return
        let table = document.querySelector('table')
        if(!table){
            return
        }else if(table) {
            document.querySelector('table').className = 'table table-hover'
        } else if(table[0]) {
            table.map(item => {
                item.className = 'table table-hover'
            })
        }

    }, [body])

    return (
        <div className="id-container container mt-5 mb-5">
            <h1 className="mb-5 nt-3 display-1">{title}</h1>
            <Ckeckload loadState={load} />
            <div ref={bodyRef}></div>
        </div>
    )


}