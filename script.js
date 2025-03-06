document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = {
        X: 0,
        O: 0,
        ties: 0
    };
    
    // Player selection
    const player1Symbol = 'X';
    let player1IsX = true;
    
    // DOM elements
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-btn');
    const selectXButton = document.getElementById('select-x');
    const selectOButton = document.getElementById('select-o');
    const xScoreElement = document.getElementById('x-score');
    const oScoreElement = document.getElementById('o-score');
    const tiesElement = document.getElementById('ties');
    
    // Winning conditions
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    // Functions
    const updateStatus = () => {
        status.textContent = gameActive 
            ? `Player ${currentPlayer}'s turn` 
            : '';
    };
    
    const updateScoreDisplay = () => {
        xScoreElement.textContent = scores.X;
        oScoreElement.textContent = scores.O;
        tiesElement.textContent = scores.ties;
    };
    
    const checkForWin = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                status.textContent = `Player ${gameState[a]} wins!`;
                scores[gameState[a]]++;
                updateScoreDisplay();
                return true;
            }
        }
        
        return false;
    };
    
    const checkForDraw = () => {
        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            status.textContent = 'Game ended in a draw!';
            scores.ties++;
            updateScoreDisplay();
            return true;
        }
        return false;
    };
    
    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        if (!checkForWin()) {
            checkForDraw();
            if (gameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();
            }
        }
    };
    
    const resetGame = () => {
        gameActive = true;
        currentPlayer = player1IsX ? 'X' : 'O';
        gameState = ['', '', '', '', '', '', '', '', ''];
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
        updateStatus();
    };
    
    const handlePlayerSelection = (isX) => {
        player1IsX = isX;
        selectXButton.classList.toggle('selected', isX);
        selectOButton.classList.toggle('selected', !isX);
        
        // Reset the game with new player selection
        resetGame();
    };
    
    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    
    selectXButton.addEventListener('click', () => handlePlayerSelection(true));
    selectOButton.addEventListener('click', () => handlePlayerSelection(false));
    
    // Initialize
    updateStatus();
});