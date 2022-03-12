import React from "react";
import { book } from "../public/resouces";

export default function Book({setBook}){

    function addBook(item){
        setBook(item)
    }

    return(
        <div>
            <p className="d-block h2 m-3">書:</p>
            <div className="d-flex flex-row flex-wrap">
                {
                    book.map(item => {
                        return (
                            <button className="btn btn-primary m-2" onClick={()=>{ addBook(item) }}>{item}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}
