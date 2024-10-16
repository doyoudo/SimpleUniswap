import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// 导入合约 ABI
import { UniswapV2FactoryABI, UniswapV2PairABI } from './contractABIs';

// 导入部署的地址
import deployedAddresses from './deployed-addresses.json';

function App() {
  const [factoryAddress, setFactoryAddress] = useState('');
  const [pairAddress, setPairAddress] = useState('');
  const [reserves, setReserves] = useState({ reserve0: '0', reserve1: '0' });

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // 请求用户连接钱包
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // 使用部署的地址
          const factoryAddress = deployedAddresses.factory;
          setFactoryAddress(factoryAddress);

          const factory = new ethers.Contract(factoryAddress, UniswapV2FactoryABI.abi, signer);

          // 使用部署的代币地址
          const token0 = deployedAddresses.token0;
          const token1 = deployedAddresses.token1;
          const pairAddress = await factory.getPair(token0, token1);
          setPairAddress(pairAddress);

          if (pairAddress !== ethers.constants.AddressZero) {
            const pair = new ethers.Contract(pairAddress, UniswapV2PairABI.abi, signer);
            const reserves = await pair.getReserves();
            setReserves({
              reserve0: ethers.utils.formatEther(reserves[0]),
              reserve1: ethers.utils.formatEther(reserves[1])
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Uniswap V2 Clone</h1>
      <p>Factory Address: {factoryAddress}</p>
      <p>Pair Address: {pairAddress}</p>
      <p>Reserves: {reserves.reserve0} / {reserves.reserve1}</p>
    </div>
  );
}

export default App;
