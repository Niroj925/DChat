"use client";
import { useState, useEffect } from 'react';
import abi from '../contract/ChatApp.json';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import {setAccount,setProvider,setSigner, setContract } from '../features/slicer/userSlicer';

const ContractConnector = () => {
  const dispatch = useDispatch();
  const account = useSelector(state => state.account);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x45592c9EE4ae52759F731C1CD8dD514eD13Cb118";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const account = accounts[0];

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        // const state = { provider, signer, contract,account};

        dispatch(setAccount(account));
        dispatch(setProvider(provider));
        dispatch(setSigner(signer));
        dispatch(setContract(contract));
      } catch (err) {
        console.log(err);
      }
    };

    connectWallet();
  }, [dispatch]);

  // The rest of your component code (if needed)

  return null; // Return null if this component doesn't render anything
};

export default ContractConnector;
