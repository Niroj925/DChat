'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState={
  friendMsg:[]
}

export const msgSlice=createSlice({
    name:'message',
    initialState,
    reducers:{
        setFriendMsg:(state,action)=>{
          state.friendMsg=action.payload;
        }
    }
});

export const {setFriendMsg}=msgSlice.actions;

export default msgSlice.reducer;