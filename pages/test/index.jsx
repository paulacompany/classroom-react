import React from "react";
import Link from "next/link";

export default function Test() {

    return (
        <div className="test-container container mt-5">
            <div className="d-flex align-items-center">
                <h1 className="w-100">testing place</h1>
                <div className="w-100 d-flex justify-content-end align-items-center">
                    <input type="text" className="form-control w-100 mx-1" placeholder="Search" />
                    <Link href={'/test/contribution'}><button className="btn btn-success mx-1">contribution</button></Link>
                </div>
            </div>
        </div>
    )
}