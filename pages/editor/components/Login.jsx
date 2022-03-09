import React from "react";

export default function Login({ passwordFromUser, setPasswordFromUser }){

    return(
        <div>
            <p className="d-block h2 m-3">密碼(登入則不須填寫):</p>
            <input type={'password'} className="m-4" placeholder="p.1 - p.5" onChange={e=>setPasswordFromUser(e.target.value)} value={passwordFromUser}/>
        </div>
    )
}