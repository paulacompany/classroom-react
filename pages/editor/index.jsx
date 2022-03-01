import React, { useEffect, useRef, useState } from "react";
import Subject from "./components/Subject";
import Doing from "./components/Doing";
import Book from "./components/Book";
import Date from "./components/Date";
import Page from "./components/Page";
import Des from "./components/Des";
import Submit from "./components/Submit";
import View from "./components/View";
import { GOOGLE_SHEET_URL } from "../../env/config"

export default function Editor() {

    let [subject, setSubject] = useState([]);
    let [doing, setDoing] = useState('');
    let [book, setBook] = useState('');
    let [date, setDate] = useState('');
    let [pages, setPages] = useState('');
    let [des, setDes] = useState('');
    let clickRef = useRef(false);
    let [clickStatus, setClickStatus] = useState(0);


    useEffect(() => {

        if (!clickRef.current) {
            clickRef.current = true
        } else {
            let fetchUrl = `${GOOGLE_SHEET_URL}?year=2022&month=02&datetoday=28&day=${1}&subject=${subject}&action=${doing}&book=${book}&date=${date}&pages=${pages}&des=${des}&password=mouse0609`
            fetch(fetchUrl).then((res) => {
                return res.status
            }).then((status)=>{
                alert(status==200 ? "成功" : "失敗")
            })

        }
    }, [clickStatus])

    return (
        <div className="container p-5">
            <View subject={subject} doing={doing} book={book} date={date} pages={pages} des={des} />
            <Subject setSubject={setSubject} subject={subject} />
            <Doing setDoing={setDoing} />
            <Book setBook={setBook} />
            <Date setDate={setDate} />
            <Page setPages={setPages} />
            <Des setDes={setDes} />
            <Submit setClickStatus={setClickStatus} />
        </div>
    )
}