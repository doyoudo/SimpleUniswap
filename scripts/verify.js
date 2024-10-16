const hre = require("hardhat");
const fs = require("fs");

async function verifyContract(address, constructorArguments, contract) {
  console.log(`正在验证地址为 ${address} 的合约...`);
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: constructorArguments,
      contract: contract
    });
    console.log(`地址为 ${address} 的合约验证成功！`);
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log(`地址为 ${address} 的合约已经验证过了！`);
    } else {
      console.error(`地址为 ${address} 的合约验证失败：`, e);
    }
  }
}

async function main() {
  // 从文件中读取部署的地址
  const addresses = JSON.parse(fs.readFileSync("deployed-addresses.json", "utf8"));

  // 验证 Token0
  await verifyContract(addresses.token0, [hre.ethers.utils.parseEther("10000")], "contracts/UniswapV2ERC20.sol:UniswapV2ERC20");

  // 验证 Token1
  await verifyContract(addresses.token1, [hre.ethers.utils.parseEther("10000")], "contracts/UniswapV2ERC20.sol:UniswapV2ERC20");

  // 验证 Factory
  await verifyContract(addresses.factory, [], "contracts/UniswapV2Factory.sol:UniswapV2Factory");

  // 验证 Library
  await verifyContract(addresses.library, [], "contracts/UniswapV2Library.sol:UniswapV2Library");

  // 验证 Pair
  await verifyContract(addresses.pair, [], "contracts/UniswapV2Pair.sol:UniswapV2Pair");

  console.log("所有合约验证完成！");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("验证过程中发生错误：", error);
    process.exit(1);
  });
