import React from "react";
import Link from "next/link";

export default function Error() {

    return (
        <div className="error-container d-flex flex-column justify-content-center align-items-center">
            <h1 className="fs-1">ERROR</h1>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <p>Something wrong with you</p>
                <Link href="/">
                    <button className="btn btn-lg btn-dark">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )
}