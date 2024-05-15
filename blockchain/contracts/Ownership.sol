pragma solidity ^0.5.16;

contract Ownership {
    address public executor;
    mapping(address => bool) public isOwner;
    uint256 public numConfirmationsRequired;

    event OwnershipTransferred(address indexed previousExecutor, address indexed newExecutor);
    event Confirmation(address indexed sender);
    event Execution(address indexed sender);
    event ExecutionFailure(address indexed sender);

    modifier onlyExecutor() {
        require(msg.sender == executor, "Only the executor can perform this action");
        _;
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Only owners can perform this action");
        _;
    }

    constructor(address[] memory owners, uint256 _numConfirmationsRequired) {
        require(owners.length > 0, "At least one owner is required");
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= owners.length, "Invalid number of confirmations");

        for (uint256 i = 0; i < owners.length; i++) {
            address owner = owners[i];
            require(owner != address(0), "Invalid owner address");
            require(!isOwner[owner], "Owner address must be unique");
            isOwner[owner] = true;
        }

        executor = owners[0]; // Set the executor as the first owner
        numConfirmationsRequired = _numConfirmationsRequired;
    }

    function transferOwnership(address newExecutor) external onlyExecutor {
        require(newExecutor != address(0), "Invalid executor address");
        require(isOwner[newExecutor], "New executor must be an owner");
        require(newExecutor != executor, "New executor must be different from the current executor");

        executor = newExecutor;
        emit OwnershipTransferred(msg.sender, newExecutor);
    }

    function confirm() external onlyOwner {
        emit Confirmation(msg.sender);
    }

    function execute() external onlyExecutor {
        emit Execution(msg.sender);
    }

    function executeFailure() external onlyExecutor {
        emit ExecutionFailure(msg.sender);
    }
}
