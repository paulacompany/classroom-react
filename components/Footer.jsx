import Link from "next/link";
import React from "react";

export default function Footer() {

    return (
        <>
            <footer className="bg-dark text-white w-100 d-flex flex-row align-items-center p-3 flex-wrap justify-content-between">
                <iframe src="https://www.youtube.com/embed/7gOy-Fvz94A?list=OLAK5uy_kfpJesvl7azPWhkT8EVrtDh1S_MNMOGhA" className="col-3 h-100" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div className="col m-0 mx-2">
                    <p className="m-1">License</p>
                    <p className="m-1">Email</p>
                    <p className="m-1">Github</p>
                    <p className="m-1">Gitlab</p>
                    <p className="m-1">Twitter</p>
                    <p className="m-1">FaceBook</p>
                    <p className="m-1">Line</p>
                </div>
                <div className="col m-0">
                    <p className="m-1">Author</p>
                    <p className="m-1">Contact</p>
                    <p className="m-1">Address</p>
                    <p className="m-1">Phone</p>
                    <p className="m-1">Learn</p>
                    <p className="m-1">Image</p>
                    <p className="m-1">Power</p>
                </div>
                <div className="col m-0">
                    <p className="m-1">Look</p>
                    <p className="m-1">Editor</p>
                    <p className="m-1">Setting</p>
                    <p className="m-1">Login</p>
                    <p className="m-1">Sign out</p>
                    <p className="m-1">About</p>
                    <p className="m-1">Chat</p>
                </div>
                <div className="col m-0">
                    <p className="m-1">Safe</p>
                    <p className="m-1">Use</p>
                    <p className="m-1">Price</p>
                    <p className="m-1">React</p>
                    <p className="m-1">Google</p>
                    <p className="m-1">Github server</p>
                    <p className="m-1">More</p>
                </div>
            </footer>
            <main className="w-100 bg-secondary d-flex justify-content-center align-items-center">
                <p className="m-3 h5 text-white">Classroom 2022 TW</p>
            </main>
        </>
    )
}