import React from "react";
import { tify } from "chinese-conv";

export default function Page({setPages, pages}){

    return(
        <div>
            <p className="d-block h2 m-3">頁數:</p>
            <input type={'text'} className="m-4" placeholder="p.1 - p.5" onChange={e=>setPages(tify(e.target.value))} value={pages}/>
        </div>
    )
}