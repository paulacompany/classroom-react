import { createSlice } from "@reduxjs/toolkit";

const initial = {
    json: [],
    title: '',
    body: ''
}


const BlogPageReducer = createSlice({
    name: 'BlogPageReducer',
    reducers: {
        setJson(state, action){
            state.json = action.payload
        }
    },
    initialState: initial
})

export default BlogPageReducer