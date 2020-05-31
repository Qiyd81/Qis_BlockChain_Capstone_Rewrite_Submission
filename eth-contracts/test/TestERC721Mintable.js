const truffleAssert = require('truffle-assertions');
const ERC721Mintable = artifacts.require('ERC721Mintable');

contract('ERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "Qis_Token";
    const symbol = "Qis_House";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    let contractInstance;
    describe('match erc721 spec', () => {
        const tokensIds = [1, 2, 3, 4, 5];
         before(async() => { 
             contractInstance = await ERC721Mintable.new(name, symbol, {from: account_one});
             // TODO: mint multiple tokens
             for (let i = 0; i < tokensIds.length; i++) {
                 await contractInstance.mint(account_one, tokensIds[i], {from: account_one});

             }
         });

        it('should return total supply', async() => { 
            const totalSupply = await contractInstance.totalSupply.call({from: account_two});
            assert.equal(totalSupply, 5, 'totalSupply number is wrong');
         });

        it('should get token balance', async() => { 
            const a1Balance = await contractInstance.balanceOf(account_one);
            assert.equal(a1Balance, 5, 'Balance of account_one is wrong');

            const a2Balance = await contractInstance.balanceOf(account_two);
            assert.equal(a2Balance, 0, 'totalSupply number is wrong');     
         });

         // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async() => { 
            const t0Uri = await contractInstance.tokenURI(tokensIds[0]); 
            assert.equal(t0Uri, `${baseTokenURI}${tokensIds[0]}`, 't0Uri is wrong');

            const t1Uri = await contractInstance.tokenURI(tokensIds[1]); 
            assert.equal(t1Uri, `${baseTokenURI}${tokensIds[1]}`, 't1Uri is wrong');
        });

        it('should transfer token from one owner to another and verify this', async() => { 
            await contractInstance.transferFrom(account_one, account_two, tokensIds[0], {from: account_one});
            const a1Balance = await contractInstance.balanceOf(account_one);
            const a2Balance = await contractInstance.balanceOf(account_two);
            assert.equal(a1Balance, 4, 'Balance of account_one is wrong');
            assert.equal(a2Balance, 1, 'Balance of account_one is wrong');
        });         

        it('Token owner can approve another account to operate the token', async() => {
            await contractInstance.approve(account_two, tokensIds[2], {from: account_one});
            let addr = await contractInstance.getApproved(tokensIds[2]);
            assert.equal(addr, account_two, 'Token was not correctly approved');
        });

        it('Approved account can transfer token to another account', async() => { 
            await contractInstance.transferFrom(account_one, accounts[3], tokensIds[2], {from: account_two});
            const a1Balance = await contractInstance.balanceOf(account_one);
            const a3Balance = await contractInstance.balanceOf(accounts[3]);
            assert.equal(a1Balance, 3, 'Balance of account_one is wrong');
            assert.equal(a3Balance, 1, 'Balance of account_one is wrong');
        });

    })

    describe('have ownership properties', function () {
        before(async() => { 
            contractInstance = await ERC721Mintable.new(name, symbol, {from: account_one});
        });

        it('should fail when minting when address is not contract owner', async() => { 
            let status = false;

            try {
                await contractInstance.mint(account_two, 7, {from: account_two});
            } catch (err) {
                status = true;
            }
    
            assert.equal(status, true, "Non-owner can't mint");
        });

        it('should return contract owner', async() => { 
            let theOwner = await contractInstance.owner({from: account_two});
            assert.equal(theOwner, account_one, 'Owner of the contract is wrong');
        });

        it('should reject unauthorized address to transfer ownership', async() => {
            let status = false;
            try {
                await contractInstance.transferOwnership(accounts[3], {from: account_two});
             } catch (err) {
                 status = true;
             }
            assert.equal(status, true, 'Only Owner of the contract can transfer ownership');
        });

        it('Owner can transfer ownership', async() => {
            await contractInstance.transferOwnership(account_two, {from: account_one});
            let theOwner = await contractInstance.owner({from: account_two});
            assert.equal(theOwner, account_two, 'Contract owner was not transfered correctly')
        });
    });

    describe('have pausable functionality', function () {
    
        before(async function () {
            contractInstance = await ERC721Mintable.new(name, symbol, {from: account_one});
        });
    
        it('Can get the contract pause state', async function () {
            const status = await contractInstance.getPauseState({from: account_one}); 
            assert.equal(status, false, 'Contract initial pause state wrong');
        });

        it('Owner can pause the contract', async function () {
            await contractInstance.pause({from: account_one});
            const status = await contractInstance.getPauseState({from: account_one}); 
            assert.equal(status, true, 'Contract not paused correctly');
        });
    
        it('should be able to change paused state', async function () {
            await contractInstance.unpause({from: account_one});
            const status = await contractInstance.getPauseState({from: account_one}); 
            assert.equal(status, false, 'Contract not unpaused correctly');
        });
    
    });
})