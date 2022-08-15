import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link"
import Content from "../../components/blog-page/Content";
import BlogPageReducer from "../../common/redux/reducer/BlogPageReducer";
import { BLOG_URL } from "../../env/config"
const FormData = require('form-data')
const FormBody = new FormData()

export async function getServerSideProps() {
    FormBody.append('mode', 'look')
    FormBody.append('key', uuidv4())
    let res = await fetch(BLOG_URL, {
        method: 'post',
        body: FormBody
    })
    let data = await res.json()
    return { props: { data } }
}


export default function Blog({ data }) {

    let jsonRef = useRef()
    let dispatch = useDispatch()
    let json = useSelector(state => state.blog.json)
    const fuse = new Fuse(jsonRef.current, {
        keys: ['title']
    })

    useEffect(() => {
        dispatch(BlogPageReducer.actions.setJson(data))
        jsonRef.current = data
    }, [])

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