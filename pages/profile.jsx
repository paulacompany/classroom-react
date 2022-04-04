import React, { useState, useEffect } from "react"
import { reactLocalStorage } from 'reactjs-localstorage';
import { useRouter } from "next/router";
import { BLOG_URL, LOGIN } from "../env/config";
import Link from "next/link";
const FormData = require('form-data');

export default function Profile() {

    let route = useRouter()

    let [isProFile, setIsProFile] = useState('false')
    let [result, setResult] = useState([])

    useEffect(() => {
        let isProFileInComputer = reactLocalStorage.get('profile') ? reactLocalStorage.get('profile') : 'false'
        setIsProFile(isProFileInComputer)
    }, [])


    function checkIsProFile() {


        function turnToOn(){
            reactLocalStorage.set('profile', 'true')
            route.push('/')
        }

        function turnToOff(){
            reactLocalStorage.set('profile', 'false')
            route.push('/')
        }



        if (isProFile == 'true') {
            return (
                <button className="btn btn-danger" onClick={turnToOff}>On</button>
            )
        } else {
            return (
                <button className="btn btn-primary" onClick={turnToOn} >Off</button>
            )
        }
    }

    useEffect(()=>{
        let FormBody = new FormData()

        let email = reactLocalStorage.get('email')
        let profile = reactLocalStorage.get('profile')

        function getPost(number){

            
            

            number.map(item=>{

                FormBody.append('mode', 'get')
                FormBody.set('sheetid', item)

                fetch(BLOG_URL, {
                    method: 'post',
                    body: FormBody
                }).then(res=>{
                    return res.json()
                }).then(data=>{
                    setResult(prop => {
                        return [
                            ...prop,
                            data
                        ]
                    })
                    
                })
            })

        }

        


        if(profile == 'true'){
            fetch(`${LOGIN}?mode=getpersonpost&email=${email}`).then(res=>{
                return res.text()
            }).then(data=>{
                data = data.replace(', ', '')

                getPost(JSON.parse("[" + data + "]"))
            })
        }else{
            return
        }

        return ()=>{
            setResult([])
        }

    }, [])


    useEffect(()=>{
        console.log(result);
    }, [result])

    return (
        <div className="profile-container container">
            <h1 className="m-5">Profile</h1>
            <div className="d-flex flex-row align-items-center">
                <p className="h4 m-4">Profile mode:</p>
                {checkIsProFile()}
            </div>
            <div className="container d-flex flex-row flex-wrap">
                    {
                        result.map(item => {
                            item.img = item.img ? item.img : 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'

                            if(!item.title){
                                return
                            }
                            
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
        </div>
    )
}
