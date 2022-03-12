import React from "react";

export default function Submit({setClickStatus}){

    function clickAction(){
        
        setClickStatus(prop=>{
            prop++
            return prop
        })

    }

    return(
        <div>
            <button className="btn btn-warning btn-lg m-4" onClick={clickAction}>送出</button>
        </div>
    )
}