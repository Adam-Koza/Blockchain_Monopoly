pragma solidity 0.5.0;

// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a, "");
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a, "");
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b, "");
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0, "");
        c = a / b;
    }
}

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

// ----------------------------------------------------------------------------
// Contract function to receive approval and execute function in one call
//
// Borrowed from MiniMeToken
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}

// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner, "You are not the new owner.");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}

contract Monopoly is ERC20Interface, Owned {
    using SafeMath for uint;

    // Game Requirments
    event NewGame(uint indexed _gameID, uint _wager, string _nickname, address _gameMaster);
    event NewPlayer(uint indexed _gameID, uint _piece, string _nickname, address _player);
    event GameStarted(uint indexed _gameID, address _gameMaster);
    event GameEnded(uint indexed _gameID, address _winner, string _gameHistory);

    uint public gameID;
    mapping(uint => Game) public gameInfo;
    
    struct Game {
        address gameMaster;
        bool exists;
        bool started;
        bool ended;
        uint wager;
        uint pot;
        string gameHistory;
        mapping(address => bool) players;
        mapping(uint => Piece) pieceInfo;
    }

    struct Piece {
        string nickname;
        bool taken;
        address owner;
    }

    // Token Requirements
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;
    uint public bonus;
    bool public bonusIssued;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;


    constructor () public {
        symbol = "MONO";
        name = "Monopoly Money";
        decimals = 1;
        bonus = 500;
        bonusIssued = true;
        _totalSupply = 10000;
        balances[owner] = _totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }

    function pieceStatus (uint _gameID, uint _pieceID) public view returns(string memory, bool, address) {
        return(gameInfo[_gameID].pieceInfo[_pieceID].nickname, 
            gameInfo[_gameID].pieceInfo[_pieceID].taken,
            gameInfo[_gameID].pieceInfo[_pieceID].owner);
    }

    function newGame (uint _piece, uint _wager, string memory _nickname) public returns(uint) {
        require(balances[msg.sender] >= _wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid."); 
        gameID += 1;
        gameInfo[gameID].gameMaster = msg.sender;
        gameInfo[gameID].exists = true;
        gameInfo[gameID].wager = _wager;
        gameInfo[gameID].pot += _wager;
        gameInfo[gameID].pieceInfo[_piece].nickname = _nickname;
        gameInfo[gameID].pieceInfo[_piece].taken = true;
        gameInfo[gameID].pieceInfo[_piece].owner = msg.sender;
        balances[msg.sender] -= _wager;
        gameInfo[gameID].players[msg.sender] = true;
        emit NewGame(gameID, _wager, _nickname, msg.sender);
        return gameID;
    }

    function joinGame (uint _gameID, uint _piece, string memory _nickname) public returns(bool success) {
        require(gameInfo[_gameID].exists, "Game does not exist.");
        require(!gameInfo[_gameID].ended, "Game has ended.");
        require(!gameInfo[_gameID].ended, "Game has already started.");
        require(!gameInfo[_gameID].players[msg.sender], "Player already exists.");
        require(balances[msg.sender] >= gameInfo[_gameID].wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid.");
        require(!gameInfo[_gameID].pieceInfo[_piece].taken, "Piece has been taken.");
        gameInfo[_gameID].pot += gameInfo[_gameID].wager;
        gameInfo[_gameID].pieceInfo[_piece].nickname = _nickname;
        gameInfo[_gameID].pieceInfo[_piece].taken = true;
        gameInfo[_gameID].pieceInfo[_piece].owner = msg.sender;
        balances[msg.sender] -= gameInfo[_gameID].wager;
        gameInfo[_gameID].players[msg.sender] = true;
        emit NewPlayer(_gameID, _piece, _nickname, msg.sender);
        return true;
    }

    function startGame (uint _gameID) public returns(bool success) {
        require(msg.sender == gameInfo[_gameID].gameMaster, "You are not the game master.");
        gameInfo[_gameID].started = true;
        emit GameStarted(_gameID, msg.sender);
        return true;
    }

    function endGame (uint _gameID, uint _piece, string memory _gameHistory) public onlyOwner returns (bool success) {
        require(msg.sender == owner, "You are not the owner.");
        gameInfo[_gameID].ended = true;
        balances[gameInfo[_gameID].pieceInfo[_piece].owner] += gameInfo[_gameID].pot;
        if (bonusIssued) {
            balances[gameInfo[_gameID].pieceInfo[_piece].owner] += bonus;
            _totalSupply += bonus;
        }
        gameInfo[_gameID].gameHistory = _gameHistory;
        emit GameEnded(_gameID, gameInfo[_gameID].pieceInfo[_piece].owner, _gameHistory);
        return true;
    }



     // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public view returns (uint) {
        return _totalSupply.sub(balances[address(0)]);
    }


    // ------------------------------------------------------------------------
    // Get the token balance for account `tokenOwner`
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }


    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Transfer `tokens` from the `from` account to the `to` account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account. The `spender` contract function
    // `receiveApproval(...)` is then executed
    // ------------------------------------------------------------------------
    function approveAndCall(address spender, uint tokens, bytes memory data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, address(this), data);
        return true;
    }


    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function () external payable {
        revert("Don't Send ETH.");
    }


    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }

}