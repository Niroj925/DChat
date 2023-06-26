import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useRouter,useSearchParams } from 'next/navigation'
import styles from './Chat.module.css';
import Avatar from '../../Avatar';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Chat() {
    const [message,setMessage]=useState('');
    const [chatData,setChatData]=useState({
        name:"",
        address:"",
    });
    const [loading,setLoading]=useState(false);
    const[userName,setUserName]=useState('');
    const [currentUserName,setCurrentUserName]=useState('');
    const [currentUserAddress,setCurrentUserAddress]=useState('');
     const [friendMsg,setFriendMsg]=useState([]);
     const contract=useSelector((state)=>state.state.contract);
     const account=useSelector((state)=>state.state.account);
   
    
    const readUser=async (userAddress)=>{
        const userName=await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }

    const getUserName=async()=>{
        if(contract){
        const userName=await contract.getUsername(account);
        setUserName(userName);
        }
    }

    const readMessage=async (friendAddress)=>{
        try{
            if(currentUserAddress){
            const read=await contract.readMessage(friendAddress);
            console.log(read);
            // setFriendMsg(read);
            const messages = read.map((message) => ({
                sender: message.sender,
                timestamp: message.timestamp._hex,
                msg: message.msg,
              }));
              setFriendMsg(messages);
            }
        }catch(err){
            console.log(err);
            // setError("currently you have no Message");
        }
    }


       const searchParams = useSearchParams();
    useEffect(()=>{
        const name = searchParams.get('name');
       const address = searchParams.get('address');
    //    setCurrentUserName(name);
    //    setCurrentUserAddress(address);
       setChatData({name,address});
       chatData.address && readUser(address);
        //  currentUserAddress &&  readMessage(account);
       account &&  getUserName();
    },[searchParams]);

    useEffect(()=>{
       currentUserAddress && readMessage(currentUserAddress);
    },[currentUserAddress]);

    // console.log(chatData.address,chatData.name);
          console.log(friendMsg);

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
                        {/* {<p>{el.sender}</p>}
                        {<p>{account}</p>}
                        {el.sender.toLowerCase()==account.toLowerCase()?<p>equal</p>:<p>Not equal</p>} */}
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