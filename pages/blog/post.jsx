import React, { useState, useRef, useEffect } from "react"
import { BLOG_URL, LOGIN } from "../../env/config";
import { useRouter } from 'next/router'
import { marked as markdown } from 'marked';
import getUser from "../../public/getUser";
const FormData = require('form-data');

export default function Post() {

    let router = useRouter()

    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('')
    let [emailPassword, setEmailPassword] = useState('')
    let [profile, setProfile] = useState('')
    let [img, setImg] = useState('');

    let bodyPreview = useRef();

    let FormBody = new FormData();


    function addToPersonSheet(id) {

        fetch(`${LOGIN}?mode=whosepost&email=${email}&password=${emailPassword}&number=${id}`).then(res => {
            return res.text()
        }).then(data => {
            console.log(data);
        })

    }

    function sendToBlogdataBase() {

        FormBody.append('title', title)
        FormBody.append('body', body)
        FormBody.set('password', password)
        FormBody.append('img', img)
        FormBody.set('mode', 'post')

        fetch(BLOG_URL, {
            method: 'post',
            body: FormBody
        }).then(res => {
            return res.text()
        }).then(data => {
            if (data != 'password error') {
                if (profile && email) {
                    addToPersonSheet(data)
                }
                router.push('/')
            } else {
                alert('Save error! please try again.')
            }
        })

    }

    function passwordButtonClick() {
        alert(`Your password is : \n${password}`)
    }

    useEffect(() => {
        bodyPreview.current.innerHTML = body
    }, [body])

    useEffect(() => {
        getUser(setEmail, setEmailPassword, setProfile)
    }, [])

    function bodyChange(e){
        if(profile == 'true'){
            setBody(markdown.parse(`${email}的文章\n${e.target.value}`))
        }else{
            setBody(markdown.parse(e.target.value))
        }
        
    }


    return (
        <div className="post-container mb-5 mt-2">
            <div className="d-flex flex-row align-items-center justify-content-between">
                <h1 className="display-1 m-5">Post</h1>
                <ul className="list-group mx-5">
                    <li className="list-group-item">
                        <p className="m-0">Please use the <code>markdown</code> to write the blog.</p>
                    </li>
                    <li className="list-group-item">
                        <p className="m-0">Write the clearly post.</p>
                    </li>
                    <li className="list-group-item">
                        <p className="m-0">Cannot use the "table" in the post.</p>
                    </li>
                </ul>
            </div>
            <div className="container">
                <label className="form-label h1 mb-2">title</label>
                <input type={"text"} className="form-control mb-5" maxLength={30} onChange={e => setTitle(e.target.value)} />

                <label className="form-label h1 mb-2">image</label>
                <input type={"url"} className="form-control mb-5" onChange={e => setImg(e.target.value)} />

                <label className="form-label h1 mb-2">body</label>
                <textarea className="form-control mb-5 body-area" onChange={bodyChange}>
                </textarea>

                <label className="form-label h1 mb-2">password</label>
                <input type={"password"} className="form-control mb-5" onChange={e => setPassword(e.target.value)} />

                <div className="mb-5">
                    <button className="btn btn-danger mx-2" onClick={sendToBlogdataBase}>submit</button>
                    <button className="btn btn-warning mx-2" onClick={passwordButtonClick}>alert password</button>
                </div>


                <div className="preview-container bg-light p-3" ref={bodyPreview}>
                </div>

            </div>
        </div>
    )
}
