# BlockChain Developer-Capstone 

## Special Thanks
Special thanks to Mr. StefanelStan, https://github.com/StefanelStan/Blockchain-Capstone-Real-Estate-Marketplace, your code give me one workable environment, helped me step through each step and give me a deep understanding of what this project is all about, which I can't get from the course. 
Thanks for Ireade, https://github.com/ireade/nd1309-real-estate-marketplace, your code give me another idea how to work on the code. 
Thanks for Mr. Alvaro Andres Pinzon Cortes, https://medium.com/@andresaaap/capstone-real-estate-marketplace-project-faq-udacity-blockchain-69fe13b4c14e, without this article, I can't find the way to really understande the verifier usage methodology.

## Dependency
1. Solidity - solc: 0.5.5+commit.47a71e8f.Emscripten.clang
2. Node version: v12.16.3
3. Truffle version: v5.1.24 (core:5.1.24)
4. Web3 version: 1.2.6

## Project Instruction
In this project you will be minting your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property. 
Once the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase. 

## Contract deployment information on rinkeby as follows:
===========================
> Everything is up to date, there is nothing to compile.
Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x61fa11374e1706fd1db326e3fc935a041ae18a0216acf763bbef01dbefc84889
   > Blocks: 0            Seconds: 14
   > contract address:    0x7E8D2bfa58Cbc60f57B8a16Cf6f8A24805A20170
   > block number:        6591510
   > block timestamp:     1591028120
   > account:             0xE2fc9338fF8E2EBe595Ca1eDb7936d3B8e8CA032
   > balance:             4.1833558895
   > gas used:            223281 (0x36831)
   > gas price:           200 gwei
   > value sent:          0 ETH
   > total cost:          0.0446562 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0446562 ETH


2_deploy_contracts.js
=====================

   Deploying 'Verifier'
   --------------------
   > transaction hash:    0x5340342f28933cdadff45f424c1c8de79b756b8753baec7557677e9bf6fcc1f2
   > Blocks: 1            Seconds: 18
   > contract address:    0x9E86822fcCee6dBccfcd7403f1e9180584DB569c
   > block number:        6591513
   > block timestamp:     1591028165
   > account:             0xE2fc9338fF8E2EBe595Ca1eDb7936d3B8e8CA032
   > balance:             3.8875178895
   > gas used:            1436827 (0x15ec9b)
   > gas price:           200 gwei
   > value sent:          0 ETH
   > total cost:          0.2873654 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0x426895e5cbd017e5d429802a0e83069fe79173c0cfc802fc33fa7656d4363365
   > Blocks: 1            Seconds: 18
   > contract address:    0x62D0DF9AAF3A770d173897fBE7690b499E2302dc
   > block number:        6591515
   > block timestamp:     1591028195
   > account:             0xE2fc9338fF8E2EBe595Ca1eDb7936d3B8e8CA032
   > balance:             3.1367362895
   > gas used:            3753908 (0x3947b4)
   > gas price:           200 gwei
   > value sent:          0 ETH
   > total cost:          0.7507816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            1.038147 ETH


Summary
=======
> Total deployments:   3
> Final cost:          1.0828032 ETH

## Contract ABI
 Can be found in `eth-contracts/build/contracts` folder.
 
## OpenSea MarketPlace Storefront link
- Storefront link : `https://rinkeby.opensea.io/assets/qis_token`
- ERC721 Tokens: 'https://rinkeby.opensea.io/assets/0xB43AeB57241c0f1fF53209D1a601E86b726897B5/61 -- 71 '

- Minter: 'https://rinkeby.opensea.io/accounts/0xe2fc9338ff8e2ebe595ca1edb7936d3b8e8ca032'
- Buyer : `https://rinkeby.opensea.io/accounts/0xfa97Dbd81583bE7584575e6c016ecD230F742571`

## Work Process Instruction
These instructions will go over step by step how this project works. 

### Installing
'npm install'
'npm audit fix'

### Compile and tests the eth-contracts
'cd eth-contracts'
'truffle compile'
Open the Ganache Gui.
'truffle test'

## Deploy the contract on the Rinkeby test network
Fill in infuraKey and mnemonic into eth-contracts/config/ .
'cd eth-contracts'
'truffle migrate --network rinkeby'
'npm run dev'

## Generating the proof from zokrates (on MacOS Majove)
` cd zokrates\code\`
`docker run -v $(pwd):/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash`
'cd code'
'~/zokrates compile -i square/square.code'
`~/zokrates setup`
`~/zokrates compute-witness -a number square`
`~/zokrates generate-proof` 
`~/zokrates export-verifier`


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

### ABI of SolnSquareVerifier for easy copy:
[
    {
      "constant": true,
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_myid",
          "type": "bytes32"
        },
        {
          "name": "_result",
          "type": "string"
        }
      ],
      "name": "__callback",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_myid",
          "type": "bytes32"
        },
        {
          "name": "_result",
          "type": "string"
        },
        {
          "name": "_proof",
          "type": "bytes"
        }
      ],
      "name": "__callback",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPauseState",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "baseTokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "verifierAddress",
          "type": "address"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "SolutionAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "tokenID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "TokenMinted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "A",
          "type": "uint256[2]"
        },
        {
          "name": "A_p",
          "type": "uint256[2]"
        },
        {
          "name": "B",
          "type": "uint256[2][2]"
        },
        {
          "name": "B_p",
          "type": "uint256[2]"
        },
        {
          "name": "C",
          "type": "uint256[2]"
        },
        {
          "name": "C_p",
          "type": "uint256[2]"
        },
        {
          "name": "H",
          "type": "uint256[2]"
        },
        {
          "name": "K",
          "type": "uint256[2]"
        },
        {
          "name": "input",
          "type": "uint256[2]"
        },
        {
          "name": "_tokenID",
          "type": "uint256"
        }
      ],
      "name": "mintNewNFT",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]