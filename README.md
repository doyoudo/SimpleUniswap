# UniswapV2 克隆

这个项目是 Uniswap V2 的简化克隆版本，用于学习和研究目的。

## 项目结构

- `contracts/`: 包含所有智能合约
  - `UniswapV2ERC20.sol`: ERC20 代币合约
  - `UniswapV2Factory.sol`: 工厂合约，用于创建交易对
  - `UniswapV2Pair.sol`: 交易对合约
  - `UniswapV2Library.sol`: 辅助库合约
- `test/`: 包含测试文件
- `scripts/`: 包含部署和验证脚本
- `frontend/`: 包含前端代码

## 安装依赖

确保您已安装 Node.js 和 npm。然后运行:

npm install

## 编译合约

使用以下命令编译智能合约:
npx hardhat compile

## 运行测试

执行以下命令运行测试:
npx hardhat test

## 部署合约

在部署之前，请确保您已将环境变量设置为正确的网络和私钥。然后执行以下命令进行部署:
npx hardhat run scripts/deploy.js --network sepolia

## 运行前端

确保您已经编译了合约并生成了 artifacts：

npx hardhat compile

然后，复制 artifacts 文件夹到 frontend 目录：

cp -r artifacts frontend/

接着，进入 frontend 目录并运行：

cd frontend
npm install
npm start

现在，您可以在浏览器中访问 http://localhost:3000 来查看应用。

## 代码覆盖率

要生成代码覆盖率报告，运行:
npx hardhat coverage

## 安全分析

本项目使用 Slither 进行安全分析。在 GitHub Actions 中配置了自动运行 Slither。

## 贡献

欢迎提交 Pull Requests 来改进这个项目。对于重大更改，请先开一个 issue 讨论您想要改变的内容。

## 许可证

本项目采用 MIT 许可证。
