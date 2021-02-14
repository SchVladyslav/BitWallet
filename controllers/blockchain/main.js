const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('f795918c9a89d2c92a7b836dd1e720ff335a76a6f7465ffcf3117d9a328747dc');
const myWalletAddress = myKey.getPublic('hex');
// 0446175f8516ca1e1df1366ef5735641befe6ca23aeeecd3ef128f8068655969ef58149eed502aaf0d6dde5f720a86d909284a88ea04a3e75f4bda5d4288dc9211

let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log('\n Starting the miner...');
coin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of xalaver is', coin.getBalanceOfAddress(myWalletAddress));

// coin.createTransaction(new Transaction('address1', 'address2', 100));
// coin.createTransaction(new Transaction('address2', 'address1', 50));

// console.log('\n Starting the miner...');
// coin.minePendingTransactions('xaviers-address');
// console.log('\nBalance of xalaver is', coin.getBalanceOfAddress('xaviers-address'));

// console.log('Mining block 1...');
// coin.addBlock(new Block(1, "01/02/2021", {amount: 4}));
// console.log('Mining block 2...');
// coin.addBlock(new Block(2, "01/02/2021", {amount: 10}));



// console.log(coin.isChainValid());
// coin.chain[1].data = {amount: 100};
// console.log(coin.isChainValid());

//console.log(JSON.stringify(coin, null, 4));