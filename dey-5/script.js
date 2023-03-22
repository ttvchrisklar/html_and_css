const score = document.getElementById("score"),
    ctx = document.getElementById("bord").getContext("2d"),
    canvas = document.getElementById("bord");

var totalPoint = 0,
    thisRoundsPoints = 0,
    totalRounds = 0,
    curentRound = 0,
    numberRolld = 1;

function gameStart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    totalPoint = 0;
    thisRoundsPoints = 0;
    totalRounds = 0;
    curentRound = 0;
    gameUpdate();
    endRound();
}

function gameUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    drawDice(numberRolld);
}

function rollDice() {
    var i = 0;
    var speed = 100;
    var interval = setInterval(() => {
        var rolldDice = Math.floor(Math.random() * 6) + 1;
        if (i == 15) {
            clearInterval(interval);
            drawDice(rolldDice);
            checkNumber(rolldDice);
        }
        drawDice(rolldDice);
        i++;
    }, speed);
}

function checkNumber(nuberToCheck) {
    if (nuberToCheck === 1) {
        thisRoundsPoints = 0;
        endRound();
    } else {
        thisRoundsPoints += nuberToCheck;
        score.innerHTML = `score: ${totalPoint} you will get: ${thisRoundsPoints} if you stopp now, Round: ${totalRounds}`;
    }
}

function endRound() {
    totalPoint += thisRoundsPoints;
    thisRoundsPoints = 0;
    totalRounds += 1;
    score.innerHTML = `score: ${totalPoint} you will get:${thisRoundsPoints} if you stopp now, Round: ${totalRounds}`;
    if (totalPoint >= 100) {
        score.innerHTML = `congratulasions you won you ended the game whit  ${totalPoint}/100 points, play agen?<br> <button onclick="gameStart()">play agen</button>`;
    }
}
function drawDice(numberRolld) {
    ctx.beginPath();
    ctx.rect(0, 0, 100, 100);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
    switch (numberRolld) {
        case 1:
            ctx.beginPath();
            ctx.arc(50, 50, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.arc(25, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.arc(25, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(50, 50, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.arc(25, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(25, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            break;
        case 5:
            ctx.beginPath();
            ctx.arc(25, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(25, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(50, 50, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.arc(25, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(25, 50, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(25, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 50, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 25, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(75, 75, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            break;
        default:
            console.error(`${numberRolld} is not a nuber on a d6`);
            drawDice(1);
            break;
    }
}
window.onload = gameStart();
