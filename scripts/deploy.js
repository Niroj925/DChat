
const hre = require("hardhat");

async function main() {

  const ChatApp=await hre.ethers.getContractFactory("ChatApp");//fetching bytcode and abi
  const chatApp=await ChatApp.deploy();//creating an instances of our smart contract

  await chatApp.deployed();//depoying smart contract 
  console.log("Deployed contract address:",`${chatApp.address}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



