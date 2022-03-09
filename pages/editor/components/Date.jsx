import React from "react";

export default function Date({setDate}){

    return(
        <div>
            <p className="d-block h2 m-3">日期:</p>
            <input type={'date'} className="m-4" onChange={ e => setDate(e.target.value) } />
        </div>
    )
}
