pragma solidity 0.5.0;

contract Monopoly {
    
    address public owner;
    uint public gameID;
    mapping(uint => Game) public gameInfo;

    // Token Balance
    mapping(address => uint) public Balance;
    
    struct Game {
        address game_master;
        bool started;
        bool ended;
        uint wager;
        uint pot;
        string gameHistory;
        mapping(uint => Piece) pieceInfo;
    }

    struct Piece {
        string name;
        bool taken;
        address owner;
    }


    constructor () public {
        owner = msg.sender;
    }

    function isPieceAvailable (uint _gameID, uint _pieceID) public view returns(bool) {
        return gameInfo[_gameID].pieceInfo[_pieceID].taken;
    }

    function newGame (uint _piece, uint _wager, string memory _name) public {
        require(Balance[msg.sender] >= _wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid."); 
        gameID += 1;
        gameInfo[gameID].game_master = msg.sender;
        gameInfo[gameID].wager = _wager;
        gameInfo[gameID].pot += _wager;
        gameInfo[gameID].pieceInfo[_piece].name = _name;
        gameInfo[gameID].pieceInfo[_piece].taken = true;
        gameInfo[gameID].pieceInfo[_piece].owner = msg.sender;
    }
}