import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import Link from "next/link"
import Content from "../../components/blog-page/Content";
import BlogPageReducer from "../../common/redux/reducer/BlogPageReducer";
import { BLOG_URL } from "../../env/config"
const FormData = require('form-data')
const FormBody = new FormData()


export default function Blog() {

    let [data, setData] = useState('')

    async function getData() {
        FormBody.append('mode', 'look')
        let res = await fetch(BLOG_URL, {
            method: 'post',
            body: FormBody
        })
        let data = await res.json()
        setData(data)
    }
    getData()

    let jsonRef = useRef()
    let dispatch = useDispatch()
    let json = useSelector(state => state.blog.json)
    const fuse = new Fuse(jsonRef.current, {
        keys: ['title']
    })

    useEffect(() => {
        if(!data) return
        dispatch(BlogPageReducer.actions.setJson(data))
        jsonRef.current = data
    }, [data])

    useEffect(() => {
        console.log(json);
    }, [json])

    function changeSearch(e) {
        let value = e.target.value
        if (value === '') {
            dispatch(
                BlogPageReducer.actions.setJson(jsonRef.current)
            )
            return
        }
        dispatch(
            BlogPageReducer.actions.setJson(
                handleSearch(fuse.search(value))
            )
        )
    }

    function handleSearch(data) {
        let resultArray = []
        data.map(item => {
            resultArray.push(item.item)
        })
        return resultArray
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
            <Content json={json} />
        </div>
    )
}