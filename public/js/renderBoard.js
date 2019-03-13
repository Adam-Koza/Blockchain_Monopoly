var provider = new ethers.providers.Web3Provider(web3.currentProvider, 'ropsten');

var MonopolyContractAddress = "0xf87eb3d82dacc70be28fbc5d626c50bedc953f37";
var MonopolyContractABI = [{ "constant": false, "inputs": [], "name": "acceptOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_gameID", "type": "uint256" }, { "name": "_piece", "type": "uint256" }, { "name": "_gameHistory", "type": "string" }], "name": "endGame", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_bonusIssued", "type": "bool" }, { "name": "_bonus", "type": "uint256" }], "name": "endGame", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_gameID", "type": "uint256" }, { "name": "_piece", "type": "uint256" }, { "name": "_nickname", "type": "string" }], "name": "joinGame", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_piece", "type": "uint256" }, { "name": "_wager", "type": "uint256" }, { "name": "_nickname", "type": "string" }], "name": "newGame", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_gameID", "type": "uint256" }], "name": "startGame", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokenAddress", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferAnyERC20Token", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_gameID", "type": "uint256" }, { "indexed": false, "name": "_wager", "type": "uint256" }, { "indexed": false, "name": "_nickname", "type": "string" }, { "indexed": false, "name": "_gameMaster", "type": "address" }], "name": "NewGame", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_gameID", "type": "uint256" }, { "indexed": false, "name": "_piece", "type": "uint256" }, { "indexed": false, "name": "_nickname", "type": "string" }, { "indexed": false, "name": "_player", "type": "address" }], "name": "NewPlayer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_gameID", "type": "uint256" }, { "indexed": false, "name": "_gameMaster", "type": "address" }], "name": "GameStarted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_gameID", "type": "uint256" }, { "indexed": false, "name": "_winner", "type": "address" }, { "indexed": false, "name": "_gameHistory", "type": "string" }], "name": "GameEnded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "tokenOwner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowed", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bonus", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bonusIssued", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "gameID", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "gameInfo", "outputs": [{ "name": "gameMaster", "type": "address" }, { "name": "exists", "type": "bool" }, { "name": "started", "type": "bool" }, { "name": "ended", "type": "bool" }, { "name": "wager", "type": "uint256" }, { "name": "pot", "type": "uint256" }, { "name": "gameHistory", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "newOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_gameID", "type": "uint256" }, { "name": "_pieceID", "type": "uint256" }], "name": "pieceStatus", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "bool" }, { "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
var MonopolyContract;


provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);
    MonopolyContract = new ethers.Contract(MonopolyContractAddress, MonopolyContractABI, signer);
})

function renderBoard() {
    gameState = JSON.parse(document.getElementById("state").innerHTML);

    drawBuildings(gameState);
    drawPieces(gameState);
    drawButtons();
    drawHistory();
    drawPlayerStatus();
    drawGameStatus();]
}

function drawBuildings(gameState) {
    for (i = 0; i < gameState.game.board.spaces.length; i++) {
        if ((i > 0 && < 10) && (gameState.game.board.spaces.hotel || gameState.game.board.spaces.houses > 0)) {
            document.getElementById(i).innerHTML = '<div class="bottomBuildings"></div>';
            if (gameState.game.board.spaces.hotel) {
                document.getElementById(i).innerHTML += '<div class="topBottomHotel">.</div>';
            } else {
                if (gameState.game.board.spaces.houses > 0) {
                    for (j = 0; j < gameState.game.board.spaces.houses; j++) {
                        document.getElementById(i).innerHTML += '<div class="topBottomHouse">.</div>';
                    }
                }
            }
            document.getElementById(i).innerHTML += '</div>'
        }

        if ((i > 10 && < 20) && (gameState.game.board.spaces.hotel || gameState.game.board.spaces.houses > 0)) {
            document.getElementById(i).innerHTML = '<div class="leftBuildings"></div>';
            if (gameState.game.board.spaces.hotel) {
                document.getElementById(i).innerHTML += '<div class="middleHotel">.</div>';
            } else {
                if (gameState.game.board.spaces.houses > 0) {
                    for (j = 0; j < gameState.game.board.spaces.houses; j++) {
                        document.getElementById(i).innerHTML += '<div class="middleHouse">.</div>';
                    }
                }
            }
            document.getElementById(i).innerHTML += '</div>'
        }

        if ((i > 20 && < 30) && (gameState.game.board.spaces.hotel || gameState.game.board.spaces.houses > 0)) {
            document.getElementById(i).innerHTML = '<div class="topBuildings"></div>';
            if (gameState.game.board.spaces.hotel) {
                document.getElementById(i).innerHTML += '<div class="topBottomHotel">.</div>';
            } else {
                if (gameState.game.board.spaces.houses > 0) {
                    for (j = 0; j < gameState.game.board.spaces.houses; j++) {
                        document.getElementById(i).innerHTML += '<div class="topBottomHouse">.</div>';
                    }
                }
            }
            document.getElementById(i).innerHTML += '</div>'
        }

        if ((i > 30 && < 40) && (gameState.game.board.spaces.hotel || gameState.game.board.spaces.houses > 0)) {
            document.getElementById(i).innerHTML = '<div class="rightBuildings"></div>';
            if (gameState.game.board.spaces.hotel) {
                document.getElementById(i).innerHTML += '<div class="middleHotel">.</div>';
            } else {
                if (gameState.game.board.spaces.houses > 0) {
                    for (j = 0; j < gameState.game.board.spaces.houses; j++) {
                        document.getElementById(i).innerHTML += '<div class="middleHouse">.</div>';
                    }
                }
            }
            document.getElementById(i).innerHTML += '</div>'
        }
    }
}