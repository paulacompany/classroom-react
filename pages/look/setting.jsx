import React, { useState, useEffect, useRef } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Setting() {

    let [type, setType] = useState('')
    let firstTime = useRef(true)

    useEffect(()=>{
        let localType = reactLocalStorage.get('type')
        setType(localType ? localType : '')
    }, [])

    useEffect(()=>{
        if(firstTime.current){
            firstTime.current = false
            return
        }
        reactLocalStorage.set('type', type)
    }, [type])

    return (
        <div className="mh-100 login-container d-flex flex-column justify-content-center align-items-center w-100">
            <div className="bg-light rounded p-3 login-content-container">
                <p className="h3 m-2">Class Type:</p>
                <p className="mx-2">auto save</p>
                <input type="text"
                    className="form-control mb-5"
                    onChange={e => {
                        setType(e.target.value)
                    }}
                    value={type}
                />
            </div>
        </div>
    )
}