const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Contract = await ethers.getContractFactory("Distributor");

    const dist = await Contract.deploy("0x4d9dA7E0038113C03bCd5a6166121c0a3A5a3652");
  
    console.log("Contract address:", dist.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });