const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("UniswapV2ERC20");
  const token0 = await Token.deploy(hre.ethers.utils.parseEther("10000"));
  const token1 = await Token.deploy(hre.ethers.utils.parseEther("10000"));

  await token0.deployed();
  await token1.deployed();

  console.log("Token0 deployed to:", token0.address);
  console.log("Token1 deployed to:", token1.address);

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log("Factory deployed to:", factory.address);

  await factory.createPair(token0.address, token1.address);
  const pairAddress = await factory.getPair(token0.address, token1.address);

  console.log("Pair created at:", pairAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
