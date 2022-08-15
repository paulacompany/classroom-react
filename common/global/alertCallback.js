export function alertCallback(action, setAlert) {
    
    

    function getAlertJsx(message, classData) {
        return (
            <div className={`alert alert-${classData} d-flex align-items-center mx-0 m-4`} role="alert">
                <p className="h5">{message}</p>
            </div>
        )
    }
    
}