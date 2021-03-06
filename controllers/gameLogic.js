// Return [Bool NewJailStatus, Int NewDoublesCount, Int NewPosition, 
//         Int Dice1, Int Dice2, Bool PassGo, Bool IsTurnOver]
//
function roll(inJail, doublesCount, currentPosition) {
    // Roll dice.
    dice1 = Math.floor(Math.random() * 5) + 1;
    dice2 = Math.floor(Math.random() * 5) + 1;
    // Update board position.
    oldPosition = currentPosition;
    currentPosition = ((dice1 + dice2) + currentPosition) % 40;
    // Roll doubles.
    if (dice1 == dice2) {
        // Roll out of jail.
        if (injail) { return [false, 0, 10, dice1, dice2, false, true]; }
        // Roll into jail.
        doublesCount += 1;
        if (doublesCount == 3) { return [true, 0, 10, dice1, dice2, false, true]; }
    }
    // Reset doublesCount. 
    else { doublesCount = 0; }
    // Stay in jail.
    if (inJail) { return [true, 0, 10, dice1, dice2, false, true]; }
    // Land on Go To Jail.
    if (currentPosition == 30) { return [true, 0, 10, dice1, dice2, false, true]; }
    // Land on Go.
    if (currentPosition == 0) { return [true, doublesCount, 0, dice1, dice2, true, true]; }
    // Did you pass Go?
    if (currentPosition < oldPosition) { return [false, doublesCount, currentPosition, dice1, dice2, true, false]; }
    else { return [false, doublesCount, currentPosition, dice1, dice2, false, false]; }
}

// Shuffle Community Chest and Chance Decks.
// Return Int[16] CardIndexs
//
function shuffleDeck() {
    deck = [];
    while (deck.length < 16) {
        found = false;
        randIndex = Math.floor(Math.random() * 16);
        for (i = 0; i < deck.length; i++) {
            if (deck[i] == randIndex) { found = true; }
        }
        if (found == false) { deck.push(randIndex); }
    }
    return deck;
}

// Calculate nearest Utility.
// Return [Int NewPosition, playerBalance.
//
function nearestUtility(currentPosition, playerBalance) {
    if (currentPosition > 28) { return [12, playerBalance += 200]; }
    if (currentPosition < 12) { return [12, playerBalance]; }
    if (currentPosition > 12) { return [28, playerBalance]; }
    if (currentPosition < 28) { return [28, playerBalance]; }
}

// Calculate nearest Rail Road.
// Return Int NewPosition.
//
function nearestRailRoad(currentPosition, playerBalance) {
    if (currentPosition > 35) { return [5, playerBalance += 200]; }
    if (currentPosition < 15) { return [15, playerBalance]; }
    if (currentPosition < 25) { return [25, playerBalance]; }
    if (currentPosition < 35) { return [35, playerBalance]; }
}

// Calculate property repair chance card.
// Return Int RepairCost.
//
function calculateRepair(playerState, houseCost, hotelCost) {
    houses = 0;
    hotels = 0;
    for (i = 0; i < playerState.owns.length; i++) {
        houses += gameState.game.board.spaces[playerState.owns[i]].houses;
        if (gameState.game.board.spaces[playerState.owns[i]].hotel) {
            hotels += 1;
        }
    }
    return ((houses * houseCost) + (hotels * hotelCost));
}

