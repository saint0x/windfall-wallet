pragma solidity ^0.5.16;

contract MultisigWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public numConfirmationsRequired;

    struct Transaction {
        address destination;
        uint256 value;
        bool executed;
        uint256 numConfirmations;
    }

    Transaction[] public transactions;

    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event Submission(uint256 indexed transactionId);
    event Confirmation(address indexed sender, uint256 indexed transactionId);
    event Execution(uint256 indexed transactionId);
    event ExecutionFailure(uint256 indexed transactionId);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier transactionExists(uint256 transactionId) {
        require(transactionId < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }

    constructor(address[] memory _owners, uint256 _numConfirmationsRequired) public {
        require(_owners.length > 0, "Owners required");
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "Invalid number of confirmations");
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        numConfirmationsRequired = _numConfirmationsRequired;
    }

    function() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(address destination, uint256 value) external onlyOwner {
        uint256 transactionId = transactions.length;
        transactions.push(Transaction({
            destination: destination,
            value: value,
            executed: false,
            numConfirmations: 0
        }));
        emit Submission(transactionId);
    }

    function confirmTransaction(uint256 transactionId) external onlyOwner transactionExists(transactionId) notExecuted(transactionId) {
        Transaction storage transaction = transactions[transactionId];
        transaction.numConfirmations++;
        emit Confirmation(msg.sender, transactionId);
        if (transaction.numConfirmations >= numConfirmationsRequired) {
            executeTransaction(transactionId);
        }
    }

    function executeTransaction(uint256 transactionId) public onlyOwner transactionExists(transactionId) notExecuted(transactionId) {
        Transaction storage transaction = transactions[transactionId];
        (bool success, ) = transaction.destination.call.value(transaction.value)("");
        if (success) {
            transaction.executed = true;
            emit Execution(transactionId);
        } else {
            emit ExecutionFailure(transactionId);
        }
    }
}
