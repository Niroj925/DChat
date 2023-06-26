"use client";
import React,{useEffect,useState} from 'react'
import Model from '../Modal/Modal';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link';
import {FaCross} from 'react-icons/fa'
import {useDispatch, useSelector, } from 'react-redux';

function Navbar() {

  const contract=useSelector((state)=>state.state.contract);
  const account=useSelector((state)=>state.state.account);

    // console.log('account address:',account);
    const [userName,setUserName]=useState('');
    const [openModel,setOpenModel]=useState(false)
    const [active,setActive]=useState(2);
    const[open,setOpen]=useState(false);
  
   
    const menuItems=[
        {
          menu:"All Users",
          link:"/alluser",
        },
        {
          menu:"CHAT",
          link:"/",
        },
        {
          menu:"CONTACT",
          link:"/",
        },
        {
          menu:"SETTING",
          link:"/",
        },
        {
          menu:"FAQS",
          link:"/",
        },
        {
          menu:"TERMS OF USE",
          link:"/",
        },
      ];
       
 const getUserName=async()=>{
  if(account){
            const userName=await contract.getUsername(account);
            setUserName(userName);
  }
        }

    useEffect(()=>{
        contract&&getUserName();
    },[contract]);

return (
    <div className={styles.NavBar}>
     <div className={styles.NavBar_box}>
        <div className={styles.NavBar_box_left}>
         <Image src='/image/logo1.png' alt='img' width={50} height={50}/>
        </div>
        <div className={styles.NavBar_box_right}>
          {/* for desktop version */}
       <div className={styles.NavBar_box_right_menu}>
      {menuItems.map((el,i)=>(
        <div
        onClick={()=>setActive(i+1)}
        key={i+1}
        className={`${styles.NavBar_box_right_menu_items} ${
          active==i+1?styles.active_btn:""
        }`}
        >
          <Link 
          className={styles.NavBar_box_right_menu_items_link}
          href={el.link}
          >
            {el.menu}
          </Link>
          </div>
      ))}
       </div>

       {/* for mobile */}
       {open&&(
         <div className={styles.mobile_menu}>
         {menuItems.map((el,i)=>(
           <div
           onClick={()=>setActive(i+1)}
           key={i+1}
           className={`${styles.mobile_menu_items} ${
             active==i+1?styles.active_btn:""
           }`}
           >
             <Link 
             className={styles.mobile_menu_items_link}
             href={el.link}
             >
               {el.menu}
             </Link>
             </div>
         ))}
         <p className={styles.mobile_menu_btn}>
            <Image
            src='/image/cross.png'
            alt='close'
            width={50}
            height={50}
            onClick={()=>setOpen(false)}
            />
         </p>
          </div>
       )}

           <div className={styles.NavBar_box_right_connect}>
            {
              account==""?(
                <button onClick={()=>connectWallet()}>
                {" "} 
                <span>Connect Wallet</span> 
                </button>
              ):(
                <button onClick={()=>setOpenModel(true)}>
                  {" "}
                  {/* <Image src={userName?'':''}
                  alt="Account image"
                  width={20}
                  height={20}
                  /> */}
                  {""}
                  <small>{userName||"Create Account"}</small>
                </button>
              )
            }

           </div>

             <div
             className={styles.NavBar_box_right_open}
             onClick={()=>setOpen(true)}
             >
              <Image src='/image/menu.png' alt='open' width={30} height={30}/>
             </div>

      </div>
     </div>
     {/* Model component */}
     {openModel&&(
      <div className={styles.modelBox}>
        <Model
        openModel={setOpenModel}
        title="Welcome to"
        head="Kura Garau"
        info="hello gaich what's up hope you all are fine and i am also so gaich what we are going to start you may know "
        smallInfo="Kindly select your name..."
        address={account}
      />
        </div>
     )}
     {/* {error==""?"":<Error error={error}/>} */}
    </div>
  )
}

export default Navbar