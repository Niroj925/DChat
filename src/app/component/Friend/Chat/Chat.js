import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useRouter,useSearchParams } from 'next/navigation'
import styles from './Chat.module.css';
import Avatar from '../../Avatar';
import { useDispatch } from 'react-redux';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { setChatData } from '@/app/features/slicer/chatSlicer';
import { setFriendMsg } from '@/app/features/slicer/msgSlicer';

function Chat() {
    const dispatch=useDispatch();
    const searchParams = useSearchParams();
    const [message,setMessage]=useState('');

    const[userName,setUserName]=useState('');
  
     const contract=useSelector((state)=>state.state.contract);
     const account=useSelector((state)=>state.state.account);    
     const chatData=useSelector((state)=>state.user.chatData);
    const friendMsg=useSelector((state)=>state.message.friendMsg);


    const currentUserName=chatData.name;
    const currentUserAddress=chatData.address;

    console.log(friendMsg);

    const getUserName=async()=>{
        if(contract){
        const userName=await contract.getUsername(account);
        setUserName(userName);
        }
    }


   useEffect(()=>{

    const readMessage=async (friendAddress)=>{
        try{
            const read=await contract.readMessage(friendAddress);
            console.log(read);
          
            const messages = read.map((message) => ({
                sender: message.sender,
                timestamp: message.timestamp._hex,
                msg: message.msg,
              }));
           
              dispatch(setFriendMsg(messages))
            
        }catch(err){
            console.log(err);
            
        }
    };

   readMessage(currentUserAddress);

   },[currentUserAddress])


    useEffect(()=>{
        const name = searchParams.get('name');
       const address = searchParams.get('address');
  
       setChatData({name,address});
       dispatch(setChatData({name,address}));

       account &&  getUserName();
    },[searchParams]);

    // useEffect(()=>{
    //    currentUserAddress && readMessage(currentUserAddress);
    // },[currentUserAddress]);

        

          const sendMessage =async(friend_key,_msg)=>{
            const transaction=await contract.sendMessage(friend_key,_msg);
            await transaction.wait();
            console.log('Transaction is success');
           console.log(transaction);
   
       }

       function getTime(hexTimestamp) {
        const timestampNumber = parseInt(hexTimestamp, 16);
        const timestampDate = new Date(timestampNumber * 1000);
        const localString = timestampDate.toLocaleString();
        return localString;
      }
      
  return (
    <div className={styles.Chat}>
        {
            currentUserName && currentUserAddress?(
            <div className={styles.Chat_user_info}>
                <Avatar src='/image/spider.png' alt='image' width={50} height={50}/>
                <div className={styles.Chat_user_info_box}>
                    <h4>{currentUserName}</h4>
                     <p className={styles.show}>{currentUserAddress}</p>
                </div>
             </div> 
            ):(
               <>
               </>
            )
        }
    
         <div className={styles.Chat_box_box}>
            <div className={styles.Chat_box}>
                <div className={styles.Chat_box_left}>
                   {friendMsg&&friendMsg.map((el,i)=>(
                    <div key={i}>
                         {el.sender.toLowerCase()==account.toLowerCase()?(
                            <div className={styles.Chat_box_left_title}>
                                <Image src='/image/spider.png'
                                  alt='img'
                                  width={30}
                                  height={30}
                                />
                                <span>
                                   {userName} {" "}
                                    <small>{getTime(el.timestamp)}</small>
                                </span>
                                </div>
                        ):(
                            <div className={styles.Chat_box_left_title}>
                            <Image src='/image/spider.png'
                              alt='img'
                              width={30}
                              height={30}
                            />
                            <span>
                                {currentUserName}{"  "}
                                <small>{getTime(el.timestamp)}</small>
                            </span>
                            </div>
                        )}
                        <p key={i+1}>
                            {el.msg} {' '}
                        </p>
                  </div>
                   ))

                   }
                </div>

            </div>

            {
                currentUserName && currentUserAddress?(
                <div className={styles.Chat_box_send}>
                    <div className={styles.Chat_box_send_img}>
                        <Image src='/image/smiles.png' alt='smile' width={30} height={30} />
                        <input
                        type='text'
                        placeholder='type your message'
                        onChange={(e)=>setMessage(e.target.value)}
                        />

                        <Image 
                        src='/image/send.png'
                         alt='send'
                          width={30} 
                          height={30}
                          onClick={()=>sendMessage(currentUserAddress,message)}
                          />
                       
                        </div>
                  </div>
                ):""
            }

         </div>
    </div>
  )
}

export default Chat