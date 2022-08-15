import React, { useEffect } from "react";
import Preview from "../components/editor-page/Preview.jsx";
import Content from "../components/editor-page/Content.jsx";
import Alert from "../components/Alert.jsx";
import { reactLocalStorage } from 'reactjs-localstorage';
import EditorPageReducer from "../common/redux/reducer/EditorPageReducer.js";
import { useDispatch, useSelector } from "react-redux";

export default function Editor() {

    let dispatch = useDispatch()
    let alert = useSelector(state => state.editor.alert)

    useEffect(() => {
        let password = reactLocalStorage.get('password')
        dispatch(EditorPageReducer.actions.password(password))
    }, [])

    return (
        <div className="container p-5">
            <Alert alert={alert} reducer={EditorPageReducer.actions.alert} />
            <Preview />
            <Content />
        </div>

    )
}