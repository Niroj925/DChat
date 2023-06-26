import React from 'react'
import styles from './Card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '../../Avatar';

function Card({el,i}) {
//   console.log(el);
  const readMessage=(pubkey)=>{
    console.log(pubkey)
  }
  const readUser=(pubkey)=>{
    console.log(pubkey)
  }
  return (
    <Link
    href={{pathname:'/',query:{name:`${el.name}`,address:`${el.pubkey}`}}}
    >
     <div 
     className={styles.Card}
     onClick={()=>(readMessage(el.pubkey),readUser(el.pubkey))}
    >
     <div className={styles.Card_box}>
        <div className={styles.Card_box_left}>
          <Avatar
          src='/image/spider.png'
          alt='user'
          width={50}
          height={50}
          className={styles.Card_box_left_img}
          />

        </div>

        <div className={styles.Card_box_right}>
            <div className={styles.Card_box_right_middle}>
                 <h4>{el.name}</h4>
                 <small>{el.pubkey.slice(20)}...</small>
            </div>
            <div className={styles.Card_box_right_end}>
                <small>{i+1}</small>
            </div>
        </div>
     </div>
    </div>
    </Link>
   
  )
}

export default Card