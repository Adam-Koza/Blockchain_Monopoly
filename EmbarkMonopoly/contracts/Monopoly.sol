pragma solidity 0.5.0;

contract Monopoly {

    event NewGame(uint indexed _gameID, uint _wager, string _nickname, address _gameMaster);
    
    address public owner;
    uint public gameID;
    mapping(uint => Game) public gameInfo;

    // Token Balance
    mapping(address => uint) public Balance;
    
    struct Game {
        address gameMaster;
        bool started;
        bool ended;
        uint wager;
        uint pot;
        string gameHistory;
        mapping(uint => Piece) pieceInfo;
    }

    struct Piece {
        string nickname;
        bool taken;
        address owner;
    }


    constructor () public {
        owner = msg.sender;
        Balance[msg.sender] = 10000;
    }

    function pieceStatus (uint _gameID, uint _pieceID) public view returns(string memory, bool, address) {
        return(gameInfo[_gameID].pieceInfo[_pieceID].nickname, 
            gameInfo[_gameID].pieceInfo[_pieceID].taken,
            gameInfo[_gameID].pieceInfo[_pieceID].owner);
    }

    function newGame (uint _piece, uint _wager, string memory _nickname) public returns(uint) {
        require(Balance[msg.sender] >= _wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid."); 
        gameID += 1;
        gameInfo[gameID].gameMaster = msg.sender;
        gameInfo[gameID].wager = _wager;
        gameInfo[gameID].pot += _wager;
        gameInfo[gameID].pieceInfo[_piece].nickname = _nickname;
        gameInfo[gameID].pieceInfo[_piece].taken = true;
        gameInfo[gameID].pieceInfo[_piece].owner = msg.sender;
        Balance[msg.sender] -= _wager;
        emit NewGame(gameID, _wager, _nickname, msg.sender);
        return gameID;
    }

}