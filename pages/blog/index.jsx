import React, { useEffect, useState, useRef } from "react"
import Fuse from "fuse.js";
import Content from "../../components/blog/Content";
import Link from "next/link"
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


export default function Blog() {

    let FormBody = new FormData()

    let [json, setJson] = useState([])
    let [searchState, setSearchState] = useState(false)
    let jsonRef = useRef()
    let [load, setLoad] = useState(false)
    let fuse = new Fuse(jsonRef.current, {
        keys: ['title']
    })

    useEffect(() => {
        FormBody.append('mode', 'look')

        fetch(BLOG_URL, {
            method: 'post',
            body: FormBody
        }).then(res => {
            return res.json()
        }).then(data => {
            setJson(data)
            jsonRef.current = data
            setLoad(true)
        })
    }, [])

    function changeSearch(e){
        let value = e.target.value
        if(!load) return
        if(value === ''){
            setSearchState(false)
            setJson(jsonRef.current)
            return
        }
        setJson(fuse.search(value))
        setSearchState(true)
        
    }

    return (
        <div className="blog-container">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h1 className="fw-bold display-1 mx-5 m-3">Blog</h1>
                <div className="d-flex flex-row align-items-center">
                    <input
                        type={'text'}
                        className="form-control form-control-sm mx-3"
                        placeholder="search"
                        onKeyUp={changeSearch}
                    />
                    <Link href={'/blog/post'}><button className="btn btn-success mx-2">post</button></Link>
                </div>
            </div>
            <Content json={json} state={searchState} />
            {checkLoad(load)}
        </div>
    )
}