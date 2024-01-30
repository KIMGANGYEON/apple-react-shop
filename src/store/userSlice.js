import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20 },
    reducers : {
        changeName(state){
            return {name : 'park', age : 20}
        },
        
        increase(state, a){
            state.age += a.payload
        }
    }
})

export let  {changeName, increase} = user.actions

export default user