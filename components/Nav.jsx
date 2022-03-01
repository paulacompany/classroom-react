import Link from "next/link";
import React from "react";

export default function nav() {

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
                            <Link href={'/about'}><a className="nav-link">About</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}