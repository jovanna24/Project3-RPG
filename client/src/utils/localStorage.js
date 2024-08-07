export const getSavedGameState = () => {
    const savedGameState = localStorage.getItem('gameState')
    ? JSON.parse(localStorage.getItem('gameState'))
    : [];
    return savedGameState;
};

export const saveGameState = (gameStateArr) => {
    if (gameStateArr.length) {
        localStorage.setItem('gameState', JSON.stringify(gameStateArr));
    } else {
        localStorage.removeItem('gameState');
    }
}; 

export const removeGameState = (gameState) => {
    const savedGameStates = localStorage.getItem('gameState')
    ? JSON.parse(localStorage.getItem('gameState'))
    : null ;

    if (!savedGameStates) {
        return false;
    }

    const updatedGameStates = savedGameStates?filter((savedGameState) => savedGameState !== gameState);
    localStorage.setItem('gameState', JSON.stringify(updatedGameStates));
}