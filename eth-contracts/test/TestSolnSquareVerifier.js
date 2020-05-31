const truffleAssert = require('truffle-assertions');

const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

const proofData = {
	"proof":
	{
		"A":["0x2b2d5ebbfdf78b91e30f8e102df58d4f65f32fe51a5299e5e1bf3b1d35f106f1", "0x12781c1b75bb5c9a5e848edd5ab1dd93d1a8b626b487f4adda77e4c0e4263b24"],
		"A_p":["0x1081c7bbe5a4d48044521213040ec465ff13921268ff0e65594f53ea3a66c3fa", "0x216793f9d033c52440a2e67387794ed017a4ad48634c961d54de331f79fc95cf"],
		"B":
			[["0x3310d8f98231bd8ee5d002232eda2d52e059bf86965ed6e642958e04e3aa813", "0x16fbf63e41bc9ec3c15db45a0399350856f031e6668721591de8e4ff07edc26c"], ["0xa220bfd32b628d63346707b36eadf9c823617812645a72e36db7b556c675f62", "0x297a5e948ed3e77264e9c9d6fea4311ffc1450b461c8ccaf2a5214c17eb7a6e"]],
		
		"B_p":["0x2291b1b8330dd3daba57d82323a19790f7b05938abbb0126b96610c37d88f8ba", "0x1c65f1e74a3bec814cbbe441213dc8a472a2b1fa24b0592d2c662188b3414b64"],
		"C":["0x1305a5d513333d82d10c71436ec6f56af92a5c282de3f58239b2df820517c713", "0x2acd136c17966f8f19c07713c8ad22d0f90ead59894c40a82ae5b9fde90da32d"],
		"C_p":["0xcead185aacfe46c269d876ebca05a14710f998c69d2e9ac3bc9ce8d276f639c", "0x145163d13659b86fd4e688e8b9e478e19470a1797230421f3c5c5ae2b7de4ccc"],
		"H":["0x2f620d8febb7617d1a52383d22583facbf672b7214bc86bdf901393a199e06a4", "0x14fe4996567bd2f533e72db5a4fad9a697920b36600ae258edcdae34c43da90e"],
		"K":["0x24f3c3cb003a12367f0bfec2246790e064a8adb7e576d7adc5858487566c027e", "0x40f6e4ca2c0198e3af127e22f447141b6b0baa5622f58953f87e188a7c006c"]
	},
    "input":[49,1]}
    
contract('SolnSquareVerifier', accounts => {

    let verifierInstance;
    let contractInstance;

    const name = "Qis_Token";
    const symbol = "Qis_House";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    describe('addSolution', () => {

        before(async() => { 
            verifierInstance = await Verifier.new({from: accounts[0]});
            contractInstance = await SolnSquareVerifier.new(Verifier.address, name, symbol, {from: accounts[0]});
        }); 

        it('Can add a solution with correct proof', async() => {
            const tx = await contractInstance.addSolution(
                proofData.proof.A,
                proofData.proof.A_p,
                proofData.proof.B,
                proofData.proof.B_p,
                proofData.proof.C,
                proofData.proof.C_p,
                proofData.proof.H,
                proofData.proof.K,
                proofData.input,
                {from: accounts[0]}
            );
            const addEvent = tx.logs.find((log) => log.event === 'SolutionAdded');
            const addEventEmitted = !!(addEvent);
        
            tokenIndex = addEvent.args.index;
        
            assert.equal(addEventEmitted, true, "Add solution event not emitted");
        });

        it('Can mint token with verified proof', async function () {

            await contractInstance.mintNewNFT(
                proofData.input,
                {from: accounts[0]}
            );
        
            const tokenOwner = await contractInstance.ownerOf(tokenIndex);
        
            assert.equal(tokenOwner, accounts[0], "Minter is not token owner");
        });
    });

})