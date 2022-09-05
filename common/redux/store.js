import { configureStore, combineReducers } from "@reduxjs/toolkit";
import EditorPageReducer from "./reducer/EditorPageReducer";
import LookPageReducer from "./reducer/LookPageReducer";

const EditorPageReducerFormat = EditorPageReducer.reducer
const LookPageReducerFormat = LookPageReducer.reducer

const rootReducer = combineReducers({
    editor: EditorPageReducerFormat,
    look: LookPageReducerFormat,
})


const store = configureStore({
    reducer: rootReducer
})

export default store