// Pull from Chance deck.
// Return [String Event, Int NewPlayerBalance, Int NewPosition, Int NewMiddlePot, 
//          Bool JailFree, Bool InJail, Bool TurnOver, Bool PayPlayers, Int RentMultiplier]
//
function pullChance(deck, drawCount, player, playerBalance, currentPosition, middlePot, playerCount) {
    index = drawCount % 16;
    card = deck[index];
    if (card == 0) { return ['Advance to "Go", collect $200', playerBalance + 200, 0, middlePot, false, false, true, false, 1]; }
    if (card == 1) {
        if (24 < currentPosition) { playerBalance += 200; }
        return ['Advance to Illinois Avenue. If you pass Go, collect $200.', playerBalance, 24, middlePot, false, false, false, false, 1];
    }
    if (card == 2) {
        if (11 < currentPosition) { playerBalance += 200; }
        return ['Advance to St. Charles Place. If you pass Go, collect $200.', playerBalance, 11, middlePot, false, false, false, false, 1];
    }
    if (card == 3) {
        let newState = nearestUtility(currentPosition, playerBalance);
        return ['Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown.', newState[1], newState[0], middlePot, false, false, false, false, 10];
    }
    if (card == 4 || card == 5) {
        let newState = nearestRailRoad(currentPosition, playerBalance);
        return ['Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.', newState[1], newState[0], middlePot, false, false, false, false, 2];
    }
    if (card == 6) { return ['Bank pays you dividend of $50.', playerBalance + 50, currentPosition, middlePot, false, false, true, false, 1]; }
    if (card == 7) { return ['Get out of Jail Free. This card may be kept until needed, or traded/sold.', playerBalance, currentPosition, middlePot, true, false, true, false, 1]; }
    if (card == 8) {
        if ((currentPosition - 3) < 0) { currentPosition = 39 + (currentPosition - 3); } else { currentPosition -= 3; }
        return ['Go back three spaces.', playerBalance, currentPosition, middlePot, false, false, true, false, 1];
    }
    if (card == 9) { return ['Go to Jail. Go directly to Jail. Do not pass GO, do not collect $200.', playerBalance, 10, middlePot, false, true, true, false, 1]; }
    if (card == 10) { let repair = calculateRepair(player, 25, 100); return ['Make general repairs on all your property: For each house pay $25, For each hotel pay $100.', playerBalance - repair, currentPosition, middlePot + repair, false, false, true, false, 1]; }
    if (card == 11) { return ['Pay poor tax of $15.', playerBalance - 15, currentPosition, middlePot + 15, false, false, true, false, 1]; }
    if (card == 12) {
        if (5 < currentPosition) { playerBalance += 200; }
        return ['Take a trip to Reading Railroad. If you pass Go, collect $200.', playerBalance, 5, middlePot, false, false, false, false, 1];
    }
    if (card == 13) { return ['Take a walk on the Boardwalk. Advance token to Boardwalk.', playerBalance, 39, middlePot, false, false, false, false, 1]; }
    if (card == 14) { return ['You have been elected Chairman of the Board. Pay each player $50.', playerBalance - (playerCount * 50), currentPosition, middlePot, false, false, true, true, 1]; }
    if (card == 15) { return ['Your building and loan matures. Receive $150.', playerBalance + 150, currentPosition, middlePot, false, false, true, false, 1]; }
}

