import React, { useState, useEffect, useRef } from "react";
import { alertDataDb } from "../common/global/resouces";
import { useDispatch } from "react-redux";
/**
     * OverRange:
     *      NEWEST -- > 0
     *      LATEST -- < -14
     * Delete:
     *      DELETE OK
     *      PASSWORD ERROR
     *      ERROR
     * TEST:
     *     CORRECT
     *      WRONG
     *
     * 
     */


export default function Alert({ alert, reducer }) {

    let [message, setMessage] = useState('')
    let [classData, setClassData] = useState('')
    let firstTime = useRef(true)
    let dispatch = useDispatch()

    function setMessageState(messageProp, classDataProp) {
        setMessage(messageProp)
        setClassData(classDataProp)
    }

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        if(!alert) return
        switch (alert) {
            case 'LAST':
                setMessageState(
                    alertDataDb.LAST.message,
                    alertDataDb.LAST.classData)
                    break;
            case 'NEWEST':
                setMessageState(
                    alertDataDb.NEWEST.message,
                    alertDataDb.NEWEST.classData
                )
                break;
            case 'OK':
                setMessageState(
                    alertDataDb.DELETE_OK.message,
                    alertDataDb.DELETE_OK.classData
                )
                break;
            case 'PASSWORD ERROR':
                setMessageState(
                    alertDataDb.PASSWORD_ERROR.message,
                    alertDataDb.PASSWORD_ERROR.classData
                )
                break;
            case 'ERROR':
                setMessageState(
                    alertDataDb.ERROR.message,
                    alertDataDb.ERROR.classData
                )
                break;
            case 'CORRECT':
                setMessageState(
                    alertDataDb.CORRECT.message,
                    alertDataDb.CORRECT.classData
                )
                break;
            case 'WRONG':
                setMessageState(
                    alertDataDb.WRONG.message,
                    alertDataDb.WRONG.classData
                )
                break;
        }
        setTimeout(() => {
            dispatch(reducer(''))
        }, 1000);
        console.log('hihihi');
    }, [alert])

    if (!alert) return ''

    return (
        <div className={`alert alert-${classData} d-flex align-items-center mx-0 m-4`} role="alert">
            <p className="h5">{message}</p>
        </div>
    )



}