import React from "react";

export default function Button({ setClick }){

    return(
        <button className="btn btn-warning btn-lg m-2" onClick={()=>{ setClick(true) }}>Save</button>
    )
}