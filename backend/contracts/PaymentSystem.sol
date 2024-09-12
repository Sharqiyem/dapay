// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract PaymentSystem is Ownable {
  using SafeERC20 for IERC20;

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

  uint256 public feePercentage; // Fee percentage (in basis points, e.g., 100 = 1%)
  uint256 public constant MAX_FEE_PERCENTAGE = 500; // Maximum fee of 5% (500 basis points)
  uint256 public collectedFees; // Total collected fees

  event PaymentSent(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);

  event PaymentRequested(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp);

  event RequestPaid(uint256 indexed requestIndex);

  event UsernameSet(address indexed user, string username);

  event FeePercentageUpdated(uint256 newFeePercentage);

  event FeesWithdrawn(uint256 amount);

  constructor(uint256 _initialFeePercentage) Ownable(msg.sender) {
    require(_initialFeePercentage <= MAX_FEE_PERCENTAGE, 'Initial fee percentage too high');
    feePercentage = _initialFeePercentage;
  }

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

    uint256 fee = (msg.value * feePercentage) / 10000;
    uint256 amountAfterFee = msg.value - fee;
    collectedFees += fee;

    // Transfer the ETH directly to the recipient
    (bool sent, ) = to.call{value: amountAfterFee}('');
    require(sent, 'Failed to send ETH');

    transactions.push(
      Transaction({
        sender: msg.sender,
        receiver: to,
        amount: msg.value,
        message: message,
        timestamp: block.timestamp,
        isRequest: false,
        isPaid: true,
        senderUsername: usernames[msg.sender],
        receiverUsername: usernames[to]
      })
    );

    emit PaymentSent(msg.sender, to, msg.value, message, block.timestamp);
  }

  function requestPayment(address from, uint256 amount, string calldata message) external {
    require(amount > 0, 'Amount must be greater than zero');
    require(from != address(0), 'Invalid sender address');
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

  function setFeePercentage(uint256 _newFeePercentage) external onlyOwner {
    require(_newFeePercentage <= MAX_FEE_PERCENTAGE, 'Fee percentage too high');
    feePercentage = _newFeePercentage;
    emit FeePercentageUpdated(_newFeePercentage);
  }

  function withdrawFees() external onlyOwner {
    uint256 amount = collectedFees;
    collectedFees = 0;
    (bool sent, ) = owner().call{value: amount}('');
    require(sent, 'Failed to send fees');
    emit FeesWithdrawn(amount);
  }

  // Function to get the contract's balance
  function getContractBalance() external view returns (uint256) {
    return address(this).balance;
  }

  function getTransactions() external view returns (Transaction[] memory) {
    return transactions;
  }
}
