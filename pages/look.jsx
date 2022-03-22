import React, { useState, useEffect, useRef } from "react"
import GOOGLE_SHEET_URL from "../env/config"
import Bottom from "../components/look/bottom";
import del from "../components/look/delete";
import rep from "../components/look/rep";
import { change } from "../public/change";

export default function Look() {

    let [look, setLook] = useState(0);
    let [date, setDate] = useState('Wait...');
    let [content, setContent] = useState();

    let [delState, setDelState] = useState('');

    let [repState, setRepState] = useState('');

    let [alert, setAlert] = useState(<div></div>);

    let [iElstate, setIElstate] = useState(false)


    let isFirstTime = useRef(false)


    function render(data, mode) {

        let dateRender = data[0].year + '年' + data[0].month + '月' + data[0].dateToday + '日' + '星期' + change(data[0].day)

        let contentRender = data.map((item, i) => {
            if (mode == 'user') {
                if (item.del != 'Del') {
                    return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + (item.des ? ('(' + item.des + ')') : item.des)}</li>
                }
            } else {
                if (item.del != 'Del') {
                    return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + (item.des ? ('(' + item.des + ')') : item.des)}<i className={'bi bi-x-circle-fill mx-3 text-danger'} style={{ display: 'inline' }} onClick={() => { del(setDelState, i, look) }}></i></li>
                } else {
                    return <li className="fs-4">{item.date + item.action + item.subject + item.book + item.pages + (item.des ? ('(' + item.des + ')') : item.des)}<i className={'bi bi-check mx-3 bg-success text-white rounded'} style={{ display: 'inline' }} onClick={() => { rep(setRepState, i, look);}}></i></li>

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


    }, [look, iElstate, alert])

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
            } else if (delState == 'wrong') {
                setAlert(
                    <div className="alert alert-danger d-flex align-items-center m-4" role="alert">
                        <p className="h5">Wrong!!</p>
                    </div>
                )
            } else {
                return
            }
            setTimeout(() => {
                setAlert(<div></div>)
            }, 2000)
        } else {
            isFirstTime.current = true
            return
        }
    }, [delState])

    useEffect(() => {
        if (isFirstTime.current) {
            if (repState == 'ok') {
                setAlert(
                    <div className="alert alert-success d-flex align-items-center m-4" role="alert">
                        <p className="h5">Undo success!</p>
                    </div>
                )
            } else if (repState == 'password error') {
                setAlert(
                    <div className="alert alert-warning d-flex align-items-center m-4" role="alert">
                        <p className="h5">Your password is wrong</p>
                    </div>
                )
            } else if (repState == 'wrong') {
                setAlert(
                    <div className="alert alert-danger d-flex align-items-center m-4" role="alert">
                        <p className="h5">Wrong!!</p>
                    </div>
                )
            } else {
                return
            }
            setTimeout(() => {
                setAlert(<div></div>)
            }, 2000)
        } else {
            isFirstTime.current = true
            return
        }
    }, [repState])


    return (
        <div className="lookContainer container d-flex flex-column justify-content-between">
            <div>
                {alert}
                <div className="fs-2 m-4">
                    {date}
                </div>
                <ul className="item m-4">
                    {content}
                </ul>
            </div>
            <Bottom look={look} setAlert={setAlert} setLook={setLook} iElstate={iElstate} setIElstate={setIElstate} />
        </div>
    )

}
