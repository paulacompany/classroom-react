import React from "react"
import { useSelector } from "react-redux"

export default function Title() {
    let data = useSelector(state => state.look.data)

    if(!data){
        return <></>
    }else{
        return (
            <p>{data.date}</p>
        )
    }
    


}