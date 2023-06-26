"use client";
import { ethers } from 'ethers';
import React,{useState,useContext} from 'react'
import styles from './Model.module.css'
import Image from 'next/image';
import { useSelector } from 'react-redux';

// function Modal({state}) {

//     const createAccount =async(event)=>{
//         event.preventDefault();
//         const {contract}=state;
//         const name=document.querySelector("#name").value;
//          const transaction=await contract.createAccount(name);
//          await transaction.wait();
//          console.log('Transaction is success');
//         console.log(transaction);

//     }

//   return (
//     <div>
//         <form onSubmit={createAccount}>
//             <label>Name</label><br/>
//             <input type='text' id="name" placeholder='Name..'></input><br/>
//              <br/>
//             <button type='submit'>Submit</button>
//         </form>
//     </div>
//   )
// }

// export default Modal

function Model({
  // state,
  openModel,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
  address
}) {
  // console.log('state in model:',state);
  const [name,setName]=useState("");
  const[accountAddress,setAccountAddress]=useState("");
  const contract=useSelector((state)=>state.state.contract);
  const account=useSelector((state)=>state.state.account);

    const createAccount =async(event)=>{
        event.preventDefault();
        const name=document.querySelector("#name").value;
         const transaction=await contract.createAccount(name);
         await transaction.wait();
         console.log('Transaction is success');
        console.log(transaction);

    }

  return (
    <div className={styles.Model}>
      <div className={styles.Model_box}>
        <div className={styles.Model_box_left}>
            <Image src='/image/body.png' alt='body' width={600} height={500} />
        </div>

        <div className={styles.Model_box_right}>
             <h1>
              {title} <span>{head}</span>
             </h1>
             <p>{info}</p>
             <small>{smallInfo}</small>

             <form onSubmit={createAccount} className={styles.Model_box_right_name}>
              <div className={styles.Model_box_right_name_info}>
                <Image src='/image' alt="user" width={30} height={30} />
                 <input
                   type='text'
                   id='name'
                   placeholder='Your name'
                   onChange={(e)=>setName(e.target.value)}
                 />
              </div>
              <div className={styles.Model_box_right_name_info}>
                <Image src='/image' alt="user" width={30} height={30} />
                 <input
                   type='text'
                   placeholder={address||"enter address..."}
                   onChange={(e)=>setAccountAddress(e.target.value)}
                 />
              </div>
                 <div className={styles.Model_box_right_name_btn}>
                   <button
                      // onClick={()=>functionName({name,accountAddress})}
                      type='submit'
                   >
                     {""}
                     {/* <Image src="/image/send" alt='send' width={30} height={30}/> */}
                      {""}
                      Submit
                   </button>

                   <button
                      onClick={()=>openModel(false)}   >
                     {""}
                     {/* <Image src="/image/close" alt='close' width={30} height={30}/> */}
                      {""}
                      Cancel
                   </button>
                 </div>

             </form>
        </div>
        
        </div> 

    </div>
  )
}

export default Model