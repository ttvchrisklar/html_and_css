var allContainerblocksOnScreen = [],
    newContainerblock,
    numberblockOnScreen = [],
    newNumberblock,
    gameInterval,
    spawnAmount = 2,
    score = 0;

const spawnAmountDiv = document.getElementById("spawnAmountDiv"),
    ctx = document.getElementById("game_bord").getContext("2d"),
    canvas = document.getElementById("game_bord");

//TODO fix the block movment system.
//TODO add an event if the bord is full

function changeSpawnAmount(amount) {
    spawnAmount += amount;
    spawnAmountDiv.innerHTML = `Spawn amount: ${spawnAmount}`;
}

function gameUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    createNewContainerblock();
    changeSpawnAmount(0);
    // gameInterval = setInterval(() => {
    //     draw();
    // }, 500);
}
function sortNumberBlocksOnScreen(dir) {
    console.log("[script:30]: numberblockOnScreen", numberblockOnScreen);
    switch (dir) {
        case "up":
            numberblockOnScreen.sort((a, b) => a.y - b.y);
            break;
        case "down":
            numberblockOnScreen.sort((a, b) => b.y - a.y);
            break;
        case "left":
            numberblockOnScreen.sort((a, b) => b.x - a.x);
            break;
        case "right":
            numberblockOnScreen.sort((a, b) => a.x - b.x);
            break;
        default:
            console.log("[script:61]: lol");
    }
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function buttonMove(dir) {
    sortNumberBlocksOnScreen(dir);
    numberblockOnScreen.forEach(async (numberBlock) => {
        numberBlock.move(dir);
        draw();
    });
    spawnNewNuberblock();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    numberblockOnScreen.forEach((numberBlock) => {
        numberBlock.draw();
    });
    allContainerblocksOnScreen.forEach((containerBlock) => {
        containerBlock.draw();
    });
}
function spawnNewNuberblock() {
    var i = 0;
    i++;
    if (i <= numberblockOnScreen.length) {
        createNewNumberblock(1);
        i = 0;
    }
}
const positions = {
    0: { x: 0, y: 0 },
    1: { x: 100, y: 0 },
    2: { x: 200, y: 0 },
    3: { x: 300, y: 0 },
    4: { x: 0, y: 100 },
    5: { x: 100, y: 100 },
    6: { x: 200, y: 100 },
    7: { x: 300, y: 100 },
    8: { x: 0, y: 200 },
    9: { x: 100, y: 200 },
    10: { x: 200, y: 200 },
    11: { x: 300, y: 200 },
    12: { x: 0, y: 300 },
    13: { x: 100, y: 300 },
    14: { x: 200, y: 300 },
    15: { x: 300, y: 300 },
};
class containerblock {
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    inUse = false;
    position;
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}
class numberblock {
    pos = { x: 0, y: 0 };
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    number = 2;
    position;
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.font = "30px serif";
        ctx.fillText(`${this.number}`, this.x + 10, this.y + 50);
        ctx.stroke();
    }
    checkIfContainerInUse(x, y) {
        var numberInContainer = numberblockOnScreen.filter((numberBlock) => {
            if (numberBlock.x == x && numberBlock.y == y) return numberBlock;
        }); //returns: "null" or "numberBlock"
        return numberInContainer[0];
    }
    checkIfMerge(blockToCheck) {
        if (this.number == blockToCheck.number) return true;
        return false;
    }
    merge(blockToMerge) {
        this.number += blockToMerge.number;
        var indexToRemove = numberblockOnScreen.indexOf(blockToMerge);
        if (indexToRemove >= 0) numberblockOnScreen.splice(indexToRemove, 1);
    }
    move(inputDir) {
        if (inputDir == "up") {
            if (this.y != 0) {
                var blockUp = this.checkIfContainerInUse(this.x, this.y - this.height);
                if (blockUp) {
                    if (this.checkIfMerge(blockUp)) {
                        this.merge(blockUp);
                        this.y -= this.height;
                        this.move(inputDir);
                    } else return;
                } else {
                    this.y -= this.height;
                    this.move(inputDir);
                }
            }
            return;
        } else if (inputDir == "down") {
            if (this.y != 300) {
                var blockDown = this.checkIfContainerInUse(this.x, this.y + this.height);
                if (blockDown) {
                    if (this.checkIfMerge(blockDown)) {
                        this.merge(blockDown);
                        this.y += this.height;
                        this.move(inputDir);
                    } else return;
                } else {
                    this.y += this.height;
                    this.move(inputDir);
                }
            }
            return;
        } else if (inputDir == "left") {
            if (this.x != 0) {
                var blockLeft = this.checkIfContainerInUse(this.x - this.width, this.y);
                if (blockLeft) {
                    if (this.checkIfMerge(blockLeft)) {
                        this.merge(blockLeft);
                        this.x -= this.width;
                        this.move(inputDir);
                    } else return;
                } else {
                    this.x -= this.width;
                    this.move(inputDir);
                }
            }
            return;
        } else if (inputDir == "right") {
            if (this.x != 300) {
                var blockRight = this.checkIfContainerInUse(this.x + this.width, this.y);
                if (blockRight) {
                    if (this.checkIfMerge(blockRight)) {
                        this.merge(blockRight);
                        this.x += this.width;
                        this.move(inputDir);
                    } else return;
                } else {
                    this.x += this.width;
                    this.move(inputDir);
                }
            }
            return;
        }
    }
}
function createNewContainerblock() {
    var i = 0;
    var speed = 50;
    var interval = setInterval(() => {
        if (i == 15) {
            clearInterval(interval);
            console.log(allContainerblocksOnScreen);
            // createNewNumberblock(2);
        }
        newContainerblock = new containerblock();
        newContainerblock.position = i;
        allContainerblocksOnScreen.push(newContainerblock);
        moveContainerblock(i);
        i++;
    }, speed);
}

