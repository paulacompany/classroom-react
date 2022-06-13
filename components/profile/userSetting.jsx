import React, { useState } from "react";
import { LOGIN } from "../../env/config";

export default function UserSetting({ email, password }) {

    let [name, setName] = useState('')
    let [img, setImg] = useState('')

    async function submit() {
        if (name && !img) {
            let res = await fetch(`${LOGIN}?email=${email}&password=${password}&name=${name}&mode=changename`)
            let data = await res.text()
            if (data == 'success') {
                alert('success')
            }
        } else if (!name && img) {
            let res = await fetch(`${LOGIN}?email=${email}&password=${password}&name=${img}&mode=changeimg`)
            let data = await res.text()
            if (data == 'success') {
                alert('success')
            }
        } else if (name && img) {
            let resName = await fetch(`${LOGIN}?email=${email}&password=${password}&name=${name}&mode=changename`)
            let dataName = await resName.text()
            let resImg = await fetch(`${LOGIN}?email=${email}&password=${password}&name=${img}&mode=changeimg`)
            let dataImg = await resImg.text()
            if (dataName == 'success' && dataImg == 'success') {
                alert('success')
            }
        }else{
            alert('please fill the field')
        }
        location.reload()
    }

    function setNameValue(e) {
        setName(e.target.value)
    }

    function setImgValue(e) {
        setImg(e.target.value)
    }

    return (
        <div className="p-5 rounded bg-light h-100 flex-fill">
            <p className="h5">User information setting:</p>
            <input
                type="text"
                className="form-control m-2"
                placeholder="Username"
                onChange={setNameValue}
            />
            <input
                type="text"
                className="form-control m-2"
                placeholder="User image"
                onChange={setImgValue}
            />
            <button
                className="btn btn-danger btn-sm m-2"
                onClick={submit}
            >
                submit
            </button>
        </div>
    )
}