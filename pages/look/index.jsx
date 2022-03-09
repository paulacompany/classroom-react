import React, { useState, useEffect, useRef } from "react"
import { GOOGLE_SHEET_URL } from "../../env/config"
import Bottom from "./bottom";

export default function Look() {

    let [look, setLook] = useState(0);
    let [date, setDate] = useState();
    let [content, setContent] = useState();


    function render(data) {

        let dateRender = data[0].year + '年' + data[0].month + '月' + data[0].dateToday + '日'

        let contentRender = data.map((item) => {
            if (item.del != 'Del') {
                return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + item.des}</li>
            }
        })
        setDate(dateRender)
        setContent(contentRender)
    }


    useEffect(() => {
        fetch(`${GOOGLE_SHEET_URL}?look=${look}&mode=look`).then((res) => {
            return res.json()
        }).then((data) => {
            render(data)
        })
    }, [look])



    return (
        <div className="lookContainer container">
            <div className="fs-2 m-5">
                {date}
            </div>
            <ul className="item m-4">
                {content}
            </ul>
            <Bottom />
        </div>
    )

}