function moveContainerblock(i) {
    var container = allContainerblocksOnScreen[i];
    container.x = positions[i].x;
    container.y = positions[i].y;
    container.draw();
}

function createNewNumberblock(l) {
    //checks if ther is an avalible container.
    let availableContainers = allContainerblocksOnScreen.filter((container) => !container.inUse);
    if (availableContainers.length === 0) {
        console.log("No available containers to place new number blocks!");
        return;
    }
    for (let i = 0; i < l; i++) {
        newNumberblock = new numberblock();
        setRandomBlockPosition(newNumberblock);
        if (numberblockOnScreen.length < 16) {
            numberblockOnScreen.push(newNumberblock);
        }
    }
}
function setRandomBlockPosition(newNumberblock) {
    function checkAvailableContainers() {
        //checks if a container is in use
        var usedPosition = [],
            availablePositions = [],
            allPosValues = Object.values(positions);
        numberblockOnScreen.forEach((numberBlock) => {
            usedPosition.push({ x: numberBlock.x, y: numberBlock.y });
        });
        if (numberblockOnScreen.length <= 0) return allPosValues;
        for (var value of allPosValues) {
            var isUsed = false;
            usedPosition.forEach((pos) => {
                if (value.x === pos.x && value.y === pos.y) isUsed = true;
            });
            if (!isUsed) availablePositions.push(value);
        }
        return availablePositions;
    }
    var availPos = checkAvailableContainers();
    //seleckts a random container block on the bord
    let randomIndex = Math.floor(Math.random() * availPos.length);
    if (availPos.length > 0) {
        //if a block is open then it will plase it in it
        var randomContainerBlock = availPos[randomIndex];
        newNumberblock.x = randomContainerBlock.x;
        newNumberblock.y = randomContainerBlock.y;
        //draws new numberblock
        newNumberblock.draw();
        console.log(`Number block placed at (${randomContainerBlock.x}, ${randomContainerBlock.y})`);
    } else {
        //if the bord os full then it will not spawn a new one
        console.error("[script:242] ERROR: board full");
    }
}

// this NEEDS to be at the bottom!!!
window.onload = gameUpdate();
// always att the bottom!!!
