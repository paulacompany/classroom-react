import React from "react"
import { useSelector } from "react-redux"
import { change } from "../../common/global/change.js";

export default function Title() {
    let data = useSelector(state => state.look.data)

    if(!data[0]){
        return <></>
    }else{
        return (
            <p>{data[0].year}年{data[0].month}月{data[0].dateToday}日 星期{change(data[0].day)}</p>
        )
    }
    


}