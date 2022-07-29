import React from "react";
import Link from "next/link";

export default function Index() {

    return (
        <div className="w-100 background text-white">
            <div className="container d-flex flex-column backgroundcontainer align-items-center justify-content-center">
                <p className="display-1 indexcontainer text-center">Classroom website</p>
                <p className="h2 indexdes text-center">Click the button and learn more about us</p>
                <Link href={'/blog/article?id=37'}><button className="btn m-5 text-dark btn-light btn-lg">About us</button></Link>
            </div>

        </div>

    )

}