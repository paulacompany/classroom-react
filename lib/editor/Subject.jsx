import React from "react";
import { subject as subjectText } from "../public/resouces";

export default function Subject({ setSubject, subject }) {

    function addSubject(item) {
        let subjectIndex = subject.indexOf(item)

        if(subjectIndex <= -1){

            setSubject(prop => [
                ...prop,
                item
            ])
            
            

        }else{
            setSubject(subject.filter((value)=>{
                return value !== item
            }))
        }

        
    }

    return (
        <div>
            <p className="d-block h2 m-3">科目:</p>
            <div className="d-flex flex-row flex-wrap">
                {
                    subjectText.map(item => {
                        return (
                            <button className="btn btn-primary m-2" onClick={() => { addSubject(item) }}>{item}</button>
                        )
                    })
                }
            </div>
        </div>

    )
}