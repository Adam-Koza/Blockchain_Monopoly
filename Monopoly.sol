pragma solidity 0.4.25;

contract Monopoly {
    
    address public owner;
    uint public gameID;
    
    struct Game {
        address game_master;
        uint turn;
        uint middle_pot;
        uint players;
        bool started;
        bool ended;
        mapping(address => Player) playerInfo;
        mapping(uint => Piece) pieceInfo;
        mapping(uint => Ownership) ownershipInfo;
        mapping(uint => bool) stillSolvent;
    }
    
    struct Ownership {
        bool owned;
        address owner;
        bool mortgaged;
        uint buildings;
    }

    struct Player {
        string name;
        uint num;
        uint piece;
        uint current_postion;
        uint doubles_rolled;
        uint cash;
        uint asset_value;
        uint total_value;
        uint get_out_of_jail_free;
        bool in_jail;
        bool solvent;
        
    }

    struct Piece {
        string name;
        bool taken;
        address owner;
    }
    
    struct Property {
        string name;
        string color;
        uint cost;
        uint rent;
        uint oneHouse_rent;
        uint twoHouse_rent;
        uint threeHouse_rent;
        uint fourHouse_rent;
        uint hotel_rent;
        uint mortgage_value;
        uint building_cost;
        uint8[2] set;
    }
    
    struct Utility {
        string name;
        uint cost;
        uint8[2] rent;
        uint mortgage_value;
        uint set;
    }
    
    struct Railroad {
        string name;
        uint cost;
        uint mortgage_value;
        uint8[3] set;
    }
    
    struct CommunityChest {
        string card_text;
        uint position_move;
        uint cost;
        uint gain;
    }
    
    struct Chance {
        string card_text;
        uint position_move;
        uint cost;
        uint gain;
    }
    
    struct Tax {
        string name;
        uint cost;
    }
    
    mapping(uint => Game) gameInfo;
    mapping(uint => Property) propertyInfo;
    mapping(uint => Utility) utilityInfo;
    mapping(uint => Railroad) railroadInfo;
    mapping(uint => CommunityChest) ccInfo;
    mapping(uint => Chance) chanceInfo;
    mapping(uint => Tax) taxInfo;
    mapping(uint => string) board;
    
    
    constructor() public {
        
        owner = msg.sender;
        gameID = 0;
        
        
        // Build Board.
        
        board[0] = "Go";
        board[1] = "Property";
        propertyInfo[1] = Property({name: "Mediterranean Avenue",
            color: "Purple", cost: 60, rent: 2, oneHouse_rent: 10,
            twoHouse_rent: 30, threeHouse_rent: 90, fourHouse_rent: 160,
            hotel_rent: 250, mortgage_value: 30, building_cost: 50, 
            set: [3, 0]
        });
        board[2] = "Community Chest";
        board[3] = "Property";
        propertyInfo[3] = Property({name: "Baltic Avenue",
            color: "Purple", cost: 60, rent: 4, oneHouse_rent: 20,
            twoHouse_rent: 60, threeHouse_rent: 180, fourHouse_rent: 320,
            hotel_rent: 450, mortgage_value: 30, building_cost: 50,
            set: [1, 0]
        });
        board[4] = "Tax";
        taxInfo[4] = Tax({name: "Income Tax",
            cost: 200
        });
        board[5] = "Railroad";
        railroadInfo[5] = Railroad({name: "Reading Railroad",
            cost: 200, mortgage_value: 100, set: [15, 25, 35]
        });
        board[6] = "Property";
        propertyInfo[6] = Property({name: "Oriental Avenue",
            color: "Light Blue", cost: 100, rent: 6, oneHouse_rent: 30,
            twoHouse_rent: 90, threeHouse_rent: 270, fourHouse_rent: 400,
            hotel_rent: 550, mortgage_value: 50, building_cost: 50,
            set: [8, 9]
        });
        board[7] = "Chance";
        board[8] = "Property";
        propertyInfo[8] = Property({name: "Vermont Avenue",
            color: "Light Blue", cost: 100, rent: 6, oneHouse_rent: 30,
            twoHouse_rent: 90, threeHouse_rent: 270, fourHouse_rent: 400,
            hotel_rent: 550, mortgage_value: 50, building_cost: 50,
            set: [6, 9]
        });
        board[9] = "Property";
        propertyInfo[9] = Property({name: "Connecticut Avenue",
            color: "Light Blue", cost: 120, rent: 8, oneHouse_rent: 40,
            twoHouse_rent: 100, threeHouse_rent: 300, fourHouse_rent: 450,
            hotel_rent: 600, mortgage_value: 60, building_cost: 50,
            set: [6, 8]
        });
        board[10] = "Jail";
        board[11] = "Property";
        propertyInfo[11] = Property({name: "St. Charles Place",
            color: "Pink", cost: 140, rent: 10, oneHouse_rent: 50,
            twoHouse_rent: 150, threeHouse_rent: 450, fourHouse_rent: 625,
            hotel_rent: 750, mortgage_value: 70, building_cost: 100,
            set: [13, 14]
        });
        board[12] = "Utility";
        utilityInfo[12] = Utility({name: "Electric Company",
            cost: 150, rent: [4, 10], mortgage_value: 75, set: 28
        });
        board[13] = "Property";
        propertyInfo[13] = Property({name: "States Avenue",
            color: "Pink", cost: 140, rent: 10, oneHouse_rent: 50,
            twoHouse_rent: 150, threeHouse_rent: 450, fourHouse_rent: 625,
            hotel_rent: 750, mortgage_value: 70, building_cost: 100,
            set: [11, 14]
        });
        board[14] = "Property";
        propertyInfo[14] = Property({name: "Virginia Avenue",
            color: "Pink", cost: 160, rent: 12, oneHouse_rent: 60,
            twoHouse_rent: 180, threeHouse_rent: 500, fourHouse_rent: 700,
            hotel_rent: 900, mortgage_value: 80, building_cost: 100,
            set: [11, 13]
        });
        board[15] = "Railroad";
        railroadInfo[15] = Railroad({name: "Pennsylvania Railroad",
            cost: 200, mortgage_value: 100, set: [5, 25, 35]
        });
        board[16] = "Property";
        propertyInfo[16] = Property({name: "St. James Place",
            color: "Orange", cost: 180, rent: 14, oneHouse_rent: 70,
            twoHouse_rent: 200, threeHouse_rent: 550, fourHouse_rent: 750,
            hotel_rent: 950, mortgage_value: 90, building_cost: 100,
            set: [18, 19]
        });
        board[17] = "Community Chest";
        board[18] = "Property";
        propertyInfo[18] = Property({name: "Tennessee Avenue",
            color: "Orange", cost: 180, rent: 14, oneHouse_rent: 70,
            twoHouse_rent: 200, threeHouse_rent: 550, fourHouse_rent: 750,
            hotel_rent: 950, mortgage_value: 90, building_cost: 100,
            set: [16, 19]
        });
        board[19] = "Property";
        propertyInfo[19] = Property({name: "New York Avenue",
            color: "Orange", cost: 200, rent: 16, oneHouse_rent: 80,
            twoHouse_rent: 220, threeHouse_rent: 600, fourHouse_rent: 800,
            hotel_rent: 1000, mortgage_value: 100, building_cost: 100,
            set: [16, 18]
        });
        board[20] = "Free Parking";
        board[21] = "Property";
        propertyInfo[21] = Property({name: "Kentucky Avenue",
            color: "Red", cost: 220, rent: 18, oneHouse_rent: 90,
            twoHouse_rent: 250, threeHouse_rent: 700, fourHouse_rent: 875,
            hotel_rent: 1050, mortgage_value: 110, building_cost: 150,
            set: [23, 24]
        });
        board[22] = "Chance";
        board[23] = "Property";
        propertyInfo[23] = Property({name: "Indiana Avenue",
            color: "Red", cost: 220, rent: 18, oneHouse_rent: 90,
            twoHouse_rent: 250, threeHouse_rent: 700, fourHouse_rent: 875,
            hotel_rent: 1050, mortgage_value: 110, building_cost: 150,
            set: [21, 24]
        });
        board[24] = "Property";
        propertyInfo[24] = Property({name: "Illinois Avenue",
            color: "Red", cost: 240, rent: 20, oneHouse_rent: 100,
            twoHouse_rent: 300, threeHouse_rent: 750, fourHouse_rent: 925,
            hotel_rent: 1100, mortgage_value: 120, building_cost: 150,
            set: [21, 23]
        });
        board[25] = "Railroad";
        railroadInfo[25] = Railroad({name: "B. & O. Railroad",
            cost: 200, mortgage_value: 100, set: [15, 5, 35]
        });
        board[26] = "Property";
        propertyInfo[26] = Property({name: "Atlantic Avenue",
            color: "Yellow", cost: 260, rent: 22, oneHouse_rent: 110,
            twoHouse_rent: 330, threeHouse_rent: 800, fourHouse_rent: 975,
            hotel_rent: 1150, mortgage_value: 130, building_cost: 150,
            set: [27, 29]
        });
        board[27] = "Property";
        propertyInfo[27] = Property({name: "Ventnor Avenue",
            color: "Yellow", cost: 260, rent: 22, oneHouse_rent: 110,
            twoHouse_rent: 330, threeHouse_rent: 800, fourHouse_rent: 975,
            hotel_rent: 1150, mortgage_value: 130, building_cost: 150,
            set: [26, 29]
        });
        board[28] = "Utility";
        utilityInfo[28] = Utility({name: "Water Works",
            cost: 150, rent: [4, 10], mortgage_value: 75, set: 12
        });
        board[29] = "Property";
        propertyInfo[29] = Property({name: "Marvin Gardens",
            color: "Yellow", cost: 280, rent: 24, oneHouse_rent: 120,
            twoHouse_rent: 360, threeHouse_rent: 850, fourHouse_rent: 1025,
            hotel_rent: 1200, mortgage_value: 140, building_cost: 150,
            set: [26, 27]
        });
        board[30] = "Go To Jail";
        board[31] = "Property";
        propertyInfo[31] = Property({name: "Pacific Avenue",
            color: "Green", cost: 300, rent: 26, oneHouse_rent: 130,
            twoHouse_rent: 390, threeHouse_rent: 900, fourHouse_rent: 1100,
            hotel_rent: 1275, mortgage_value: 150, building_cost: 200,
            set: [32, 34]
        });
        board[32] = "Property";
        propertyInfo[32] = Property({name: "North Carolina Avenue",
            color: "Green", cost: 300, rent: 26, oneHouse_rent: 130,
            twoHouse_rent: 390, threeHouse_rent: 900, fourHouse_rent: 1100,
            hotel_rent: 1275, mortgage_value: 150, building_cost: 200,
            set: [31, 34]
        });
        board[33] = "Community Chest";
        board[34] = "Property";
        propertyInfo[34] = Property({name: "Pennsylvania Avenue",
            color: "Green", cost: 320, rent: 28, oneHouse_rent: 150,
            twoHouse_rent: 450, threeHouse_rent: 1000, fourHouse_rent: 1200,
            hotel_rent: 1400, mortgage_value: 160, building_cost: 200,
            set: [31, 32]
        });
        board[35] = "Railroad";
        railroadInfo[35] = Railroad({name: "Short Line",
            cost: 200, mortgage_value: 100, set: [15, 25, 5]
        });
        board[36] = "Chance";
        board[37] = "Property";
        propertyInfo[37] = Property({name: "Park Place",
            color: "Blue", cost: 350, rent: 35, oneHouse_rent: 175,
            twoHouse_rent: 500, threeHouse_rent: 1100, fourHouse_rent: 1300,
            hotel_rent: 1500, mortgage_value: 175, building_cost: 200,
            set: [39, 0]
        });
        board[38] = "Tax";
        taxInfo[4] = Tax({name: "Luxury Tax",
            cost: 75
        });
        board[39] = "Property";
        propertyInfo[39] = Property({name: "Boardwalk",
            color: "Blue", cost: 400, rent: 50, oneHouse_rent: 200,
            twoHouse_rent: 600, threeHouse_rent: 1400, fourHouse_rent: 1700,
            hotel_rent: 2000, mortgage_value: 200, building_cost: 200,
            set: [37, 0]
        });
        
        
        
    }
    
    
    function createGame (uint _gameID) public {
        gameInfo[_gameID].game_master = msg.sender;
        gameInfo[_gameID].turn = 0;
        gameInfo[_gameID].middle_pot = 200;
        gameInfo[_gameID].players = 0;
        gameInfo[_gameID].started = false;
        gameInfo[_gameID].ended = false;
        
        // Initilize Pieces
        gameInfo[_gameID].pieceInfo[1] = Piece({name: "Top Hat", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[2] = Piece({name: "Race Car", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[3] = Piece({name: "Thimble", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[4] = Piece({name: "Wheelbarrow", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[5] = Piece({name: "Boot", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[6] = Piece({name: "Battleship", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[7] = Piece({name: "Iron", 
            taken: false, owner: 0x0
        });
        gameInfo[_gameID].pieceInfo[8] = Piece({name: "Horse & Rider", 
            taken: false, owner: 0x0
        });

        // Initilize Ownership
        gameInfo[_gameID].ownershipInfo[1] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[3] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[5] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[6] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[8] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[9] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[11] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[12] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[13] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[14] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[15] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[16] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[18] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[19] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[21] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[23] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[24] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[25] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[26] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[27] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[28] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[29] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[31] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[32] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[34] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[35] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[37] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        gameInfo[_gameID].ownershipInfo[39] = Ownership({owned: false,
            owner: 0x0, mortgaged: false, buildings: 0x0
        });
        
        
        
        
    }
    
    function newGame () public {
        gameID += 1;
        createGame(gameID);
    }
    
    
    function addPlayer (uint _gameID, uint _piece, string _name) public {
        require(gameInfo[_gameID].started == false);
        require(gameInfo[_gameID].players < 8);
        require(_piece > 0 && _piece < 9);
        require(gameInfo[_gameID].pieceInfo[_piece].taken == false);
        gameInfo[_gameID].pieceInfo[_piece].owner = msg.sender;
        gameInfo[_gameID].pieceInfo[_piece].taken = true;
        gameInfo[_gameID].players += 1;
        gameInfo[_gameID].playerInfo[msg.sender] = Player({
            name: _name, num: gameInfo[_gameID].players, piece: _piece, 
            current_postion: 0, doubles_rolled: 0, cash: 1500, asset_value: 0, 
            total_value: 1500, get_out_of_jail_free: 0, in_jail: false,
            solvent: true
        });
        gameInfo[_gameID].stillSolvent[gameInfo[_gameID].players] = true;
    }
    
    function nextTurn (uint _gameID, uint _turn) public view returns (uint) {
        for(uint i = _turn + 1; i < gameInfo[_gameID].players + 1; i++){
                if (gameInfo[_gameID].stillSolvent[i]) {
                    return i;
                }
        }
        for(uint k = 1; k < gameInfo[_gameID].players; k++){
                if (gameInfo[_gameID].stillSolvent[k]) {
                    return k;
                }
        }
        return 99;
    }
    
    
    
    
    
    
    
    
}
