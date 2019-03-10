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

// ----------------------------------------------------------------------------
// Game Contract.
// 
// 
// (Token Source: https://theethereum.wiki/w/index.php/ERC20_Token_Standard
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2018. The MIT Licence.)
// ----------------------------------------------------------------------------
contract Monopoly is ERC20Interface, Owned {
    using SafeMath for uint;

    event NewGame (uint indexed _gameID, uint _wager, string _nickname, address _gameMaster);
    event NewPlayer (uint indexed _gameID, uint _piece, string _nickname, address _player);
    event GameStarted (uint indexed _gameID, address _gameMaster);
    event GameEnded (uint indexed _gameID, address _winner, string _gameHistory);

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

    modifier validJoin (uint _gameID, uint _piece) {
        require(gameInfo[_gameID].exists, "Game does not exist.");
        require(!gameInfo[_gameID].ended, "Game has ended.");
        require(!gameInfo[_gameID].ended, "Game has already started.");
        require(!gameInfo[_gameID].players[msg.sender], "Player already exists.");
        require(balances[msg.sender] >= gameInfo[_gameID].wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid.");
        require(!gameInfo[_gameID].pieceInfo[_piece].taken, "Piece has been taken.");
        _;
    }

    modifier validGame (uint _piece, uint _wager) {
        require(balances[msg.sender] >= _wager, "You don't have enough Monopoly Money.");
        require(_piece > 0 && _piece < 9, "Piece is not valid."); 
        _;
    }

    modifier onlyGameMaster (uint _gameID) {
        require(msg.sender == gameInfo[_gameID].gameMaster, "You are not the game master.");
        _;
    }

    // ------------------------------------------------------------------------
    // Return status and attributes of a piece in a specified game.
    // ------------------------------------------------------------------------
    function pieceStatus (uint _gameID, uint _pieceID) public view returns (string memory, bool, address) {
        return(gameInfo[_gameID].pieceInfo[_pieceID].nickname, 
            gameInfo[_gameID].pieceInfo[_pieceID].taken,
            gameInfo[_gameID].pieceInfo[_pieceID].owner);
    }

    // ------------------------------------------------------------------------
    // Create a new game, selects a piece and nickname and becomes Game Master.
    // - player must have enough tokens to play.
    // - player must select a valid piece.
    // ------------------------------------------------------------------------
    function newGame (uint _piece, uint _wager, string memory _nickname) public validGame (_piece, _wager) returns (uint) {
        gameID = gameID.add(1);
        gameInfo[gameID].gameMaster = msg.sender;
        gameInfo[gameID].exists = true;
        gameInfo[gameID].wager = _wager;
        gameInfo[gameID].pot = gameInfo[gameID].pot.add(_wager);
        gameInfo[gameID].pieceInfo[_piece].nickname = _nickname;
        gameInfo[gameID].pieceInfo[_piece].taken = true;
        gameInfo[gameID].pieceInfo[_piece].owner = msg.sender;
        balances[msg.sender] = balances[msg.sender].sub(_wager);
        gameInfo[gameID].players[msg.sender] = true;
        emit NewGame(gameID, _wager, _nickname, msg.sender);
        return gameID;
    }

    // ------------------------------------------------------------------------
    // Join an existing game, selects a piece and nickname.
    // - player must have enough tokens to play.
    // - player must select a valid piece.
    // - player can't join twice.
    // ------------------------------------------------------------------------
    function joinGame (uint _gameID, uint _piece, string memory _nickname) public validJoin(_gameID, _piece) returns (bool success) {
        gameInfo[_gameID].pot = gameInfo[_gameID].pot.add(gameInfo[_gameID].wager);
        gameInfo[_gameID].pieceInfo[_piece].nickname = _nickname;
        gameInfo[_gameID].pieceInfo[_piece].taken = true;
        gameInfo[_gameID].pieceInfo[_piece].owner = msg.sender;
        balances[msg.sender] = balances[msg.sender].sub(gameInfo[_gameID].wager);
        gameInfo[_gameID].players[msg.sender] = true;
        emit NewPlayer(_gameID, _piece, _nickname, msg.sender);
        return true;
    }

    // ------------------------------------------------------------------------
    // Start an existing game, onlyGameMaster
    // ------------------------------------------------------------------------
    function startGame (uint _gameID) public onlyGameMaster(_gameID) returns (bool success) {
        gameInfo[_gameID].started = true;
        emit GameStarted(_gameID, msg.sender);
        return true;
    }

    // ------------------------------------------------------------------------
    // End game and award winning piece, onlyOwner
    // ------------------------------------------------------------------------
    function endGame (uint _gameID, uint _piece, string memory _gameHistory) public onlyOwner returns (bool success) {
        gameInfo[_gameID].ended = true;
        balances[gameInfo[_gameID].pieceInfo[_piece].owner] = balances[gameInfo[_gameID].pieceInfo[_piece].owner].add(gameInfo[_gameID].pot);
        if (bonusIssued) {
            balances[gameInfo[_gameID].pieceInfo[_piece].owner] = balances[gameInfo[_gameID].pieceInfo[_piece].owner].add(bonus);
            _totalSupply = _totalSupply.add(bonus);
        }
        gameInfo[_gameID].gameHistory = _gameHistory;
        emit GameEnded(_gameID, gameInfo[_gameID].pieceInfo[_piece].owner, _gameHistory);
        return true;
    }

    // ------------------------------------------------------------------------
    // Turn Monopoly token bonus on and off, onlyOwner
    // ------------------------------------------------------------------------
    function endGame (bool _bonusIssued, uint _bonus) public onlyOwner returns (bool success) {
        bonusIssued = _bonusIssued;
        bonus = _bonus;
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

// ------------------------------------------------------------------------
// On-Chain signature verification.
// Source: https://docs.ethers.io/ethers.js/html/cookbook-signing.html?highlight=message#signing-a-string-message
// ------------------------------------------------------------------------

contract Verifier {
    // Returns the address that signed a given string message
    function verifyString(string memory message, uint8 v, bytes32 r, bytes32 s) public pure returns (address signer) {

        // The message header; we will fill in the length next
        string memory header = "\x19Ethereum Signed Message:\n000000";

        uint256 lengthOffset;
        uint256 length;
        assembly {
            // The first word of a string is its length
            length := mload(message)
            // The beginning of the base-10 message length in the prefix
            lengthOffset := add(header, 57)
        }

        // Maximum length we support
        require(length <= 999999);

        // The length of the message's length in base-10
        uint256 lengthLength = 0;

        // The divisor to get the next left-most message length digit
        uint256 divisor = 100000;

        // Move one digit of the message length to the right at a time
        while (divisor != 0) {

            // The place value at the divisor
            uint256 digit = length / divisor;
            if (digit == 0) {
                // Skip leading zeros
                if (lengthLength == 0) {
                    divisor /= 10;
                    continue;
                }
            }

            // Found a non-zero digit or non-leading zero digit
            lengthLength++;

            // Remove this digit from the message length's current value
            length -= digit * divisor;

            // Shift our base-10 divisor over
            divisor /= 10;

            // Convert the digit to its ASCII representation (man ascii)
            digit += 0x30;
            // Move to the next character and write the digit
            lengthOffset++;

            assembly {
                mstore8(lengthOffset, digit)
            }
        }

        // The null string requires exactly 1 zero (unskip 1 leading 0)
        if (lengthLength == 0) {
            lengthLength = 1 + 0x19 + 1;
        } else {
            lengthLength += 1 + 0x19;
        }

        // Truncate the tailing zeros from the header
        assembly {
            mstore(header, lengthLength)
        }

        // Perform the elliptic curve recover operation
        bytes32 check = keccak256(abi.encodePacked(header, message));

        return ecrecover(check, v, r, s);
    }
}