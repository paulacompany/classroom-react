import React, { useState, useEffect } from "react";
import { LOGIN } from "../../env/config";

export default function MyProfile({ email, json }) {


    let [name, setName] = useState('');
    let [img, setImg] = useState('');

    useEffect(() => {
        getNameAndImg()
        async function getNameAndImg() {
            let resName = await fetch(`${LOGIN}?email=${email}&mode=getname`)
            let dataName = await resName.text()
            setName(dataName)
            let resImg = await fetch(`${LOGIN}?email=${email}&mode=getimg`)
            let dataImg = await resImg.text()
            setImg(dataImg)
        }
    }, [])

    return (
        <div className="bg-dark rounded p-5 text-white d-flex justify-content-around flex-fill">
            <img src={img ? img : '/img/gray.png'} className="d-inline rounded-3 userimg" alt="my photo" />
            <div className="d-flex flex-column justify-content-center">
                <p className="h3 m-2">{name}</p>
                <p className="text-secondary h-4 m-2">article: {json.length}</p>
            </div>
        </div>
    )
}