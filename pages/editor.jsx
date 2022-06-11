import React, { useEffect, useState } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import { tify } from "chinese-conv";
import { subjectText, doingText, bookText } from "../common/resouces.js";
import { alertCallback } from "../common/alertCallback.js";

import {
    addSubject,
    addDoing,
    addBook,
    getTheFormatDate,
    sendDataToDataBase
} from "../components/editor-page/function.js";

export default function Editor() {

    let [password, setPassword] = useState('');
    let [subject, setSubject] = useState([]);
    let [doing, setDoing] = useState('');
    let [book, setBook] = useState('');
    let [date, setDate] = useState('');
    let [pages, setPages] = useState('');
    let [des, setDes] = useState('');
    let [desView, setDesView] = useState('');
    let [logDate, setLogDate] = useState('');
    let [clickStates, setClickStates] = useState(true);
    let [alert, setAlert] = useState('');

    useEffect(() => {
        let password = reactLocalStorage.get('password')
        setPassword(password)
    }, [])

    useEffect(() => {
        getTheFormatDate(setLogDate, date)
    }, [date])

    useEffect(() => {
        if (des) {
            setDesView(`(${des})`)
        } else {
            setDesView(des)
        }
    }, [des])

    return (
        <div className="container p-5">
            {alertCallback(alert, setAlert)}
            <div>
                <div className="w-100 bg-info m-4 mx-0 d-flex align-items-center flex-row p-4 rounded">
                    <p className="m-0 h5">{logDate}{doing}{subject}{book}{pages}{desView}</p>
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">科目:</p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        subjectText.map(item => {
                            return (
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => {
                                        addSubject(item, subject, setSubject)
                                    }}>
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">動作: </p>
                <div className="d-flex flex-row flex-wrap"></div>
                {
                    doingText.map((item) => {
                        return (
                            <button
                                className="btn btn-dark m-2 text-white"
                                onClick={() => {
                                    addDoing(item, setDoing)
                                }}>
                                {item}
                            </button>
                        )

                    })
                }
            </div>
            <div>
                <p className="d-block h2 m-3">書:</p>
                <div className="d-flex flex-row flex-wrap">
                    {
                        bookText.map(item => {
                            return (
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => {
                                        addBook(item, setBook)
                                    }}>
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p className="d-block h2 m-3">日期:</p>
                <input type={'date'} className="m-4" onChange={e => setDate(e.target.value)} />
            </div>
            <div>
                <p className="d-block h2 m-3">頁數:</p>
                <input type={'text'} className="m-4" placeholder="p.1 - p.5" onChange={e => setPages(tify(e.target.value))} value={pages} />
            </div>
            <div>
                <p className="d-block h2 m-3">補充:</p>
                <textarea className="m-4 p-2" placeholder="記得要帶" onChange={e => setDes(tify(e.target.value))} value={des}></textarea>
            </div>
            <div>
                <p className="d-block h2 m-3">密碼:</p>
                <input type={'password'} className="m-4" placeholder="p.1 - p.5" onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <div>
                <button
                    className="btn btn-warning btn-lg m-4"
                    onClick={() => {
                        let dataObj = {
                            clickStates: clickStates,
                            setClickStates: setClickStates,
                            setAlert: setAlert,
                            subject: subject,
                            doing: doing,
                            book: book,
                            logDate: logDate,
                            pages: pages,
                            desView: desView,
                            password: password
                        }
                        sendDataToDataBase(dataObj)
                    }}
                >
                    送出
                </button>
            </div>
        </div>
    )
}