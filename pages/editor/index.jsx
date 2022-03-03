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
import moment from "moment";
import { change, howManyDaysLeft } from "./public/change";

export default function Editor() {

    let [subject, setSubject] = useState([]);
    let [doing, setDoing] = useState('');
    let [book, setBook] = useState('');
    let [date, setDate] = useState('');
    let [pages, setPages] = useState('');
    let [des, setDes] = useState('');
    let clickRef = useRef(false);
    let [clickStatus, setClickStatus] = useState(0);
    let [alert, setAlert] = useState(<div></div>);

    function clean() {
        setSubject([]);
        setDoing('');
        setBook('');
        setDate('');
        setPages('');
        setDes('');
    }

    let todayYear = moment().format('YYYY')
    let todayMonth = moment().format('MM')
    let todayDate = moment().format('DD')
    let todayDay = moment().format('d')

    let DateDay = moment(date, "YYYY[-]MM[-]DD").format('d')//執行時間的星期

    let spendDay = moment(`${todayYear}-${todayMonth}-${todayDate}`).to(date)

    useEffect(() => {

        if (spendDay == 'a few seconds ago') {
            setDate('今天')
        } else if (spendDay == 'in a day') {
            setDate('明天')
        } else if (spendDay == 'in 2 days') {
            setDate('後天')
        } else if (spendDay == 'in 7 days') {
            setDate('下禮拜')
        } else {
            spendDay = spendDay.replace('in', '')
            spendDay = spendDay.replace('days', '')
            spendDay = Number(spendDay)
            console.log(spendDay);
            if (howManyDaysLeft(todayDay) + 7 > spendDay) {
                if (howManyDaysLeft(todayDay) <= spendDay) {
                    setDate('下星期' + change(DateDay))
                } else {
                    setDate('星期' + change(DateDay))
                }

            }

        }

    }, [date])




    useEffect(() => {

        if (!clickRef.current || !pages) {
            clickRef.current = true
        } else {
            let fetchUrl = `${GOOGLE_SHEET_URL}?year=${todayYear}&month=${todayMonth}&datetoday=${todayDate}&day=${todayDay}&subject=${subject}&action=${doing}&book=${book}&date=${date}&pages=${pages}&des=${des}&password=mouse0609`
            fetch(fetchUrl).then((res) => {
                clean()
                return res.status
            }).then((status) => {
                if (status == 200) {
                    setAlert(
                        <div className="alert alert-success" role="alert">
                            <p>SUCCESS!!! It will be disappear few second later</p>
                        </div>
                    )
                } else {
                    setAlert(
                        <div className="alert alert-danger" role="alert">
                            <p>Oops!!! Please try again.</p>
                        </div>
                    )
                }
                setTimeout(()=>{
                    setAlert(<div></div>);
                }, 2000)
            })

        }
    }, [clickStatus])

    return (
        <div className="container p-5">
            {alert}
            <View subject={subject} doing={doing} book={book} date={date} pages={pages} des={des} />
            <Subject setSubject={setSubject} subject={subject} />
            <Doing setDoing={setDoing} />
            <Book setBook={setBook} />
            <Date setDate={setDate} />
            <Page setPages={setPages} pages={pages} />
            <Des setDes={setDes} des={des} />
            <Submit setClickStatus={setClickStatus} />
        </div>
    )
}