pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/drafts/Counters.sol';
import "./ERC721Mintable.sol";

//2. TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {
    using Counters for Counters.Counter;
    Verifier private verifierContract;
    // string Verified;
    // string Minted;

    // 3. TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address acount;
        MintState mintState; 
    }
   enum MintState{Verified, Minted}

    // 4. TODO define an array of the above struct
    Solution[] private solutionArray;
    Counters.Counter private solutionCount;

    // 5. TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) solutions;

    // 6. TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address indexed acount);

    constructor(address verifierAddress, string memory name, string memory symbol) 
        ERC721Mintable(name, symbol) 
        public 
    {
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
        uint256[2] memory input
    ) 
        public 
    {
        bytes32 solutionHash = getSolutionHash(input);
        require(solutions[solutionHash].acount == address(0), "Solution exists already");
        
        bool verified = verifierContract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input);
        require(verified, "Solution is not verified");
        solutionCount.increment();
        solutions[solutionHash] = Solution(solutionCount.current(), msg.sender, MintState.Verified);

        emit SolutionAdded(solutions[solutionHash].index, msg.sender);
    }

    // 8. TODO Create a function to mint new NFT only after the solution has been verified
    //      - make sure the solution is unique (has not been used before)
    //      - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(uint[2] memory input) public
    {
        bytes32 solutionHash = getSolutionHash(input);
        require(solutions[solutionHash].acount != address(0), "Solution not exist");
        require(solutions[solutionHash].mintState != MintState.Minted, "Solution already minted for this solution");
        require(solutions[solutionHash].acount == msg.sender, "Only solution owner can mint");
        super.mint(msg.sender, solutions[solutionHash].index);
        solutions[solutionHash].mintState = MintState.Minted;
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
