import { createSlice } from "@reduxjs/toolkit";

const initial = {
    password: '',
    subject: [],
    doing: '',
    book: '',
    date: '',
    pages: '',
    des: '',
    desView: '',
    clickStates: true,
    alert: ''
}

const EditorPageReducer = createSlice({
    name: 'EditorPageReducer',
    reducers: {
        password(state, action){
            state.password = action.payload
        },
        subject(state, action){
            state.subject = action.payload
        },
        doing(state, action){
            state.doing = action.payload
        },
        book(state, action){
            state.book = action.payload
        },
        date(state, action){
            state.date = action.payload
        },
        pages(state, action){
            state.pages = action.payload
        },
        des(state, action){
            state.des = action.payload
        },
        clickStates(state, action){
            state.clickStates = action.payload
        },
        alert(state, action){
            state.alert = action.payload
        }
    },
    initialState: initial
})

export default EditorPageReducer