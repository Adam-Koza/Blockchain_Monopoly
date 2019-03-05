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
        if (injail) {
            return [false, 0, 10, dice1, dice2, false, true];
        }
        doublesCount += 1;
        // Roll into jail.
        if (doublesCount == 3) {
            return [true, 0, 10, dice1, dice2, false, true];
        }
    } else {
        // Reset doublesCount.
        doublesCount = 0;
    }
    // Stay in jail.
    if (inJail) {
        return [true, 0, 10, dice1, dice2, false, true];
    }
    // Land on Go To Jail.
    if (currentPosition == 30) {
        return [true, 0, 10, dice1, dice2, false, true];
    }
    // Did you pass Go?
    if (currentPosition < oldPosition) {
        // Yes.
        return [false, doublesCount, currentPosition, dice1, dice2, true, false];
    } else {
        // No.
        return [false, doublesCount, currentPosition, dice1, dice2, false, false];
    }
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
            if (deck[i] == randIndex) {
                found = true;
            }
        }
        if (found == false) {
            deck.push(randIndex);
        }
    }
    return deck;
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
    // Come back to this.
    if (card == 3) {
        return ['Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown.'];
    }
    // Come back to this.
    if (card == 4 || card == 5) {
        return ['Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.'];
    }
    if (card == 6) { return ['Bank pays you dividend of $50.', playerBalance += 50, currentPosition, middlePot, false, false, true, false, 1]; }
    if (card == 7) { return ['Get out of Jail Free. This card may be kept until needed, or traded/sold.', playerBalance, currentPosition, middlePot, true, false, true, false, 1]; }
    if (card == 8) {
        if ((currentPosition - 3) < 0) { currentPosition = 39 + (currentPosition - 3); } else { currentPosition -= 3; }
        return ['Go back three spaces.', playerBalance, currentPosition, middlePot, false, false, true, false, 1];
    }
    if (card == 9) { return ['Go to Jail. Go directly to Jail. Do not pass GO, do not collect $200.', playerBalance, 10, middlePot, false, true, true, false, 1]; }
    if (card == 10) { let repair = calculateRepair(player); return ['Make general repairs on all your property: For each house pay $25, For each hotel pay $100.', playerBalance -= repair, currentPosition, middlePot += repair, false, false, true, false, 1]; }
    if (card == 11) { return ['Pay poor tax of $15.', playerBalance -= 15, currentPosition, middlePot += 15, false, false, true, false, 1]; }
    if (card == 12) {
        if (5 < currentPosition) { playerBalance += 200; }
        return ['Take a trip to Reading Railroad. If you pass Go, collect $200.', playerBalance, 5, middlePot, false, false, false, false, 1];
    }
    if (card == 13) { return ['Take a walk on the Boardwalk. Advance token to Boardwalk.', playerBalance, 39, middlePot, false, false, false, false, 1]; }
    if (card == 14) { return ['You have been elected Chairman of the Board. Pay each player $50.', playerBalance -= (playerCount - 1) * 50, currentPosition, middlePot, false, false, true, true, 1]; }
    if (card == 15) { return ['Your building and loan matures. Receive $150.', playerBalance += 150, currentPosition, middlePot, false, false, true, false, 1]; }

}

// Calculate nearest Utility.
// Return Int NewPosition.
//
function nearestUtility(currentPosition) {

}

// Calculate nearest Rail Road.
// Return Int NewPosition.
//
function nearestRailRoad(currentPosition) {

}

// Calculate property repair chance card.
// Return Int RepairCost.
//
function calculateRepair(player) {
    houses = 0;
    hotels = 0;
    // for each property owned by player {
    // houses += property.houses * 25;
    // hotels += property.hotel * 100;
    // }
    return houses + hotels;
}



