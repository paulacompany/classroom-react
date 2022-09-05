import React, { useEffect, useRef } from "react";
import Preview from "../components/editor-page/Preview.jsx";
import Content from "../components/editor-page/Content.jsx";
import Alert from "../components/Alert.jsx";
import { reactLocalStorage } from 'reactjs-localstorage';
import EditorPageReducer from "../common/redux/reducer/EditorPageReducer.js";
import { useDispatch, useSelector } from "react-redux";

export default function Editor() {

    let dispatch = useDispatch()
    let alert = useSelector(state => state.editor.alert)
    let password = useSelector(state => state.editor.password)
    let type = useSelector(state => state.editor.type)
    let firstTime = useRef(true)

    useEffect(() => {
        if (firstTime.current) {
            let localPassword = reactLocalStorage.get('classPassword')
            let localType = reactLocalStorage.get('type')
            if(localPassword){
                dispatch(EditorPageReducer.actions.password(localPassword))
            }
            if(localType){
                dispatch(EditorPageReducer.actions.type(localType))
            }
            
            
            firstTime.current = false
        }else{
            reactLocalStorage.set('type', type)
            reactLocalStorage.set('classPassword', password)
        }
    }, [password, type])

    function clearAlert(value){
        dispatch(EditorPageReducer.actions.alert(value))
    }

    return (
        <div className="container p-5">
            <Alert alert={alert} setAlert={clearAlert} />
            <Preview />
            <Content />
        </div>

    )
}