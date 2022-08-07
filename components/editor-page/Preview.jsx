import React from "react";
import { useSelector } from "react-redux";

export default function Preview() {
    let date = useSelector(state => state.editor.date)
    let doing = useSelector(state => state.editor.doing)
    let subject = useSelector(state => state.editor.subject)
    let book = useSelector(state => state.editor.book)
    let pages = useSelector(state => state.editor.pages)
    let des = useSelector(state => state.editor.des)

    return (
        <>
            <div className="w-100 bg-info m-4 mx-0 d-flex align-items-center flex-row p-4 rounded">
                <p className="m-0 h5">{date}{doing}{subject}{book}{pages}{des}</p>
            </div>
        </>
    )
}