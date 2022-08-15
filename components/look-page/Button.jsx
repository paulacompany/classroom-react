import React from "react"
import { useDispatch, useSelector } from "react-redux"
import LookPageReducer from "../../common/redux/reducer/LookPageReducer.js"

export default function Button(){
    let dispatch = useDispatch()
    let look = useSelector(state => state.look.look)
    let deleteState = useSelector(state => state.look.deleteState)

    function lastDay(){
        if(look - 1 < -14){
            dispatch(LookPageReducer.actions.setAlert('LAST'))
            return
        }
        dispatch(LookPageReducer.actions.setLook(-1))
    }

    function nextDay(){
        if(look + 1 > 0){
            dispatch(LookPageReducer.actions.setAlert('NEWEST'))
            return
        }
        dispatch(LookPageReducer.actions.setLook(1))
    }

    function today(){
        dispatch(LookPageReducer.actions.setLook({today: true}))
    }

    function del(){
        if(!deleteState){
            dispatch(LookPageReducer.actions.setDeleteState(true))
        }else{
            dispatch(LookPageReducer.actions.setDeleteState(false))
        }
    }

    return(
        <div className="m-5 mx-0">
            <button className="btn btn-warning m-4" onClick={lastDay}>back</button>
            <button className="btn btn-success m-4" onClick={nextDay}>next</button>
            <button className="btn btn-primary m-4" onClick={today}>today</button>
            <button className="btn btn-danger m-4" onClick={del}>delete</button>
        </div>
    )
}