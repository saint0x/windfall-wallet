// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    address public executor;
    uint256 public totalBalance;
    mapping(address => uint256) public balances;
    mapping(address => bool) public isMember;

    event FundsAdded(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
    event OwnershipTransferred(address indexed previousExecutor, address indexed newExecutor);

    modifier onlyExecutor() {
        require(msg.sender == executor, "Only the executor can perform this action");
        _;
    }

    modifier onlyMember() {
        require(isMember[msg.sender], "Only members can perform this action");
        _;
    }

    constructor() {
        executor = msg.sender;
        isMember[msg.sender] = true;
    }

    function addFunds() external payable {
        totalBalance += msg.value;
        balances[msg.sender] += msg.value;
        emit FundsAdded(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 amount) external onlyMember {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        totalBalance -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    function transferOwnership(address newExecutor) external onlyExecutor {
        require(newExecutor != address(0), "Invalid address");
        emit OwnershipTransferred(executor, newExecutor);
        executor = newExecutor;
    }

    function addMember(address user) external onlyExecutor {
        require(!isMember[user], "User is already a member");
        isMember[user] = true;
    }

    function removeMember(address user) external onlyExecutor {
        require(isMember[user], "User is not a member");
        isMember[user] = false;
    }
}
