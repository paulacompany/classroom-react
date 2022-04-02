import React, { useEffect, useState } from "react"
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
    let [load, setLoad] = useState(false)

    useEffect(() => {
        FormBody.append('mode', 'look')

        fetch(BLOG_URL, {
            method: 'post',
            body: FormBody
        }).then(res => {
            return res.json()
        }).then(data => {
            setJson(data)
            setLoad(true)
        })
    }, [])


    return (
            <div className="blog-container">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h1 className="fw-bold display-1 mx-5 m-3">Blog</h1>
                    <div className="d-flex flex-row align-items-center">
                        <input type={'text'} className="form-control form-control-sm mx-3" placeholder="search" />
                        <Link href={'/post'}><button className="btn btn-success mx-2">post</button></Link>
                    </div>
                </div>
                <div className="container d-flex flex-row flex-wrap">
                    {
                        json.map(item => {
                            item.img = item.img ? item.img : 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'
                            return (
                                <Link href={`./blog/article?id=${item.id}`}>
                                    <div className="blog-logo rounded text-white p-1 m-5 d-flex flex-column align-items-center">
                                        <div className="img-container">
                                            <img src={item.img} className="w-100 rounded" />
                                        </div>
                                        <p className="fs-2 fw-bold text-center m-2 p-0 border-top border-light">{item.title}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                {checkLoad(load)}
            </div>
    )
}