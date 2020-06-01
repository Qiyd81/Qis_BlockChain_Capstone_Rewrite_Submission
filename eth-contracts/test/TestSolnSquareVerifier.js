// const truffleAssert = require('truffle-assertions');
const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

const proofData1 = {
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

const proofData2 = {
	"proof":
	{
		"A":["0x14089d7dd6636954cce285c73aeb0d3cdf78b7aae275f0cd400177d366698f65", "0xaf3a242d59766e09db5d5416ce03a20e6b27218e5d7ff264e6ff9172af330c4"],
		"A_p":["0xcacebf202ba37338864c74975d1e5d21555773b678f48b51b76c3a00c5e0cc", "0x2a27e610b1b798601c6e73a4d4f657bc362d07f268ec2b9a391651e3a07f540d"],
		"B":
			[["0x13af6092eff52dd2628f176d32ee584d66dd402dfa1a225d9a63dbaf88b64c3e", "0x22c692f26f337f404e7571c051d67091568725b0b843bfea27f54dc652ad0323"], ["0x13c33a497f0c7a9a93de37fa5afec08da034a2ee96aeedb62f43e1304cefa06c", "0xadfc64b737936f59a5f62594cc888f6cc8e69695ecbb19158babe64e39da49f"]],
		
		"B_p":["0x1ff694f21754b5ff83c8f60c8727f76bb5b6280cbef2a8e1fe7acf12d12b572c", "0x2aec7d37299152635385e0b18e844e74cf4e97fdd0192970a6f905f1e286c3ac"],
		"C":["0x13877cd69de0c501c14257a31278c8d70c87c10dd6919ba9c69b9478d5d42993", "0x22650aed64569eb431c963f3d67d2003aaad22abd73e8eb7fe2f5bd394e3a6be"],
		"C_p":["0x962465285614048126c382192c66e366bea8502323f87812ff38c3417089bb7", "0xf3934916b66ceaf4ae600faae803c2c7919f3055f6ba8213e1cd5ed8900359d"],
		"H":["0x1cd6a0fef0d2f622b04b5674a8b3044acd37bc33ff6ecd57c1d9e390f9103aaa", "0x3f29f3c46438a95d5fb87f6a921ac36ee559c45f183c150f5fc1e307461f386"],
		"K":["0x1673636bae867a07ca299036b2825287820501abbe232d2eabefbaee1ee214e2", "0x28c78fdc4e6338efeb3c3527212092cb488582defbdf0d2a43e4176d5e022648"]
	},
	"input":[4,1]}
    
contract('SolnSquareVerifier', accounts => {

    let verifierInstance;
    let contractInstance;

    const name = "Qis_Token";
    const symbol = "Qis_House";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    describe('mintNewNFT', () => {
        // let tokenId = 71;
        before(async() => { 
            verifierInstance = await Verifier.new({from: accounts[0]});
            contractInstance = await SolnSquareVerifier.new(Verifier.address, name, symbol, {from: accounts[0]});
        }); 

        it('Can mint token with correct proof and non-exist tokenID', async function () {

            await contractInstance.mintNewNFT(
                proofData1.proof.A,
                proofData1.proof.A_p,
                proofData1.proof.B,
                proofData1.proof.B_p,
                proofData1.proof.C,
                proofData1.proof.C_p,
                proofData1.proof.H,
                proofData1.proof.K,
                proofData1.input,
                71,
                {from: accounts[0]}
            );      
            const tokenOwner = await contractInstance.ownerOf(71);
            // tokenId++;
            assert.equal(tokenOwner, accounts[0], "token owner is not correct");
        });

        it('Fail mint token with repeated proof and non-exist tokenID', async function () {
            let status = false;
            try {
                await contractInstance.mintNewNFT(
                    proofData1.proof.A,
                    proofData1.proof.A_p,
                    proofData1.proof.B,
                    proofData1.proof.B_p,
                    proofData1.proof.C,
                    proofData1.proof.C_p,
                    proofData1.proof.H,
                    proofData1.proof.K,
                    proofData1.input,
                    72,
                    {from: accounts[0]}
                );
            } catch (err) {
                status = true;
            }   
            assert.equal(status, true, "Repeated proof can't mint");       
        });

        it('Fail mint token with new proof and existed tokenID', async function () {
            let status = false;
            try {
                await contractInstance.mintNewNFT(
                    proofData2.proof.A,
                    proofData2.proof.A_p,
                    proofData2.proof.B,
                    proofData2.proof.B_p,
                    proofData2.proof.C,
                    proofData2.proof.C_p,
                    proofData2.proof.H,
                    proofData2.proof.K,
                    proofData2.input,
                    71,
                    {from: accounts[0]}
                );
            } catch (err) {
                status = true;
            }   
            assert.equal(status, true, "Repeated proof can't mint");       
        });

        it('Can mint token with new proof and new tokenID', async function () {

            await contractInstance.mintNewNFT(
                proofData2.proof.A,
                proofData2.proof.A_p,
                proofData2.proof.B,
                proofData2.proof.B_p,
                proofData2.proof.C,
                proofData2.proof.C_p,
                proofData2.proof.H,
                proofData2.proof.K,
                proofData2.input,
                72,
                {from: accounts[0]}
            );
            const tokenOwner = await contractInstance.ownerOf(72);
            // tokenId++;
            assert.equal(tokenOwner, accounts[0], "token owner is not correct");      
        });
    });

})