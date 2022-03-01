import React from "react";

export default function Des({setDes}) {

    return (
        <div>
            <p className="d-block h2 m-3">補充:</p>
            <textarea className="m-4 p-2" placeholder="記得要帶" onChange={ e=>setDes(e.target.value)}></textarea>
        </div>

    )
}