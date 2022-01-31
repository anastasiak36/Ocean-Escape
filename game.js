var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var x = 10;
var y = 450;
var fish = document.getElementById("fish");

var plank = document.getElementById("plank");
var plankCoord = [];
var plankY = [450, 400, 350, 300,250,200,150];

var shark = document.getElementById("shark");
var sharkY = [325, 275, 225, 175, 125, 75];
var currentSharkY = sharkY[Math.floor(Math.random() * 6)];
var currentSharkX = c.width - 20;

var spacePressed = false;
var startTime = new Date();
var elapsed;
var lives = 3;
var counter = 0;
var energy = 0;
var path = window.location.pathname;
var dir = path.substring(0, path.lastIndexOf('/'));

for (var z = 0; z < 30; z++) {
    plankCoord[z] = {x: c.width + 50, y: plankY[Math.floor(Math.random() * 8)]};
}

function createPlankton() {
    for (var i = 0; i < 5; i++){
        plankCoord[i] = {x: c.width - 20, y: plankCoord[i].y};
    }
}
function movePlankton(){
    var i = 0;
    while (plankCoord[i].x != c.width + 50) {
        plankCoord[i].x -= 2;
        if (plankCoord[i].x <= 0){
            plankCoord[i].x = c.width - 20;
            plankCoord[i].y = plankY[Math.floor(Math.random() * 8)];
        }
        else if (!(plankCoord[i].x > fish.x + fish.width || fish.x > plankCoord[i].x + plankCoord[i].width || plankCoord[i].y > fish.y + fish.height || plankCoord[i].y > fish.y + fish.height)) {
            if (fish.src == ("file://" + dir + "/images/fish_mouth_open.png")) {
                energy++;
                drawEnergy();
            }
            plankCoord[i].x = c.width - 20;  
            plankCoord[i].y = plankY[Math.floor(Math.random() * 8)];
        }
        i++;
    }
}
function drawPlankton() {
    for (var i = 0; i < plankCoord.length; i++) {
        ctx.drawImage(plank, plankCoord[i].x, plankCoord[i].y, 50, 30);
    }
}
function drawShark() {
    ctx.drawImage(shark, currentSharkX, currentSharkY, 100, 85);
}
function moveShark() {
    currentSharkX -= 3;
    if (currentSharkX <= 0){
        currentSharkX = c.width - 20;
        currentSharkY = sharkY[Math.floor(Math.random() * 6)];
    }
}

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        spacePressed = true;
    }
}
function collisionDetection(){
    
}
function drawPlayer() {
    ctx.drawImage(fish, x, y, 100, 45);
    fish.height = "100px";
    fish.width = "150px";
}

window.onload = function() {
    drawPlayer();
}

function drawTime() {
    elapsed = parseInt((new Date() - startTime) / 1000);
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#5500ff";
    ctx.fillText("Time: " + elapsed, c.width - 125, 20);
}
function drawLives() {
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#5500ff";
    ctx.fillText("Lives: " + lives, c.width - 125, 50);
}
function drawEnergy() {
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#5500ff";
    ctx.fillText("Energy: " + energy, c.width - 125, 80);
}

function drawWinner() {
    drawTime();
    drawLives();
    drawEnergy();
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "#ae00ff";
    ctx.fillText("You WON! CONGRATS:) ", c.width / 2 - 210, c.height / 2 + 10);
}

function move() {
    y -= 50;
    counter++;
}
setInterval(move, 10000);

function draw() {
    if (spacePressed) {
        if (fish.src == ("file://" + dir + "/images/fish_mouth_closed.png")) {
            fish.src = "images/fish_mouth_open.png";
            spacePressed = false;
        }
        else {
            fish.src = "images/fish_mouth_closed.png";
            spacePressed = false;
        }
    }
    ctx.clearRect(0, 0, c.width, c.height);
    if (counter == 9){
        drawPlayer();
    }
    if (counter < 9) {
        drawPlayer();
        moveShark();
        drawShark();
        movePlankton();
        drawPlankton();
        drawLives();
        drawTime();
        drawEnergy();
        requestAnimationFrame(draw);
    }
    else {
        drawWinner();
    }
    
 }
 draw();
 createPlankton();