// Pull from Community Chest deck.
// Return [String Event, Int NewPlayerBalance, Int NewPosition, Int NewMiddlePot, 
//          Bool JailFree, Bool InJail, Bool PlayersPay, Int PlayersPayAmount]
//
function pullCommunityChest(deck, drawCount, player, playerBalance, currentPosition, middlePot, playerCount) {
    index = drawCount % 16;
    card = deck[index];
    if (card == 0) { return ['Advance to "Go", collect $200', playerBalance + 200, 0, middlePot, false, false, false, 1]; }
    if (card == 1) { return ['Bank error in your favor. Collect $200.', playerBalance + 200, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 2) { return ["Doctor's fees. Pay $50.", playerBalance - 50, currentPosition, middlePot + 50, false, false, false, 1]; }
    if (card == 3) { return ['From sale of stock you get $50.', playerBalance + 50, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 4) { return ['Get Out of Jail Free. This card may be kept until needed or sold/traded.', playerBalance, currentPosition, middlePot, true, false, false, 1]; }
    if (card == 5) { return ['Go to Jail. Go directly to jail. Do not pass Go, Do not collect $200.', playerBalance, 10, middlePot, false, true, false, 1]; }
    if (card == 6) { return ['Grand Opera Night. Collect $50 from every player for opening night seats.', playerBalance + (playerCount - 1) * 50, currentPosition, middlePot, false, false, true, 50]; }
    if (card == 7) { return ['Holiday Fund matures. Receive $100.', playerBalance + 100, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 8) { return ['Income tax refund. Collect $20.', playerBalance + 20, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 9) { return ["It is your birthday. Collect $10 from every player.", playerBalance + (playerCount) * 10, currentPosition, 0, middlePot, false, false, true, 10]; }
    if (card == 10) { return ['Life insurance matures. Collect $100.', playerBalance + 100, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 11) { return ['Hospital Fees. Pay $50.', playerBalance - 50, currentPosition, middlePot + 50, false, false, false, 1]; }
    if (card == 12) { return ['School fees. Pay $50.', playerBalance - 50, currentPosition, middlePot + 50, false, false, false, 1]; }
    if (card == 13) { let repair = calculateRepair(player, 40, 115); return ['You are assessed for street repairs: Pay $40 per house and $115 per hotel you own.', playerBalance - repair, currentPosition, middlePot + repair, false, false, false, 1]; }
    if (card == 14) { return ['You have won second prize in a beauty contest. Collect $10.', playerBalance + 10, currentPosition, middlePot, false, false, false, 1]; }
    if (card == 15) { return ['You inherit $100.', playerBalance + 100, currentPosition, middlePot, false, false, false, 1]; }
}


// Roll and move token, take game action.
// Return [Object NewGameState, Object NewPlayerState]
//
function moveToken(gameState) {
    rentMultiplier = 1;

    // Extract player State and roll.
    playerState = gameState.playerStates[gameState.turn];
    let roll = roll(playerState.inJail, playerState.doublesRolled, playerState.position);
    // Return [Bool NewJailStatus, Int NewDoublesCount, Int NewPosition, 
    //         Int Dice1, Int Dice2, Bool PassGo, Bool IsTurnOver]
    playerState.inJail = roll[0];
    playerState.doublesRolled = roll[1];
    playerState.position = roll[2];
    gameState.dice1 = roll[3];
    gameState.dice2 = roll[4];
    // Pass Go?
    if (roll[5]) {
        playerState.balance += 200;
    }
    // Turn over?
    if (roll[6]) {
        return UpdateState(gameState, playerState);
    }

    // Land on Jail (Just Visiting)
    if (gameState.game.board.spaces[playerState.position].type == 6) {
        return UpdateState(gameState, playerState);
    }

    // Land on Free Parking
    if (gameState.game.board.spaces[playerState.position].type == 8) {
        playerState.balance += gameState.middlePot;
        gameState.middlePot = 500;
        return UpdateState(gameState, playerState);
    }

    // Land on Chance Space 
    if (gameState.game.board.spaces[playerState.position].type == 5) {
        // Skip Chance Jail Free card if held.
        if (gameState.chanceJailFreeHeld && gameState.chanceDeck[gameState.chanceDrawCount % 16] == 7) {
            gameState.chanceDrawCount += 1;
        }
        let chance = pullChance(gameState.chanceDeck, gameState.chanceDrawCount, player, playerState.balance, playerState.position, gameState.middlePot, gameState.numPlayers)
        // Pull from Chance deck.
        // Return [String Event, Int NewPlayerBalance, Int NewPosition, Int NewMiddlePot, 
        //          Bool JailFree, Bool InJail, Bool TurnOver, Bool PayPlayers, Int RentMultiplier]
        //
        gameState.chanceDrawCount += 1;
        // Print card pulled.
        console.log(chance[0]);
        playerState.balance = chance[1];
        playerState.position = chance[2];
        gameState.middlePot = chance[3];
        // Get Jail Free card.
        if (chance[4]) {
            playerState.getOutOfJailFree += 1;
            gameState.chanceJailFreeHeld = true;
        }
        playerState.inJail = chance[5];
        // Pay pach player $50.
        if (chance[7]) {
            for (i = 0; i < gameState.playerStates.length; i++) {
                gameState.playerStates[i].balance += 50;
            }
        }
        rentMultiplier = chance[8];
        // Turn over?
        if (chance[6]) {
            return UpdateState(gameState, playerState);
        }
    }

    // Land on Community Chest Space 
    if (gameState.game.board.spaces[playerState.position].type == 2) {
        // Pull from Community Chest deck.
        // Return [String Event, Int NewPlayerBalance, Int NewPosition, Int NewMiddlePot, 
        //          Bool JailFree, Bool InJail, Bool PlayersPay, Int PlayersPayAmount]
        //
        // Skip Community Chest Jail Free card if held.
        if (gameState.communityChestJailFreeHeld && gameState.communityChestDeck[gameState.communityChestDrawCount % 16] == 7) {
            gameState.communityChestDrawCount += 1;
        }
        let communityChest = pullCommunityChest(gameState.communityChestDeck, gameState.communityChestDrawCount, player, playerState.balance, playerState.position, gameState.middlePot, gameState.numPlayers)
        gameState.chanceDrawCount += 1;
        // Print card pulled.
        console.log(communityChest[0]);
        playerState.balance = communityChest[1];
        playerState.position = communityChest[2];
        gameState.middlePot = communityChest[3];
        // Get Jail Free card.
        if (communityChest[4]) {
            playerState.getOutOfJailFree += 1;
            gameState.communityChestJailFreeHeld = true;
        }
        playerState.inJail = communityChest[5];
        // Collect $x from each player.
        if (communityChest[6]) {
            for (i = 0; i < gameState.playerStates.length; i++) {
                gameState.playerStates[i].balance -= communityChest[7];
            }
            playerState.balance += communityChest[7]
        }
        // Turn over?
        if (chance[6]) {
            return UpdateState(gameState, playerState);
        }
    }

    // Land on Utillity 
    if (gameState.game.board.spaces[playerState.position].type == 7) {
        // If not owned, purchase Utility.
        if (!gameState.game.board.spaces[playerState.position].owned) {
            playerState.balance -= gameState.game.board.spaces[playerState.position].cost;
            gameState.game.board.spaces[playerState.position].owner = gameState.turn;
            playerState.owns.push(gameState.game.board.spaces[playerState.position]);
            return UpdateState(gameState, playerState);
        }
        // Fulfill Chance card obligation. 
        if (rentMultiplier == 10) {
            if (!gameState.game.board.spaces[playerState.position].owner == gameState.turn) {
                // Roll dice.
                dice1 = Math.floor(Math.random() * 5) + 1;
                dice2 = Math.floor(Math.random() * 5) + 1;
                gameState.game.board.spaces[playerState.position].owner += (dice1 + dice2) * 10;
                playerState.balance -= (dice1 + dice2) * 10;
            }
            return UpdateState(gameState, playerState);
        }
        // Pay rent.
        if (!gameState.game.board.spaces[playerState.position].owner == gameState.turn) {
            // Owner has both Utilities.
            if ((gameState.game.board.spaces[28].owned)
                && (gameState.game.board.spaces[12].owner == gameState.game.board.spaces[28].owner)) {
                gameState.game.board.spaces[playerState.position].owner += (gameState.dice1 + gameState.dice2) * 10;
                playerState.balance -= (gameState.dice1 + gameState.dice2) * 10;

            } else {
                gameState.game.board.spaces[playerState.position].owner += (gameState.dice1 + gameState.dice2) * 4;
                playerState.balance -= (gameState.dice1 + gameState.dice2) * 4;
            }
        }
        return UpdateState(gameState, playerState);
    }

    // Land on Railroad
    if (gameState.game.board.spaces[playerState.position].type == 4) {
        // If not owned, purchase Railroad.
        if (!gameState.game.board.spaces[playerState.position].owned) {
            playerState.balance -= gameState.game.board.spaces[playerState.position].cost;
            gameState.game.board.spaces[playerState.position].owner = gameState.turn;
            playerState.owns.push(gameState.game.board.spaces[playerState.position]);
            return UpdateState(gameState, playerState);
        }
        // Pay rent.
        if (!gameState.game.board.spaces[playerState.position].owner == gameState.turn) {
            setOwned = 0;
            // Calculate how many Railroads are owned.
            for (i = 0; i < gameState.game.board.spaces[playerState.position].set.length; i++) {
                if (gameState.game.board.spaces[playerState.position].set[i].owned && (gameState.game.board.spaces[playerState.position].owner == gameState.game.board.spaces[playerState.position].set[i].owner)) {
                    setOwned += 1;
                }
            }
            // Pay owner.
            if (setOwned == 1) {
                gameState.game.board.spaces[playerState.position].owner += 25 * rentMultiplier;
                playerState.balance -= 25 * rentMultiplier;
            }
            if (setOwned == 2) {
                gameState.game.board.spaces[playerState.position].owner += 50 * rentMultiplier;
                playerState.balance -= 50 * rentMultiplier;
            }
            if (setOwned == 3) {
                gameState.game.board.spaces[playerState.position].owner += 100 * rentMultiplier;
                playerState.balance -= 100 * rentMultiplier;
            }
            if (setOwned == 4) {
                gameState.game.board.spaces[playerState.position].owner += 200 * rentMultiplier;
                playerState.balance -= 200 * rentMultiplier;
            }

        }
        return UpdateState(gameState, playerState);
    }

    // Land on Property
    if (gameState.game.board.spaces[playerState.position].type == 4) {
        // If not owned, purchase property.
        if (!gameState.game.board.spaces[playerState.position].owned) {
            playerState.balance -= gameState.game.board.spaces[playerState.position].cost;
            gameState.game.board.spaces[playerState.position].owner = gameState.turn;
            playerState.owns.push(gameState.game.board.spaces[playerState.position]);
            return UpdateState(gameState, playerState);
        }
        // Pay rent.
        if (!gameState.game.board.spaces[playerState.position].owner == gameState.turn) {
            setOwned = 0;
            // Calculate how many properties in the color set are owned.
            for (i = 0; i < gameState.game.board.spaces[playerState.position].set.length; i++) {
                if (gameState.game.board.spaces[playerState.position].set[i].owned && (gameState.game.board.spaces[playerState.position].owner == gameState.game.board.spaces[playerState.position].set[i].owner)) {
                    setOwned += 1;
                }
            }
            // Pay owner.
            // Not full set.
            if (!setOwned == gameState.game.board.spaces[playerState.position].set.length){
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].rent;
                playerState.balance -= gameState.game.board.spaces[playerState.position].rent;
                return UpdateState(gameState, playerState);
            }
            // Full Set.
            // With hotel.
            if (gameState.game.board.spaces[playerState.position].hotel) {
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].hotel_rent;
                playerState.balance -= gameState.game.board.spaces[playerState.position].hotel_rent;
                return UpdateState(gameState, playerState);
            }
            // With 1 house.
            if (gameState.game.board.spaces[playerState.position].houses == 1) {
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].one_house;
                playerState.balance -= gameState.game.board.spaces[playerState.position].one_house;
                return UpdateState(gameState, playerState);
            }
            // With 2 houses.
            if (gameState.game.board.spaces[playerState.position].houses == 2) {
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].two_house;
                playerState.balance -= gameState.game.board.spaces[playerState.position].two_house;
                return UpdateState(gameState, playerState);
            }
            // With 3 houses.
            if (gameState.game.board.spaces[playerState.position].houses == 3) {
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].three_house;
                playerState.balance -= gameState.game.board.spaces[playerState.position].three_house;
                return UpdateState(gameState, playerState);
            }
            // With 4 houses.
            if (gameState.game.board.spaces[playerState.position].houses == 3) {
                gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].four_house;
                playerState.balance -= gameState.game.board.spaces[playerState.position].four_house;
                return UpdateState(gameState, playerState);
            }
            // No buildings.
            gameState.game.board.spaces[playerState.position].owner += gameState.game.board.spaces[playerState.position].rent * 2;
            playerState.balance -= gameState.game.board.spaces[playerState.position].rent * 2;
            return UpdateState(gameState, playerState);

        }
        return UpdateState(gameState, playerState);
    }
}

