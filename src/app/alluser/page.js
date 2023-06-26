"use client";
import React, { useState,useEffect } from 'react'
import styles from'./alluser.module.css'
import Usercard from '../component/Usercard/Usercard';
import Navbar from '../component/Navbar/Navbar';
import {useDispatch, useSelector, } from 'react-redux';

function alluser() {
  const contract=useSelector((state)=>state.state.contract);
  const account=useSelector((state)=>state.state.account);

const[userLists,setUserLists]=useState([]);

// console.log(contract);
const getFriends=async()=>{
  const Friends=await contract.getAllAppUser();
  // console.log('friends:',Friends);
  setUserLists(Friends);
}

useEffect(()=>{
contract&&getFriends();
},[contract]);
  return (

   
    <div>
          <Navbar/>
        <div className={styles.alluser_info}>
            <h1>Find Your Friends</h1>
        </div>
       
       <div className={styles.alluser}>
        {userLists.map((el,i)=>(
            <Usercard key={i+1} el={el} i={i}/>
        ))}

       </div>
    </div>
  )
}

export default alluser