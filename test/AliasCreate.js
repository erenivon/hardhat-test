const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const { expect, assert }  = require ("chai");
const { Contract, ContractFactory, constants }  = require ("ethers");
const { ethers }  = require ("hardhat");

const name  = 'CreateAlias';

describe(name, () => {
  let contract;
  let owner;
  let factory;

  before(async () => {
    [owner, ...addresses] = await ethers.getSigners();
    factory = await ethers.getContractFactory(name);
  });

  beforeEach(async () => {
    contract = await factory.deploy();
  });

  it('should set alias successfully', async () => {
    await expect(contract.connect(addresses[0]).setAlias("JohnDoe"));
  });
  describe("-REQUIRES-", () => {
    it('entered alias should be unique', async () => {
     await contract.connect(addresses[1]).setAlias("JohnDoe");
     await expect(contract.connect(addresses[1]).setAlias("JohnDoe")).to.be.revertedWith("You Already Set");
     });
    it('You should be entered 1 alias', async () => {
     await contract.connect(addresses[0]).setAlias("JohnDoe");
     await expect(contract.connect(addresses[2]).setAlias("JohnDoe")).to.be.revertedWith("Already Taken");
     });
  });
});