// Player Get Out of Jail Free card.
// Return [Object NewGameState, Object NewPlayerState]
//
function playGetOfJailFree(gameState) {

    // Extract player State.
    playerState = gameState.playerStates[gameState.turn];
    // Make sure player is in Jail and a card is held.
    if (playerState.inJail && (playerState.getOutOfJailFree > 0)) {
        // Update States.
        playerState.doublesRolled = 0;
        playerState.inJail == false;
        playerState.getOutOfJailFree -= 1;
        // Put card back in the deck.
        if (gameState.communityChestJailFreeHeld && gameState.chanceJailFreeHeld){
            if ((Math.floor(Math.random() * 1) ) == 0) {
                gameState.communityChestJailFreeHeld == false;
            } else {
                gameState.chanceJailFreeHeld == false;
            }
        }
        if (gameState.communityChestJailFreeHeld) {
            gameState.communityChestJailFreeHeld == false;
        } else {
            gameState.chanceJailFreeHeld == false;
        }
    }
    return UpdateState(gameState, playerState);
}

function UpdateState(gameState, playerState) {
    //Mongo get oldState
    oldState = {};
    // Push old state to history.
    gameState.stateHistory.push(oldState);
    // Set new player state.
    gameState.playerStates[gameState.turn] = playerState;
    // Determine if players turn is over (doubles).
    if (!playerState.doublesRolled > 0) {
        gameState.turn = (gameState.turn + 1) & gameState.playerStates.length;
    }
    // Generate history hash.
    var hash = require('object-hash');
    gameState.historyHash = hash(gameState.stateHistory);
    // Mongo push new gameState.
    // ...

    return playerState.player.username + " Whatever game action occured.";
}

