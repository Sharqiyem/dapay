// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentSystem {
  struct Transaction {
    address sender;
    address receiver;
    uint256 amount;
    string message;
    uint256 timestamp;
    string senderUsername;
    string receiverUsername;
    bool isRequest;
    bool isPaid;
  }

  mapping(address => string) private usernames;
  Transaction[] public transactions;

  event PaymentSent(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);

  event PaymentRequested(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);

  event RequestPaid(uint256 indexed requestIndex);

  event UsernameSet(address indexed user, string username);

  function setUsername(string calldata username) external {
    usernames[msg.sender] = username;
    emit UsernameSet(msg.sender, username);
  }

  function getUsername(address account) external view returns (string memory) {
    return usernames[account];
  }

  function sendPayment(address payable to, string calldata message) external payable {
    require(msg.value > 0, 'Amount must be greater than zero');
    require(to != address(0), 'Invalid recipient address');

    // Transfer the ETH directly to the recipient
    (bool sent, ) = to.call{value: msg.value}('');
    require(sent, 'Failed to send ETH');

    // Record the transaction
    transactions.push(
      Transaction({
        sender: msg.sender,
        receiver: to,
        amount: msg.value,
        message: message,
        timestamp: block.timestamp,
        senderUsername: usernames[msg.sender],
        receiverUsername: usernames[to],
        isRequest: false,
        isPaid: true
      })
    );

    emit PaymentSent(msg.sender, to, msg.value, message, block.timestamp);
  }

  function requestPayment(address from, uint256 amount, string calldata message) external {
    require(amount > 0, 'Amount must be greater than zero');
    require(from != address(0), 'Invalid recipient address');
    require(from != msg.sender, 'Cannot request payment from yourself');
    require(bytes(message).length <= 280, 'Message too long'); // Limit message length

    // Record the payment request
    transactions.push(
      Transaction({
        sender: msg.sender,
        receiver: from,
        amount: amount,
        message: message,
        timestamp: block.timestamp,
        senderUsername: usernames[msg.sender],
        receiverUsername: usernames[from],
        isRequest: true,
        isPaid: false
      })
    );

    emit PaymentRequested(msg.sender, from, amount, message, block.timestamp);
  }

  function payRequest(uint256 requestIndex) external payable {
    require(requestIndex < transactions.length, 'Invalid request index');
    Transaction storage request = transactions[requestIndex];
    require(request.isRequest, 'Not a payment request');
    require(!request.isPaid, 'Request already paid');
    require(msg.sender == request.receiver, 'Only the recipient can pay this request');
    require(msg.value == request.amount, 'Incorrect payment amount');

    (bool sent, ) = request.sender.call{value: msg.value}('');
    require(sent, 'Failed to send ETH');

    request.isPaid = true;

    emit PaymentSent(msg.sender, request.sender, msg.value, request.message, block.timestamp);
    emit RequestPaid(requestIndex);
  }

  function getTransactions() external view returns (Transaction[] memory) {
    return transactions;
  }
}
