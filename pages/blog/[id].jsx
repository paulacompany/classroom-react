import React, { useEffect, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { BLOG_URL } from "../../env/config"
import { useRouter } from "next/router";
const FormData = require('form-data');
const FormBody = new FormData()

export const getStaticPaths = async () => {
    FormBody.append('mode', 'look')
    FormBody.append('key', uuidv4())
    let res = await fetch(BLOG_URL, {
        method: 'post',
        body: FormBody
    })
    let data = await res.json()
    const paths = data.map(item => {
        return {
            params: { id: item.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const id = params.id
    FormBody.append('mode', 'get')
    FormBody.append('sheetid', id)
    FormBody.append('key', uuidv4())
    let res = await fetch(BLOG_URL, {
        method: 'post',
        body: FormBody
    })
    let data = await res.json()

    return {
        props: {
            data
        }
    };
};



export default function id({ data }) {


    let bodyRef = useRef();
    let router = useRouter()

    if (data.title == '') {
        router.push('/')
    }

    function checkTableTag(){
        let table = document.querySelector('table')
        if (!table) {
            return
        } else if (table) {
            document.querySelector('table').className = 'table table-hover'
        } else if (table[0]) {
            table.map(item => {
                item.className = 'table table-hover'
            })
        }
    }

    useEffect(()=>{
        bodyRef.current.innerHTML = data.body
        checkTableTag()
    }, [])


    return (
        <div className="id-container container mt-5 mb-5">
            <h1 className="mb-5 nt-3 display-1">{data.title}</h1>
            <div ref={bodyRef}></div>
        </div>
    )


}