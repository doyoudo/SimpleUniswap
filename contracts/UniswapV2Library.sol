// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library UniswapV2Library {
    // 内部实现SafeMath功能
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    // 计算输出金额
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut) {
        require(amountIn > 0, 'UniswapV2Library: Insufficient fund');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: Insufficient liquidity');
        uint amountInWithFee = mul(amountIn, 997);
        uint numerator = mul(amountInWithFee, reserveOut);
        uint denominator = add(mul(reserveIn, 1000), amountInWithFee);
        amountOut = div(numerator, denominator);
    }

    // 其他函数...
}
