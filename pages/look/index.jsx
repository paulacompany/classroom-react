import React, { useState, useEffect, useRef } from "react"
import GOOGLE_SHEET_URL from "../../env/config"
import Bottom from "../../lib/look/bottom";
import del from "../../lib/look/delete";

export default function Look() {

    let [look, setLook] = useState(0);
    let [date, setDate] = useState('Wait...');
    let [content, setContent] = useState();

    let [delState, setDelState] = useState('');

    let [alert, setAlert] = useState(<div></div>);

    let [iElstate, setIElstate] = useState(false)


    let isFirstTime = useRef(false)


    function render(data, mode) {

        let dateRender = data[0].year + '年' + data[0].month + '月' + data[0].dateToday + '日' + '星期' + data[0].day 

        let contentRender = data.map((item, i) => {
            if (mode == 'user') {
                if (item.del != 'Del') {
                    return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + item.des}<i className={'bi bi-x-circle-fill mx-3 text-danger'} style={{ display: iElstate ? 'inline' : 'none' }} onClick={() => { del(setDelState, i) }}></i></li>
                }
            } else {
                if (item.del != 'Del') {
                    return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + item.des}<i className={'bi bi-x-circle-fill mx-3 text-danger'} style={{ display: iElstate ? 'inline' : 'none' }} onClick={() => { del(setDelState, i) }}></i></li>
                } else {
                    return <li className="fs-4 text-decoration-line-through">{item.date + item.action + item.subject + item.book + item.pages + item.des}<i className={'bi bi-x-circle-fill mx-3 text-danger'} style={{ display: iElstate ? 'inline' : 'none' }} onClick={() => { del(setDelState, i) }}></i></li>

                }
            }

        })
        setDate(dateRender)
        setContent(contentRender)
    }


    useEffect(() => {
        fetch(`${GOOGLE_SHEET_URL}?look=${look}&mode=look`).then((res) => {
            return res.json()
        }).then((data) => {
            if (iElstate) {
                render(data, 'del')
            } else {
                render(data, 'user')
            }

        })


    }, [look, iElstate])

    useEffect(() => {
        if (isFirstTime.current) {
            if (delState == 'ok') {
                setAlert(
                    <div className="alert alert-success d-flex align-items-center m-4" role="alert">
                        <p className="h5">Delete success!</p>
                    </div>
                )
            } else if (delState == 'password error') {
                setAlert(
                    <div className="alert alert-warning d-flex align-items-center m-4" role="alert">
                        <p className="h5">Your password is wrong</p>
                    </div>
                )
            } else {
                setAlert(
                    <div className="alert alert-danger d-flex align-items-center m-4" role="alert">
                        <p className="h5">Wrong!!</p>
                    </div>
                )
            }
            setTimeout(() => {
                setAlert(<div></div>)
            }, 2000)
        } else {
            isFirstTime.current = true
            return
        }
    }, [delState])


    return (
        <div className="lookContainer container">
            {alert}
            <div className="fs-2 m-5">
                {date}
            </div>
            <ul className="item m-4">
                {content}
            </ul>
            <Bottom look={look} setAlert={setAlert} setLook={setLook} iElstate={iElstate} setIElstate={setIElstate} />
        </div>
    )

}