import React from "react"

export default function Bottom({setLook}){

    return(
        <div className="position-absolute bottom-0">
            <button className="btn btn-warning m-4">last day</button>
            <button className="btn btn-danger m-4">delete</button>
        </div>
    )
}