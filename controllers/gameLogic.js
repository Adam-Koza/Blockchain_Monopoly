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

    // Roll Doubles.
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
    // Stay in Jail.
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