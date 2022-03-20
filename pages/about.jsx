import React from "react"
import Author from "../components/about/Author"
import Use from "../components/about/Use"

export default function About() {

    return (
        <>
            <div className="about d-flex flex-column justify-content-center align-items-center">
                <p className="display-1 about-title m-5">About us</p>
                <p className="h2 about-intro m-3">Learn more about this</p>
                <button className="btn btn-secondary m-5 btn-lg">Continue</button>
            </div>
            <div className="container-fluid p-3">
                <Author />
                <Use />
            </div>
        </>
    )
}