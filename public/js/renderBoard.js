function renderBoard() {
    gameState = JSON.parse(document.getElementById("state").innerHTML);
    drawBuildings(gameState);
    drawPiences(gameState);
    drawButtons();
    drawHistory();
    drawPlayerStatus();
    drawGameStatus();]
}

function drawBuildings (gameState) {
    for (i=0; i < gameState.game.board.spaces,length; i++) {
        gameState.game.board.spaces[playerState.position]
    }
}