import React from "react";

export default function View({ subject, doing, book, date, pages, des }) {

    if (des) {
        des = `(${des})`
    }

    return (
        <div>
            <div className="w-100 bg-info m-4 mx-0 d-flex align-items-center flex-row p-4 rounded">
                <p className="m-0 h5">{date}{doing}{subject}{book}{pages}{des}</p>
            </div>
        </div>
    )
}