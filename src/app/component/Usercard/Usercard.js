import React from 'react'
import Image from 'next/image'
import styles from './Usercard.module.css'
import Avatar from '../Avatar';
import {useDispatch, useSelector, } from 'react-redux';

function Usercard({el,i,addFriends}) {
  const contract=useSelector((state)=>state.state.contract);
  const account=useSelector((state)=>state.state.account);

    console.log(el);
   
    // const addFriend=async(accountAddress,name)=>{
    //         const userName=await contract.addFriend({friend_key:accountAddress,name:name});
    //         console.log(userName);
    // }

    const addFriend =async(friend_key,name)=>{
         const transaction=await contract.addFriend(friend_key,name);
         await transaction.wait();
         console.log('Transaction is success');
        console.log(transaction);

    }
  return (
    <div className={styles.Usercard}>
        <div className={styles.Usercard_box}>
            {/* <Image/> */}
              <Avatar src='/image/spider.png' alt='avatar'/>
      
            <div className={styles.Usercard_box_info}>
                <h3>{el.name}</h3>
                <p>{el.accountAddress.slice(0,25)}...</p>
                <button onClick={()=>
                addFriend(el.accountAddress,el.name)
                }>Add Friend</button>

            </div>
        </div>
        <small className={styles.number}>{i+1}</small>

    </div>
  )
}

export default Usercard