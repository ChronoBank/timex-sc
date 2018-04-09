const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')

// First read in the secrets.json to get our mnemonic
let secrets
let mnemonic
if (fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))
  mnemonic = { secrets }
} else {
  // eslint-disable-next-line no-console
  console.log('No secrets.json found. If you are trying to publish EPM this will fail. Otherwise, you can ignore this message!')
  mnemonic = ''
}

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    live: {
      network_id: 1 // Ethereum public network
      // optional config values
      // host - defaults to 'localhost'
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io')
      },
      network_id: 3
    },
    demo: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'http://192.168.10.6:8545')
      },
      network_id: 135744, // 0x21240
      gas: 4700000,
      gasPrice: 0x01
    },
    stage: {
      provider: new HDWalletProvider(mnemonic, 'http://node1.parity.tp.ntr1x.com:8545'),
      network_id: 135744, // 0x21240
      gas: 4700000,
      gasPrice: 0x01
    },
    testrpc: {
      network_id: 'default'
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    }
  }
}