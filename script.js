let playerScore = 0;
let computerScore = 0;

const signButtons = document.querySelectorAll(".btn");
signButtons.forEach((button) =>button.addEventListener("click", playRound));

function playRound(e) {
    if (isGameOver()){
        alert("Game Over,press F5 to Restart");
        return;
    }  
    let buttonId;
    if(e.target.tagName.toLowerCase() ==="i") {
        buttonId = e.target.parentNode.id;
    }else{
        buttonId = e.target.id;
    }

const playerSelection = convertIdToSign(buttonId);
const computerSelection = getRandomChoice();
updateScore(getWinner(playerSelection, computerSelection));
updateChoices(playerSelection, computerSelection);
}

function updateScore(winner) {
    const scoreHeading = document.getElementById("score-heading");
    const playerScorePara = document.getElementById("player-score");
    const computerScorePara = document.getElementById("computer-score");
    
    if(winner ==="tie") {
        scoreHeading.textContent = "it's a tie";
    }else if(winner === "player") {
        scoreHeading.textContent = "You won:)";
        playerScore++;
    }else if(winner === "computer") {
        scoreHeading.textContent = "You Lost:(";
        computerScore++;
    }

    playerScorePara.textContent = `Player: ${playerScore}`;
    computerScorePara.textContent = `Computer: ${computerScore}`;

    if(isGameOver()) setFinalMessage();
}

function updateChoices(playerSelection,computerSelection) {
    const playerSign = document.getElementById("player-sign");
    const computerSign = document.getElementById("computer-sign");

    playerSign.classList.add("active");
    computerSign.classList.add("active");

    const playerSignClassName = `fa-hand-${playerSelection.toLowerCase()}`;
    const computerSignClassName = `fa-hand-${computerSelection.toLowerCase()}`; 

    playerSign.classList =  `fas ${playerSignClassName} active`;
    computerSign.classList =  `fas ${computerSignClassName} active`;


}

function setFinalMessage() {
    return playerScore> computerScore 
    ? (scoreHeading.textContent = "YOU WON!!!!")
    : (scoreHeading.textContent = "GAME OVER , YOU LOST");
}

function getWinner(playerSelection,computerSelection) {
    if(playerSelection ===computerSelection) {
        return "tie";
    }
    if(
        (playerSelection === "ROCK" && computerSelection === "SCISSORS")||
        (playerSelection === "PAPER" && computerSelection === "ROCK")||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER")
    ){
        return "player";
    }
    if(
        (playerSelection === "SCISSORS" && computerSelection === "ROCK")||
        (playerSelection === "ROCK" && computerSelection === "PAPER")||
        (playerSelection === "PAPER" && computerSelection === "SCISSORS")
    ){
        return "computer";
    }
}

function getRandomChoice() {
    let randomNumber = Math.floor(Math.random()*3);
    switch (randomNumber) {
        case 0:
            return "ROCK";
            case 1:
                return "PAPER";
                case 2:
                    return "SCISSORS";     
    }
}

function convertIdToSign(buttonId) {
    return buttonId.split("-")[0].toUpperCase();
}

function isGameOver() {
    return playerScore ===5 || computerScore ===5;
}