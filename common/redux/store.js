import { configureStore, combineReducers } from "@reduxjs/toolkit";
import EditorPageReducer from "./reducer/EditorPageReducer";
import LookPageReducer from "./reducer/LookPageReducer";
import BlogPageReducer from "./reducer/BlogPageReducer"

const EditorPageReducerFormat = EditorPageReducer.reducer
const LookPageReducerFormat = LookPageReducer.reducer
const BlogPageReducerFormat = BlogPageReducer.reducer

const rootReducer = combineReducers({
    editor: EditorPageReducerFormat,
    look: LookPageReducerFormat,
    blog: BlogPageReducerFormat
})


const store = configureStore({
    reducer: rootReducer
})

export default store