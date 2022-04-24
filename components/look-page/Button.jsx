import React from "react"

export default function Button({look, setLook, isDel, setIsDel, alert, setAlert}){

    function lastDay(){
        if(look - 1 < -14){
            setAlert('LAST')
            return
        }
        setLook(prop => {
            prop--
            return prop
        })
    }

    function nextDay(){
        if(look + 1 > 0){
            setAlert('NEWEST')
            return
        }
        setLook(prop => {
            prop++
            return prop
        })
    }

    function today(){
        setLook(0)
    }

    function del(){
        if(!isDel){
            setIsDel(true)
        }else{
            setIsDel(false)
        }
    }

    return(
        <div className="m-5 mx-0">
            <button className="btn btn-warning m-4" onClick={lastDay}>last day</button>
            <button className="btn btn-success m-4" onClick={nextDay}>next day</button>
            <button className="btn btn-primary m-4" onClick={today}>today</button>
            <button className="btn btn-danger m-4" onClick={del}>delete</button>
        </div>
    )
}