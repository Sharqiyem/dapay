// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentSystem {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        bool isRequest;
        string senderUsername;
        string receiverUsername;
    }

    mapping(address => uint256) private balances;
    mapping(address => string) private usernames;
    Transaction[] public transactions;

    event PaymentMade(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );
    event PaymentRequested(
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );
    event UsernameSet(address indexed user, string username);

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function setUsername(string calldata username) external {
        usernames[msg.sender] = username;
        emit UsernameSet(msg.sender, username);
    }

    function getUsername(
        address account
    ) external view returns (string memory) {
        return usernames[account];
    }

    function sendPayment(
        address to,
        uint256 amount,
        string calldata message
    ) external {
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;

        string memory senderUsername = usernames[msg.sender];
        string memory receiverUsername = usernames[to];

        transactions.push(
            Transaction({
                sender: msg.sender,
                receiver: to,
                amount: amount,
                message: message,
                timestamp: block.timestamp,
                isRequest: false,
                senderUsername: senderUsername,
                receiverUsername: receiverUsername
            })
        );

        emit PaymentMade(msg.sender, to, amount, message, block.timestamp);
    }

    function requestPayment(
        address to,
        uint256 amount,
        string calldata message
    ) external {
        require(amount > 0, "Request amount must be greater than zero");

        string memory senderUsername = usernames[msg.sender];
        string memory receiverUsername = usernames[to];

        transactions.push(
            Transaction({
                sender: msg.sender,
                receiver: to,
                amount: amount,
                message: message,
                timestamp: block.timestamp,
                isRequest: true,
                senderUsername: senderUsername,
                receiverUsername: receiverUsername
            })
        );

        emit PaymentRequested(msg.sender, to, amount, message, block.timestamp);
    }

    function getTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
