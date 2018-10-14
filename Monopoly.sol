pragma solidity 0.4.25;

contract Monopoly {
    
    address public owner;
    uint public turn;
    uint public middle_pot;
    uint public players;
    bool public started;
    bool public ended;

    struct Player {
        uint num;
        string name;
        address player_address;
        string piece;
        uint current_postion;
        uint doubles_rolled;
        uint cash;
        uint asset_value;
        uint total_value;
        bool in_jail;
    }
    
    struct Piece {
        bool taken;
        address owner;
    }
    
    struct Property {
        string name;
        string color;
        bool owned;
        uint owner;
        bool morgaged;
        uint cost;
        uint rent;
        uint houses;
        uint hotel;
        uint house_cost;
        uint hotel_cost;
        uint oneHouse_rent;
        uint twoHouse_rent;
        uint threeHouse_rent;
        uint fourHouse_rent;
        uint hotel_rent;
        uint mortgage_value;
    }
    
    struct Utility {
        string name;
        bool owned;
        uint owner;
        bool morgaged;
        uint cost;
        uint rent;
        uint mortgage_value;
    }
    
    struct Railroad {
        string name;
        bool owned;
        uint owner;
        bool morgaged;
        uint cost;
        uint rent;
        uint mortgage_value;
    }
    
    struct CommunityChest {
        string card_text;
        bool owned;
        uint owner;
        uint position_move;
        uint cost;
        uint gain;
    }
    
    struct Chance {
        string card_text;
        bool owned;
        uint owner;
        uint position_move;
        uint cost;
        uint gain;
    }
    
    struct Tax {
        uint cost;
        uint optional_cost;
    }
    
    mapping(uint => Player) playerInfo;
    mapping(string => Piece) pieceInfo;
    mapping(uint => Property) propertyInfo;
    mapping(uint => Utility) utilityInfo;
    mapping(uint => Railroad) railroadInfo;
    mapping(uint => CommunityChest) ccInfo;
    mapping(uint => Chance) chanceInfo;
    mapping(uint => Tax) taxInfo;
    mapping(uint => string) board;
    
    
    constructor() public {
        
        // Build Board.
        board[0] = "Go";
        board[1] = "Property"; // propertyInfo[1] = Property({name: "lol"});
        board[2] = "Community Chest";
        board[3] = "Property";
        board[4] = "Tax";
        board[5] = "Railroad";
        board[6] = "Property";
        board[7] = "Chance";
        board[8] = "Property";
        board[9] = "Property";
        board[10] = "Jail";
        board[11] = "Property";
        board[12] = "Utility";
        board[13] = "Property";
        board[14] = "Property";
        board[15] = "Railroad";
        board[16] = "Property";
        board[17] = "Community Chest";
        board[18] = "Property";
        board[19] = "Property";
        board[20] = "Free Parking";
        board[21] = "Property";
        board[22] = "Chance";
        board[23] = "Property";
        board[24] = "Property";
        board[25] = "Railroad";
        board[26] = "Property";
        board[27] = "Property";
        board[28] = "Utility";
        board[29] = "Property";
        board[30] = "Go To Jail";
        board[31] = "Property";
        board[32] = "Property";
        board[33] = "Community Chest";
        board[34] = "Property";
        board[35] = "Railroad";
        board[36] = "Chance";
        board[37] = "Property";
        board[38] = "Tax";
        board[39] = "Property";
        
    }
    
    
    
    
    
    
    
}
