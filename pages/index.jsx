import React from "react";
import Link from "next/link";

export default function Index() {

    return (
        <div className="w-100 background text-white">
            <div className="container d-flex flex-column backgroundcontainer align-items-center justify-content-center">
                <p className="display-1 indexcontainer text-center">Classroom website</p>
                <p className="h2 indexdes text-center">Click the button below and join us</p>
                <Link href={'/editor'}><button className="btn m-5 text-dark btn-light btn-lg">join us</button></Link>
            </div>

        </div>

    )

}