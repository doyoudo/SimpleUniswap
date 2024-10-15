const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniswapV2", function () {
  let Token;
  let token0;
  let token1;
  let factory;
  let pair;
  let owner;
  let addr1;
  let addr2;
  let UniswapV2Library;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Token = await ethers.getContractFactory("UniswapV2ERC20");
    token0 = await Token.deploy(ethers.utils.parseEther("10000"));
    token1 = await Token.deploy(ethers.utils.parseEther("10000"));

    console.log("代币0地址:", token0.address);
    console.log("代币1地址:", token1.address);
    expect(token0.address).to.not.equal(token1.address, "代币地址不能相同");

    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    factory = await Factory.deploy();

    console.log("工厂合约地址:", factory.address);
    expect(factory.address).to.not.equal(ethers.constants.AddressZero, "工厂合约部署失败");

    await factory.createPair(token0.address, token1.address);
    const pairAddress = await factory.getPair(token0.address, token1.address);

    console.log("创建的交易对地址:", pairAddress);
    expect(pairAddress).to.not.equal(ethers.constants.AddressZero, "交易对创建失败");

    pair = await ethers.getContractAt("UniswapV2Pair", pairAddress);

    console.log("交易对合约地址:", pairAddress);

    // 部署 UniswapV2Library
    const UniswapV2LibraryFactory = await ethers.getContractFactory("UniswapV2Library");
    UniswapV2Library = await UniswapV2LibraryFactory.deploy();
    await UniswapV2Library.deployed();
  });

  it("应该创建交易对", async function () {
    expect(await factory.allPairs(0)).to.equal(pair.address);
  });

  it("应该添加流动性", async function () {
    const amount = ethers.utils.parseEther("100");
    await token0.approve(pair.address, amount);
    await token1.approve(pair.address, amount);

    await token0.transfer(pair.address, amount);
    await token1.transfer(pair.address, amount);

    console.log("所有者地址:", owner.address);
    expect(owner.address).to.not.equal(ethers.constants.AddressZero, "所有者地址不能为零地址");
    await pair.mint(owner.address);

    expect(await pair.balanceOf(owner.address)).to.be.gt(0);
  });

  it("应该能够交换代币", async function () {
    const amount = ethers.utils.parseEther("100");
    await token0.approve(pair.address, amount);
    await token1.approve(pair.address, amount);

    await token0.transfer(pair.address, amount);
    await token1.transfer(pair.address, amount);

    await pair.mint(owner.address);

    const swapAmount = ethers.utils.parseEther("10");
    await token0.transfer(pair.address, swapAmount);

    const reserves = await pair.getReserves();
    const expectedOutput = await UniswapV2Library.getAmountOut(swapAmount, reserves[0], reserves[1]);

    await expect(pair.swap(0, expectedOutput, addr1.address))
      .to.emit(token1, "Transfer")
      .withArgs(pair.address, addr1.address, expectedOutput);

    expect(await token1.balanceOf(addr1.address)).to.equal(expectedOutput);
  });
});
