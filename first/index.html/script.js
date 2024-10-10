const mainScreen = document.getElementById('main-screen');
const optionScreen = document.getElementById('option-screen');
const gameScreen = document.getElementById('game-screen');
const instructionsPopup = document.getElementById('instructions-popup');
const feedback = document.getElementById('feedback');
const heartsDisplay = document.getElementById('hearts');
const guessInput = document.getElementById('guess-input');
const hintBtn = document.querySelector('.hint-btn');
const submitBtn = document.querySelector('.submit-btn');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const winningPopup = document.getElementById('winning-popup');

// Variables
let correctNumber;
let attempts;
let maxAttempts = 3;
let hintShown = false;

// Event Listeners
document.querySelector('.start-game').addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    optionScreen.classList.remove('hidden');
});

document.querySelector('.instructions-btn').addEventListener('click', () => {
    instructionsPopup.classList.remove('hidden');
});

document.querySelector('.close-popup').addEventListener('click', () => {
    instructionsPopup.classList.add('hidden');
});

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', (e) => {
        const digits = e.target.dataset.digits;
        startGame(digits);
    });
});

hintBtn.addEventListener('click', () => {
    if (!hintShown) {
        feedback.textContent = "Can you guess it😁? The number is set by Charitra.";
        hintShown = true;
    } else {
        feedback.textContent = "Make a guess!";
        hintShown = false;
    }
});

submitBtn.addEventListener('click', checkGuess);

document.querySelector('.back-btn').addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    optionScreen.classList.remove('hidden');
    resetGame();
});

// Winning Popup Button Event Listeners
document.querySelector('.close-popup.winning-popup').addEventListener('click', () => {
    winningPopup.classList.add('hidden');
    mainScreen.classList.remove('hidden'); // Go back to main menu
});

document.querySelector('.continue-btn').addEventListener('click', () => {
    winningPopup.classList.add('hidden');
    optionScreen.classList.remove('hidden'); // Return to option screen
});

// Functions
function startGame(digits) {
    optionScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    if (digits === '4') {
        correctNumber = '2809';
        document.querySelector('.game-title').textContent = '4-Digit Number Guesser';
        guessInput.maxLength = 4;
    } else {
        correctNumber = '97383';
        document.querySelector('.game-title').textContent = '5-Digit Number Guesser';
        guessInput.maxLength = 5;
    }

    attempts = 0;
    guessInput.value = '';
    heartsDisplay.innerHTML = '❤️❤️❤️';
    feedback.textContent = 'Make a guess!';
}

function checkGuess() {
    const userGuess = guessInput.value;

    // Input validation
    if (!/^\d+$/.test(userGuess) || userGuess.length !== guessInput.maxLength) {
        feedback.textContent = "Please enter a valid number!";
        return;
    }

    if (userGuess === correctNumber) {
        feedback.textContent = "You win!";
        winSound.play();
        winningPopup.classList.remove('hidden'); // Show winning pop-up
    } else {
        attempts++;
        if (attempts < maxAttempts) {
            let correctPositions = getCorrectPositions(userGuess);
            feedback.textContent = `Wrong! Correct positions: ${correctPositions}`;
            loseSound.play();
            updateHearts();
        } else {
            feedback.textContent = `Game Over!.`;
            loseSound.play(); 
        }
    }
}

function getCorrectPositions(userGuess) {
    let positions = [];
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === correctNumber[i]) {
            positions.push(userGuess[i]);
        } else {
            positions.push('_');
        }
    }
    return positions.join(' ');
}

function updateHearts() {
    let hearts = '❤️'.repeat(maxAttempts - attempts);
    heartsDisplay.innerHTML = hearts;
    
}

function resetGame() {
    hintShown = false;
    feedback.textContent = 'Make a guess!';
    attempts = 0;
    guessInput.value = '';
    heartsDisplay.innerHTML = '❤️❤️❤️';
    winningPopup.classList.add('hidden'); // Ensure winning popup is hidden
}
