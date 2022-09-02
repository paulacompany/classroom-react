import Link from "next/link";
import React, { useEffect, useState } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';

export default function nav() {
    

    let [email, setEmail] = useState('');

    useEffect(() => {
        let emailLocal = reactLocalStorage.get('email') ? reactLocalStorage.get('email') : ''
        setEmail(emailLocal)
    }, [])
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href={'/'}><a className="navbar-brand">Classroom</a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link href={'/look'}><a className="nav-link">Look</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/editor'}><a className="nav-link">Editor</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/setting'}><a className="nav-link">Setting</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/blog'}><a className="nav-link">Blog</a></Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link href={'/test'}><a className="nav-link">Test</a></Link>
                        </li> */}
                        <li className="nav-item">
                            <Link href={'/profile'}><a className="nav-link">Profile</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/blog/article?id=37'}><a className="nav-link">About</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/login'}><a className="nav-link">Login</a></Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <span className="badge bg-danger">{email}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
