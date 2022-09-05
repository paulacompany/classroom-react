import React, { useEffect, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"
import { profileSetting } from "../common/global/resouces"
import Alert from "../components/Alert"
import { GOOGLE_SHEET_URL } from "../env/config"
import { LOGIN } from "../env/config"

export default function Profile() {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [photo, setPhoto] = useState('')
    let [data, setData] = useState('')
    let [key, setKey] = useState('')
    let [alert, setAlert] = useState('')
    let [classType, setClassType] = useState('')
    let [classTypePassword, setClassTypePassword] = useState(false)

    useEffect(() => {
        let localEmail = reactLocalStorage.get('email')
        let localPassword = reactLocalStorage.get('password')
        setEmail(localEmail)
        setPassword(localPassword)
        if (!localEmail) {
            location.href = '/'
        }
        getUserInfo()
        async function getUserInfo() {
            let res = await fetch(`${LOGIN}?email=${localEmail}&password=${localPassword}&mode=login`)
            let data = await res.json()
            if (data.status != 200) location.href = '/'
            setName(data.data.name)
            setPhoto(data.data.photo)
            setClassType(data.data.register)
            setClassTypePassword(data.data.one)
        }
    }, [])

    async function edit() {
        let res = await fetch(`${LOGIN}?email=${email}&password=${password}&data=${data}&key=${key}&mode=edit`)
        let status = await res.json()
        if (status.status == 200) {
            location.reload()
        } else {
            setAlert('ERROR')
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    }
    function handlePressEnter(e) {
        if (e.key == 'Enter') {
            edit()
        }
    }
    function handleDataChange(e) {
        setData(e.target.value)
    }
    function handleKeyChange(e) {
        setKey(e.target.value)
        setData('')
    }
    async function handleEnableClass(e){
        let res = await fetch(`${GOOGLE_SHEET_URL}?email=${email}&emailpassword=${password}&mode=register`)
        let status = await res.json()
        if(status.status == 200){
            location.href = '/editor'
        }else{
            location.href = '/'
        }
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            <Alert alert={alert} setAlert={setAlert} />
            <div className="container profile-container row">
                <div className="mt-4 col-12 col-sm-4">
                    <div className="profile-person-photo-container">
                        <img src={photo ? photo : '/img/gray.png'} alt="photo" className="h-100" />
                    </div>
                    <h1>{name}</h1>
                    <p>{email}</p>
                    <div className="d-flex flex-column">
                        <div className="mb-2">
                            <ul className="list-group">
                                {
                                    profileSetting.map(item => {
                                        return (
                                            <li className="list-group-item">{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mt-2">
                            <h1 className="h5 text-secondary">Setting:</h1>
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="inputGroupSelect01">Key</label>
                                <select className="form-select" id="inputGroupSelect01" onChange={handleKeyChange}>
                                    <option selected>Choose...</option>
                                    {
                                        profileSetting.map(item => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text h-100" for="basic-addon1">Data</span>
                                <input
                                    type={(key.match(/password/i) == 'password') ? 'password' : 'text'}
                                    className="form-control h-100"
                                    placeholder="Username"
                                    id="basic-addon1"
                                    onKeyDown={handlePressEnter}
                                    onChange={handleDataChange}
                                    value={data}
                                />
                            </div>
                            <p>After you create the class and password click this to enable.</p>
                            <button
                                className="btn btn-dark"
                                onClick={handleEnableClass}
                            >
                                enable class
                            </button>
                            <p>Your class: {classType}</p>
                            {classTypePassword ? 'You already setting the class password' : 'You haven\'t setting the class password'}
                        </div>
                    </div>
                </div>
                <div className="col-8 d-none d-sm-flex">
                    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                        <p>尚未推出功能</p>
                    </div>
                </div>
            </div>
        </div>
    )
}