import React from 'react'
import styles from "./Filtler.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Filter() {
const router=useRouter();

const addFrn=()=>{
    router.push('/alluser');
}
  return (
    <div className={styles.Filter}>
        <div className={styles.Filter_box}>
            <div className={styles.Filter_box_left}>
                <div className={styles.Filter_box_left_search}>
                    <Image src='/image/search.png' alt='search' width={30} height={30}/>
                    <input type='text' placeholder='Search..'/>
                  
                </div>
            </div>
            <div className={styles.Filter_box_right}>
             {/* <button>
                <Image src='/image/clear'/>
                 Clear Chat
             </button> */}
             <button onClick={addFrn}>
                {/* <Image src='/image/clear'/> */}
                 Add Friend
             </button>
             </div>
        </div>
         
    </div>
  )
}

export default Filter