export function alertCallback(action, setAlert) {
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
    let alertDataDb = {
        LAST: {
            message: 'Wrong! This is the last day\'s record. Please click the "today" button.',
            classData: 'danger'
        },
        NEWEST: {
            message: 'Warning! This is the newest data.',
            classData: 'warning'
        },
        DELETE_OK: {
            message: 'successful!',
            classData: 'success'
        },
        PASSWORD_ERROR: {
            message: 'Incorrect password.',
            classData: 'warning',
        },
        ERROR: {
            message: 'An unknown error has occurred. Please try again later.',
            classData: 'danger'
        },
        CORRECT: {
            message: 'answer correct!!',
            classData: 'success'
        },
        WRONG:{
            message: 'answer wrong!!',
            classData: 'danger'
        }

    }

    function getAlertJsx(message, classData) {
        setTimeout(()=>{
            setAlert('')
        }, 3000)
        return (
            <div className={`alert alert-${classData} d-flex align-items-center mx-0 m-4`} role="alert">
                <p className="h5">{message}</p>
            </div>
        )
    }
    if (action === 'LAST') {
        return getAlertJsx(
            alertDataDb.LAST.message,
            alertDataDb.LAST.classData)
    }
    if (action === 'NEWEST') {
        return getAlertJsx(
            alertDataDb.NEWEST.message,
            alertDataDb.NEWEST.classData
        )
    }
    if (action === 'OK') {
        return getAlertJsx(
            alertDataDb.DELETE_OK.message,
            alertDataDb.DELETE_OK.classData
        )
    }
    if (action === 'PASSWORD ERROR') {
        return getAlertJsx(
            alertDataDb.PASSWORD_ERROR.message,
            alertDataDb.PASSWORD_ERROR.classData
        )
    }
    if (action === 'ERROR') {
        return getAlertJsx(
            alertDataDb.ERROR.message,
            alertDataDb.ERROR.classData
        )
    }
    if(action === 'CORRECT'){
        return getAlertJsx(
            alertDataDb.CORRECT.message,
            alertDataDb.CORRECT.classData
        )
    }
    if(action === 'WRONG'){
        return getAlertJsx(
            alertDataDb.WRONG.message,
            alertDataDb.WRONG.classData
        )
    }
}