import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import styles from './Friend.module.css'
import Card from './Card/Card'
import Chat from './Chat/Chat'
import { useSelector } from 'react-redux'

function Friend() {
    const[friendList,setFriendList]=useState([]);
    const contract=useSelector((state)=>state.state.contract);
    const account=useSelector((state)=>state.state.account);
  


useEffect(() => {
    const getFriends = async () => {
      try {
        const friends = await contract.getMyFriendList();
        setFriendList(friends);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getFriends();
  }, [contract]);
  

  return (
    <div className={styles.Friend}>
        <div className={styles.Friend_box}>
            <div className={styles.Friend_box_left}>

                {
                    friendList.map((el,i)=>(
                        <Card
                        key={i+1}
                        el={el}
                        i={i}
                        // readmsg
                        // readuser
                        />
                    ))
                }
            </div>

            <div className={styles.Friend_box_right}>
                
                 <Chat/>
                </div>

        </div>

    </div>
  )
}

export default Friend