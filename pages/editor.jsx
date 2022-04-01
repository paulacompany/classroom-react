import React, { useEffect, useRef, useState } from "react";
import Subject from "../components/editor/Subject";
import Doing from "../components/editor/Doing";
import Book from "../components/editor/Book";
import Date from "../components/editor/Date";
import Page from "../components/editor/Page";
import Des from "../components/editor/Des";
import Login from "../components/editor/Login";
import Submit from "../components/editor/Submit";
import View from "../components/editor/View";
import {GOOGLE_SHEET_URL} from "../env/config"
import moment from "moment";
import { change, howManyDaysLeft } from "../public/change";
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Editor() {


    let [passwordFromUser, setPasswordFromUser] = useState('');

    useEffect(()=>{
        let password = reactLocalStorage.get('password') ? reactLocalStorage.get('password') : passwordFromUser
        setPasswordFromUser(password)
    },[])

    let [subject, setSubject] = useState([]);
    let [doing, setDoing] = useState('');
    let [book, setBook] = useState('');
    let [date, setDate] = useState('');
    let [pages, setPages] = useState('');
    let [des, setDes] = useState('');

    

    let [logDate, setLogDate] = useState('');

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
        setLogDate('');
    }

    let todayYear = moment().format('YYYY')
    let todayMonth = moment().format('MM')
    let todayDate = moment().format('DD')
    let todayDay = moment().format('d')

    let DateDay = moment(date, "YYYY[-]MM[-]DD").format('d')//執行時間的星期

    let spendDay = moment(`${todayYear}-${todayMonth}-${todayDate}`).to(date)

    useEffect(() => {

        if (spendDay == 'a few seconds ago') {
            setLogDate('今天')
        } else if (spendDay == 'in a day') {
            setLogDate('明天')
        } else if (spendDay == 'in 2 days') {
            setLogDate('後天')
        } else if (spendDay == 'in 7 days') {
            setLogDate('下禮拜')
        } else {
            //把 in xx days 的文字拿掉
            spendDay = spendDay.replace('in', '')
            spendDay = spendDay.replace('days', '')
            spendDay = Number(spendDay)

            if (howManyDaysLeft(todayDay) + 6 > spendDay) {
                if (howManyDaysLeft(todayDay) <= spendDay) {
                    setLogDate('下星期' + change(DateDay))
                } else {
                    setLogDate('星期' + change(DateDay))
                }
            } else {
                setLogDate(date);
            }

        }

    }, [date])




    useEffect(() => {

        if (!clickRef.current) {
            clickRef.current = true
        } else {
            let fetchUrl = `${GOOGLE_SHEET_URL}?year=${todayYear}&month=${todayMonth}&datetoday=${todayDate}&day=${todayDay}&subject=${subject}&action=${doing}&book=${book}&date=${logDate}&pages=${pages}&des=${des}&password=${passwordFromUser}&mode=select`
            fetch(fetchUrl).then((res) => {
                clean()
                return res.text()
            }).then((status) => {
                if (status == 'ok') {
                    setAlert(
                        <div className="alert alert-success d-flex align-items-center" role="alert">
                            <p className="h5">SUCCESS!!! It will be disappear few second later</p>
                        </div>
                    )
                } else if (status == 'password error') {
                    setAlert(
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                            <p className="h5">Oops!!! Please try again. The password is wrong.</p>
                        </div>
                    )
                } else {
                    setAlert(
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <p className="h5">Oops!!! Please try again. {status}</p>
                        </div>
                    )
                }
                setTimeout(() => {
                    setAlert(<div></div>);
                }, 2000)
            })

        }
    }, [clickStatus])

    return (
        <div className="container p-5">
            {alert}
            <View subject={subject} doing={doing} book={book} date={logDate} pages={pages} des={des} />
            <Subject setSubject={setSubject} subject={subject} />
            <Doing setDoing={setDoing} />
            <Book setBook={setBook} />
            <Date setDate={setDate} />
            <Page setPages={setPages} pages={pages} />
            <Des setDes={setDes} des={des} />
            <Login passwordFromUser={passwordFromUser} setPasswordFromUser={setPasswordFromUser} />
            <Submit setClickStatus={setClickStatus} />
        </div>
    )
}