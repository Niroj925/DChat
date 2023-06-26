import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function Test() {
 
    const contract=useSelector((state)=>state.state.contract);
    // const{account}=info;
    console.log('user info redux:',contract);

    const account=useSelector((state)=>state.state.account);
    console.log('account:',account);

    const provider=useSelector((state)=>state.state.provider);
    console.log('provider:',provider);
    const signer=useSelector((state)=>state.state.signer);
    console.log('signer:',signer);

    
  return (
    <div>test for contract</div>
  )
}

export default Test