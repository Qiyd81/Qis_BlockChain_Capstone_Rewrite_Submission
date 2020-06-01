// pragma solidity >=0.4.21 <0.6.0;

// import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
// import "./ERC721Mintable.sol";

// //2. TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// contract SolnSquareVerifier is ERC721Mintable {
//     using Counters for Counters.Counter;
//     Verifier private verifierContract;
//     // string Verified;
//     // string Minted;

//     // 3. TODO define a solutions struct that can hold an index & an address
//     struct Solution {
//         uint index;
//         address acount;
//         MintState mintState; 
//     }
//    enum MintState{Verified, Minted}

//     // 4. TODO define an array of the above struct
//     Solution[] private solutionArray;
//     Counters.Counter private solutionCount;

//     // 5. TODO define a mapping to store unique solutions submitted
//     mapping (bytes32 => Solution) solutions;

//     // 6. TODO Create an event to emit when a solution is added
//     event SolutionAdded(uint256 index, address indexed acount);

//     constructor(address verifierAddress, string memory name, string memory symbol) 
//         ERC721Mintable(name, symbol) 
//         public 
//     {
//         verifierContract = Verifier(verifierAddress);
//     }

//     function getSolutionHash(uint[2] memory input)
//             private
//             returns (bytes32)
//     {
//         return keccak256( abi.encodePacked(input[0], input[1]) );
//     }

//     // 7. TODO Create a function to add the solutions to the array and emit the event
//     function addSolution(
//         uint256[2] memory A,
//         uint256[2] memory A_p,
//         uint256[2][2] memory B,
//         uint256[2] memory B_p,
//         uint256[2] memory C,
//         uint256[2] memory C_p,
//         uint256[2] memory H,
//         uint256[2] memory K,
//         uint256[2] memory input
//     ) 
//         public 
//     {
//         bytes32 solutionHash = getSolutionHash(input);
//         require(solutions[solutionHash].acount == address(0), "Solution exists already");
        
//         bool verified = verifierContract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input);
//         require(verified, "Solution is not verified");
//         solutionCount.increment();
//         solutions[solutionHash] = Solution(solutionCount.current(), msg.sender, MintState.Verified);

//         emit SolutionAdded(solutions[solutionHash].index, msg.sender);
//     }

//     // 8. TODO Create a function to mint new NFT only after the solution has been verified
//     //      - make sure the solution is unique (has not been used before)
//     //      - make sure you handle metadata as well as tokenSuplly
//     function mintNewNFT(uint[2] memory input) public
//     {
//         bytes32 solutionHash = getSolutionHash(input);
//         require(solutions[solutionHash].acount != address(0), "Solution not exist");
//         require(solutions[solutionHash].mintState != MintState.Minted, "Solution already minted for this solution");
//         require(solutions[solutionHash].acount == msg.sender, "Only solution owner can mint");
//         super.mint(msg.sender, solutions[solutionHash].index);
//         solutions[solutionHash].mintState = MintState.Minted;
//     }
// }

// //1. TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// contract Verifier {
//     function verifyTx(
//         uint256[2] memory A,
//         uint256[2] memory A_p,
//         uint256[2][2] memory B,
//         uint256[2] memory B_p,
//         uint256[2] memory C,
//         uint256[2] memory C_p,
//         uint256[2] memory H,
//         uint256[2] memory K,
//         uint256[2] memory input
//     )
//     public
//     returns
//     (bool r);
// }

pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import "./ERC721Mintable.sol";

// //1. TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// contract CallVerifier {
//     Verifier private verifierContract;

//     constructor()
// }

//2. TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {
    // using Counters for Counters.Counter;
    Verifier private verifierContract;
    // address private contractOwner;
    // string tokenName;
    // string tokenSymbol;

    // 3. TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
    }


    // 4. TODO define an array of the above struct
    // Solution[] private solutionArray;

    // Counters.Counter private solutionCount;
    uint256 private solutionCount;
    // mapping (uint256 => address) solutionIDs;

    // 5. TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) uniqSolutions;
    mapping (uint256 => address) mintedTokens;

    // 6. TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address indexed account);
    // event SolutionExists(uint256 index, address indexed account);
    event TokenMinted(uint256 tokenID, address indexed account);

    constructor(address verifierAddress, string memory name, string memory symbol) 
        ERC721Mintable(name, symbol)
        public 
    {
        // contractOwner = msg.sender;
        verifierContract = Verifier(verifierAddress);
    }

    function getSolutionHash(uint[2] memory input)
            private
            returns (bytes32)
    {
        return keccak256( abi.encodePacked(input[0], input[1]) );
    }

    // 7. TODO Create a function to add the solutions to the array and emit the event
    function addSolution(        
        uint256[2] memory A,
        uint256[2] memory A_p,
        uint256[2][2] memory B,
        uint256[2] memory B_p,
        uint256[2] memory C,
        uint256[2] memory C_p,
        uint256[2] memory H,
        uint256[2] memory K,
        uint256[2] memory input)  
        internal 
    {
        // require(contractOwner == msg.sender, 'Only the contract owner can add a solution');
        // require(solutionIDs[_tokenID] == address(0), 'Solution exists already');
        require(verifierContract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input), 'proof is not valid');
        bytes32 hash = getSolutionHash(input);
        require(uniqSolutions[hash].account == address(0), 'Solution already exists');

        // solutionIDs[_tokenID] = msg.sender;

        // Solution memory tok = Solution(_tokenID, msg.sender);
        solutionCount++;
        // uint256 index = uint256(solutionCount);
        uniqSolutions[hash] = Solution(solutionCount, msg.sender);
        // solutionCount++;
        // solutionArray[solutionCount] = tok;

        // bytes32 uniqHash = getSolutionHash(input);
        // uniqSolutions[uniqHash] = tok;

        emit SolutionAdded(solutionCount, msg.sender);
    }

    // 8. TODO Create a function to mint new NFT only after the solution has been verified
    //      - make sure the solution is unique (has not been used before)
    //      - make sure you handle metadata as well as tokenSuplly

    // The steps are these:
    // The user executes the mint function and inputs to it the the necessary parameters to mint and proof
    // Verify that the proof was not used previously
    // Verify that the proof is valid
    // Execute the addSolution function to store the solution to make sure that this solution can’t be used in the future
    // Mint the token
    function mintNewNFT(     
        uint256[2] memory A,
        uint256[2] memory A_p,
        uint256[2][2] memory B,
        uint256[2] memory B_p,
        uint256[2] memory C,
        uint256[2] memory C_p,
        uint256[2] memory H,
        uint256[2] memory K, 
        uint256[2] memory input,
        uint256 _tokenID) 
        public
    {
        bytes32 hash = getSolutionHash(input);
        require(uniqSolutions[hash].account == address(0), 'Solution already exists'); 
        require(verifierContract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input), 'proof is not valid');
        require(mintedTokens[_tokenID] == address(0), 'Token already exists');
        addSolution(A, A_p, B, B_p, C, C_p, H, K, input);
        super.mint(msg.sender, _tokenID);
        mintedTokens[_tokenID] = msg.sender;
        emit TokenMinted(_tokenID, msg.sender);
    }
}

//1. TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
    function verifyTx(
        uint256[2] memory A,
        uint256[2] memory A_p,
        uint256[2][2] memory B,
        uint256[2] memory B_p,
        uint256[2] memory C,
        uint256[2] memory C_p,
        uint256[2] memory H,
        uint256[2] memory K,
        uint256[2] memory input
    )
    public
    returns
    (bool r);
}
