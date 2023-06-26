'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState={
  chatData:{
    name:"",
    address:""
  },
}

export const chatSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setChatData:(state,action)=>{
          state.chatData=action.payload;
        }
    }
});

export const {setChatData}=chatSlice.actions;

export default chatSlice.reducer;