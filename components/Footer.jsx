import React from "react";

export default function Footer() {

    return (
        <footer className="bg-dark d-flex justify-content-center align-items-center flex-column">
            <div className="p-4">
                <a href="https://www.facebook.com/"><i class="bi bi-facebook text-white mx-2 h3"></i></a>
                <a href="https://www.instagram.com/classroomeditor/"><i class="bi bi-instagram text-white mx-2 h3"></i></a>
                <a href="https://github.com/letterpaulsand"><i class="bi bi-github text-white mx-2 h3"></i></a>
                <a href="https://twitter.com/letterpaulweb"><i class="bi bi-twitter text-white mx-2 h3"></i></a>
                <a href="mailto:letterpaulsand@gmail.com"><i class="bi bi-envelope text-white mx-2 h3"></i></a>
            </div>
            <div className="m-3 d-flex flex-row flex-wrap">
                <a className="h5 mx-2 text-white" href="/blog/article?id=38">Privacy policy</a>
                <a className="h5 mx-2 text-white" href="/blog/article?id=30">License</a>
                <a className="h5 mx-2 text-white" href="/blog/article?id=30">Server</a>
                <a className="h5 mx-2 text-white" href="/blog/article?id=30">Technology</a>
            </div>
            <div className="text-secondary m-3">
                <p className="h6">MIT Classroom ©</p>
            </div>
        </footer>
    )
}