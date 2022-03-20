import React from "react";
import { doing } from "../../public/resouces";
export default function Doing({ setDoing }) {

    function addDoing(item){
        setDoing(item)
    }

    return (
        <div>
            <p className="d-block h2 m-3">動作: </p>
            <div className="d-flex flex-row flex-wrap"></div>
            {
                doing.map((item, i) => {
                    return (
                        <button className="btn btn-dark m-2 text-white" onClick={()=>{ addDoing(item) }}>{item}</button>
                    )

                })
            }
        </div>

    )
}
