const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("Distributor contract", function () {

    async function deployContract() {
        const [deployer] = await ethers.getSigners();

        const Distributor = await ethers.getContractFactory("Distributor");

        const dist = await Distributor.deploy("0x4d9dA7E0038113C03bCd5a6166121c0a3A5a3652");

        return {Distributor, dist, deployer};
    }

    it("Should set up the token address with deployment", async function () {
        const { dist } = await loadFixture(deployContract);

        expect(await dist.IVS3()).to.equal("0x4d9dA7E0038113C03bCd5a6166121c0a3A5a3652");
    });

    it("Should change the token address", async function () {
        const { dist } = await loadFixture(deployContract);

        await dist.changeIVS3TokenAddress("0xEB1CAcBb6755d7e7c918A49064f3354360a15999");

        expect(await dist.IVS3()).to.equal("0xEB1CAcBb6755d7e7c918A49064f3354360a15999");
    });
})