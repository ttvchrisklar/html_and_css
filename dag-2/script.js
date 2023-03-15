var ctx = document.getElementById("bord").getContext("2d"),
    canvas = document.getElementById("bord");
const clearBoxHeight = 55,
    clearBoxLenght = 35,
    carSpawnX = 100,
    carSpawnY = 200;
var carY = 200,
    carX = 100,
    carHeight = 50,
    carLenght = -25,
    clearBoxX = carX,
    clearBoxY = carY;

function gameStart() {
    makeCar();
    crateNewWall(2);
}

function gameUpdate(wallDistanceMovedX, wallDistanceMovedY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    // Redraw the car and all walls
    makeCar();
    for (let i = 0; i < wallsOnScreen.length; i++) {
        reDrawWall(i, wallDistanceMovedX, wallDistanceMovedY);
    }
}

class car_Class {
    car = {
        carY: 200,
        carX: 100,
        carHeight: 50,
        carLenght: -25,
        clearBoxX: carX,
        clearBoxY: carY,
        hitbox: new rect(carX, carY, carHeight, carLenght),
    };
    constructor() {
        this.car.carY = 200;
        this.car.carX = 100;
        this.car.carHeight = 50;
        this.car.carLenght = -25;
        this.car.clearBoxX = this.car.carX;
        this.car.clearBoxY = this.car.carY;
        this.car.hitbox = new rect(this.car.carX, this.car.carY, this.car.carHeight, this.car.carLenght);
    }
}

function makeCar() {
    body();
    windos();
    wheal1();
    wheal2();
    clearBox();
}
function body() {
    ctx.beginPath();
    ctx.rect(carX, carY, carHeight, carLenght);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
}
function windos() {
    ctx.beginPath();
    ctx.rect(carX + 38, carY - 23, 10, 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}
function wheal1() {
    ctx.beginPath();
    ctx.arc(carX + 40, carY - 2, 5, 1, 4 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
}
function wheal2() {
    ctx.beginPath();
    ctx.arc(carX + 10, carY - 2, 5, 2, 3 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
}
function clearBox() {
    clearBoxX = carX - 2;
    clearBoxY = carY - 27.3;
}
function worldBorder() {
    if (carX <= 0 || carX >= canvas.height - 50 || carY <= 25 || carY + 1 >= canvas.width) {
        console.log("world border");
        carX = carSpawnX;
        carY = carSpawnY;
    }
    gameUpdate(0, 0);
}

function moveCar(direction) {
    switch (direction) {
        case "upp":
            carY -= 5;
            break;
        case "down":
            carY += 5;
            break;
        case "left":
            carX -= 5;
            break;
        case "right":
            carX += 5;
            break;
    }
    hitboxCheker();
    worldBorder();
}
var newWall;
var wallsOnScreen = [];
function crateNewWall() {
    for (let i = 0; i < 2; i++) {
        newWall = new wall_Class();
        wallsOnScreen.push(newWall);
        drawWall(i);
        console.log(wallsOnScreen);
    }
}
function drawWall(wallnuber) {
    if (wallnuber / 2 == Math.floor(wallnuber / 2)) {
        wallsOnScreen[wallnuber].wallY = canvas.height;
        ctx.beginPath();
        ctx.rect(wallsOnScreen[wallnuber].wallX, wallsOnScreen[wallnuber].wallY, wallsOnScreen[wallnuber].wallLenght, -wallsOnScreen[wallnuber].wallHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
    if (wallnuber / 2 != Math.floor(wallnuber / 2)) {
        ctx.beginPath();
        ctx.rect(wallsOnScreen[wallnuber].wallX, wallsOnScreen[wallnuber].wallY, wallsOnScreen[wallnuber].wallLenght, wallsOnScreen[wallnuber].wallHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}

function reDrawWall(wall, distensMovdX, distensMovdY) {
    ctx.clearRect(wallsOnScreen[wall].wallX, wallsOnScreen[wall].wallY, wallsOnScreen[wall].wallLenght, wallsOnScreen[wall].wallHeight);
    wallsOnScreen[wall].wallX += distensMovdX;
    wallsOnScreen[wall].wallY += distensMovdY;
    ctx.beginPath();
    ctx.rect(wallsOnScreen[wall].wallX, wallsOnScreen[wall].wallY, wallsOnScreen[wall].wallLenght, wallsOnScreen[wall].wallHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

class wall_Class {
    wallX;
    wallY;
    wallHeight;
    wallSpeed;
    wallLenght;
    wallHitbox = {
        hitbox: ctx.rect(this.wallX, this.wallY, this.wallHeight, this.wallLenght),
    };
    constructor() {
        this.wallHeight = canvas.height / 2.2;
        this.wallX = 375;
        this.wallY = 0;
        this.wallSpeed = 1;
        this.wallLenght = 25;
    }
}
// Define objects and hitboxes
var player = {
    x: carX,
    y: carY,
    width: carLenght,
    height: carHeight,
    hitbox: ctx.rect(carX, carY, carLenght, carHeight),
};

function hitboxCheker() {
    // Define player hitbox
    var playerHitbox = new rect(player.x, player.y, player.width, player.height);

    // Check for collisions with walls
    for (let i = 0; i < wallsOnScreen.length; i++) {
        var wallHitbox = wallsOnScreen[i].hitbox;
        if (playerHitbox.intersects(wallHitbox)) {
            // Update game state
            console.log("Collision detected!");
        }
    }
}
