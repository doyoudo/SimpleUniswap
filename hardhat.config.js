require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");
require("solidity-coverage");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    }
  },
  etherscan: {
    apiKey: "IB1SGVHDQRNBUBYJ411ARMS2BRRZZGN31W"
  }
};
