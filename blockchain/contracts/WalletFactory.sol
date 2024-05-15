// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Wallet.sol";

contract WalletFactory {
    event WalletCreated(address indexed creator, address wallet);

    function createWallet() external {
        Wallet newWallet = new Wallet();
        emit WalletCreated(msg.sender, address(newWallet));
    }
}
