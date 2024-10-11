import { createSlice } from "@reduxjs/toolkit";

const initialState={
    logInStatus:false,
    userData:null
}

const authSlice=createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        logInUser:(state,action)=>{
            state.logInStatus=true;
            state.userData=action.payload;
        },
        logOutUser:(state)=>{
            state.logInStatus=false;
            state.userData=null;
        }
    }
})

export const {logInUser,logOutUser} =authSlice.actions;
export default authSlice.reducer;