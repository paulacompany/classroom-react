import React from "react"

export default function Bottom({ look, setAlert, setLook, iElstate, setIElstate }) {

    function lastDay() {
        if (look >= -14) {
            setLook(prop => {
                prop--
                return prop
            })
        } else {
            setAlert(
                <div className="alert alert-danger d-flex align-items-center m-5" role="alert">
                    <p className="h5">Wrong! This is the last day record. Please click "today" button.</p>
                </div>
            )

            setTimeout(() => {
                setAlert(<div></div>)
            }, 2000)
        }

    }

    function nextDay() {
        if (look != 0) {
            setLook(prop => {
                prop++
                return prop
            })

        } else {
            setAlert(
                <div className="alert alert-warning d-flex align-items-center m-5" role="alert">
                    <p className="h5">Waring! This is the newest data.</p>
                </div>
            )

            setTimeout(() => {
                setAlert(<div></div>)
            }, 2000)
        }
    }

    function today() {
        setLook(0)
    }

    function delFun() {
        if (iElstate) {
            setIElstate(!true)
        } else {
            setIElstate(!false)
        }
    }

    return (
        <div className="position-absolute bottom-0">
            <button className="btn btn-warning m-4" onClick={lastDay}>last day</button>
            <button className="btn btn-success m-4" onClick={nextDay}>next day</button>
            <button className="btn btn-primary m-4" onClick={today}>today</button>
            <button className="btn btn-danger m-4" onClick={delFun}>delete</button>
        </div>
    )
}