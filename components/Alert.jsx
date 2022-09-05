import React, { useState, useEffect, useRef } from "react";
import { alertDataDb } from "../common/global/resouces";
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


export default function Alert({ alert, setAlert }) {

    let [message, setMessage] = useState('')
    let [classData, setClassData] = useState('')
    let firstTime = useRef(true)

    function setMessageState(messageProp, classDataProp) {
        setMessage(messageProp)
        setClassData(classDataProp)
    }

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        if (!alert) return
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
            case 'HAVE_VERIFIED':
                setMessageState(
                    alertDataDb.HAVE_VERIFIED.message,
                    alertDataDb.HAVE_VERIFIED.classData
                )
                break;
            case 'VERIFIED_ERROR':
                setMessageState(
                    alertDataDb.VERIFIED_ERROR.message,
                    alertDataDb.VERIFIED_ERROR.classData
                )
                break;
            case 'CANNOT FIND USER':
                setMessage(
                    alertDataDb.CANNOT_FIND_USER.message,
                    alertDataDb.CANNOT_FIND_USER.classData
                )
                break;
        }
        setTimeout(()=>{
            setAlert('')
        }, 3000)
    }, [alert])

    if (!alert) return ''

    return (
        <div class={`alert alert-${classData} alert-dismissible fade show mx-0 m-4`} role="alert">
            <p>{message}</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )

}
