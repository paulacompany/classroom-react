import React, { useState, useEffect } from "react";
import count from "../common/count.js";

export default function Footer() {

    let [countValue, setCountValue] = useState(0);
    
    useEffect(() => {
        count(setCountValue)
    }, [])

    return (
        <footer className="bg-dark d-flex justify-content-center align-items-center flex-column">
            <div className="p-5">
                <i class="bi bi-facebook text-white mx-2 h3"></i>
                <i class="bi bi-instagram text-white mx-2 h3"></i>
                <i class="bi bi-github text-white mx-2 h3"></i>
                <i class="bi bi-twitter text-white mx-2 h3"></i>
                <i class="bi bi-envelope text-white mx-2 h3"></i>
            </div>
            <div className="m-1 d-flex flex-row flex-wrap">
                <a className="h5 mx-2 text-white">Author</a>
                <a className="h5 mx-2 text-white">License</a>
                <a className="h5 mx-2 text-white">Server</a>
                <a className="h5 mx-2 text-white">Technology</a>
            </div>
            <div className="text-secondary m-1">
                <p>{countValue} people visit</p>
            </div>
            <div className="text-secondary m-1">
                <p className="h6">MIT Classroom ©</p>
            </div>
        </footer>
    )
}