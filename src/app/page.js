
"use client";
import Image from 'next/image'
import styles from './page.module.css'
import React,{useState,useEffect} from 'react'
import Navbar from '../app/component/Navbar/Navbar';
import {state,account,connectWallet} from "./utils/apifeature";
import Friend from './component/Friend/Friend';
import Filter from './component/Filter/Filter';
import ContractConnector from './utils/apifeature';
import Test from './component/test/test';
function Home() {
  return (
    <main>
      {/* <ContractConnector/> */}
      <Navbar/>      
       <Filter/>
        <Friend/>
       {/* <Test/> */}
    </main> 
  )
}

export default Home


