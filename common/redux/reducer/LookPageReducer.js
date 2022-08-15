import { createSlice } from "@reduxjs/toolkit";

const initial = {
    password: '',
    look: 0,
    data: [],
    deleteState: false,
    loadState: false,
    alert: ''
}

const LookPageReducer = createSlice({
    name: 'LookPageReducer',
    initialState: initial,
    reducers: {
        setAlert(state, action){
            state.alert = action.payload
        },
        setLook(state, action){
            if(action.payload.today == true){
                state.look = 0
            }else{
                state.look = state.look + action.payload
            }
        },
        setDeleteState(state, action){
            state.deleteState = action.payload
        },
        setPassword(state, action){
            state.password = action.payload
        },
        setData(state, action){
            state.data = action.payload
        },
        setSpecifyData(state, action){
            state.data[action.payload.index].del = action.payload.state
        },
        setLoadState(state, action){
            state.loadState = action.payload
        }
    }
})

export default LookPageReducer