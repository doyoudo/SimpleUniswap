const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("使用账户:", deployer.address);

  // 使用提供的合约地址
  const addresses = {
    token0: "0x1fED6DfeAEa0114B4025D8596a590e8D8DE1Eb88",
    token1: "0xF9646Ffd12A436FDA56eaB367cDeB05dA6Eb3C63",
    factory: "0xD9333D4B9927F8403EC3c6755F338F7D41E7d916",
    pair: "0xD9333D4B9927F8403EC3c6755F338F7D41E7d916",
    library: "0x4443248497009f8F58810Cd30F79B10a7693D8d2"
  };

  console.log("使用以下合约地址:");
  console.log("Token0 地址:", addresses.token0);
  console.log("Token1 地址:", addresses.token1);
  console.log("Factory 地址:", addresses.factory);
  console.log("Pair 地址:", addresses.pair);
  console.log("Library 地址:", addresses.library);

  // 保存地址到文件
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("合约地址已保存到 deployed-addresses.json");

  /* 
  // 动态部署代码（暂时注释）
  // 部署 UniswapV2ERC20 代币
  const Token = await hre.ethers.getContractFactory("UniswapV2ERC20");
  const token0 = await Token.deploy(hre.ethers.utils.parseEther("10000"));
  const token1 = await Token.deploy(hre.ethers.utils.parseEther("10000"));

  await token0.deployed();
  await token1.deployed();

  console.log("Token0 部署地址:", token0.address);
  console.log("Token1 部署地址:", token1.address);

  // 部署 UniswapV2Factory
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log("Factory 部署地址:", factory.address);

  // 创建交易对
  await factory.createPair(token0.address, token1.address);
  const pairAddress = await factory.getPair(token0.address, token1.address);

  console.log("创建的交易对地址:", pairAddress);

  // 部署 UniswapV2Library
  const UniswapV2Library = await hre.ethers.getContractFactory("UniswapV2Library");
  const library = await UniswapV2Library.deploy();

  await library.deployed();

  console.log("UniswapV2Library 部署地址:", library.address);

  // 保存部署的地址到文件
  const addresses = {
    token0: token0.address,
    token1: token1.address,
    factory: factory.address,
    pair: pairAddress,
    library: library.address
  };

  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("部署的地址已保存到 deployed-addresses.json");
  */

  console.log("脚本执行完成！");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("脚本执行过程中发生错误：", error);
    process.exit(1);
  });
