pragma solidity ^0.5.16;

import "./Wallet.sol";

contract WalletFactory {
    event WalletCreated(address indexed creator, address wallet);

    function createWallet() external {
        Wallet newWallet = new Wallet();
        emit WalletCreated(msg.sender, address(newWallet));
    }
}
