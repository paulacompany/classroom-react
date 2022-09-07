import React from "react";

export default function Footer() {

    return (
        <footer className="bg-dark d-flex justify-content-center align-items-center flex-column">
            <div className="p-4">
                <a href="https://www.facebook.com/"><i className="bi bi-facebook text-white mx-2 h3"></i></a>
                <a href="https://www.instagram.com/classroomeditor/"><i className="bi bi-instagram text-white mx-2 h3"></i></a>
                <a href="https://github.com/letterpaulsand"><i className="bi bi-github text-white mx-2 h3"></i></a>
                <a href="https://twitter.com/letterpaulweb"><i className="bi bi-twitter text-white mx-2 h3"></i></a>
                <a href="mailto:letterpaulsand@gmail.com"><i className="bi bi-envelope text-white mx-2 h3"></i></a>
            </div>
            <div className="m-3 d-flex flex-row flex-wrap">
                <a className="h5 mx-2 text-white" href="https://blog.classroomeditor.tk/2022/09/privacy-policy.html">Policy</a>
                <a className="h5 mx-2 text-white" href="https://blog.classroomeditor.tk/2022/07/what-is-this-blogger-about.html">License</a>
                <a className="h5 mx-2 text-white" href="https://blog.classroomeditor.tk/2022/07/what-is-this-blogger-about.html">Server</a>
                <a className="h5 mx-2 text-white" href="https://blog.classroomeditor.tk/2022/07/what-is-this-blogger-about.html">Technology</a>
            </div>
            <div className="text-secondary m-3">
                <p className="h6">MIT Classroom ©</p>
            </div>
        </footer>
    )
}