import React from "react";

export default function Login({ setLogin, login }) {


    return (

        <input type={'password'} className="rounded m-4 h5 p-1" placeholder="password" onChange={e => setLogin(e.target.value)} value={login} />

    )
}