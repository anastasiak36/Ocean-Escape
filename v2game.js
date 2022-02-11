var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
 
var x = 10;
var y = 440;
var fish = document.getElementById("fish");
 
var yellowPlank = document.getElementById("plank");
var plankCoord = [];
var yellowPlankY = [450, 400, 350, 300, 250, 200, 150, 100, 50];
var yellowPlankX = [c.width + 100, c.width + 60, c.width + 20, c.width - 20, c.width - 60, c.width - 100];

var greenPlank = document.getElementById("green_plank");
var greenPlankCoord = [];
var greenPlankY = [450, 400, 350, 300, 250, 200, 150, 100, 50];
var greenPlankX = [c.width + 80, c.width + 40, c.width, c.width - 40];
 
var shark = document.getElementById("shark");
var sharkCoord = [];
var sharkY1 = [175, 75];
var sharkY2 = [320,275, 225]
// var currentSharkY = sharkY[Math.floor(Math.random() * 6)];
// var currentSharkX = c.width - 20;
 
var spacePressed = false;
var startTime = new Date();
var elapsed;
var lives = 3;
var counter = 0;
var energy = 0;
var path = window.location.pathname;
var dir = path.substring(0, path.lastIndexOf('/'));


sharkCoord[0] = {x: c.width - 20, y: sharkY1[Math.floor(Math.random() * 2)]};
sharkCoord[1] = {x: c.width - 20, y: sharkY2[Math.floor(Math.random() * 3)]};
for (var z = 0; z < 30; z++) {
    plankCoord[z] = {x: c.width + 50, y: yellowPlankY[Math.floor(Math.random() * 7)]};
}
for (var t = 0; t < 50; t++) {
    greenPlankCoord[t] = {x: c.width + 50, y: greenPlankY[Math.floor(Math.random() * 7)]};
}
 
function createPlankton() {
    for (var i = 0; i < 10; i++){
        plankCoord[i] = {x: yellowPlankX[Math.floor(Math.random() * 6)], y: plankCoord[i].y};
    }
    for (var j = 0; j < 15; j++) {
        greenPlankCoord[j] = {x: greenPlankX[Math.floor(Math.random() * 4)], y: greenPlankCoord[j].y};
    }
}
function movePlankton(){
    var i = 0;
    var j = 0;
    while (i < 10) {
        if (plankCoord[i].x <= 10){
            plankCoord[i].x = yellowPlankX[Math.floor(Math.random() * 7)];
            plankCoord[i].y = yellowPlankY[Math.floor(Math.random() * 6)];
        }
        plankCoord[i].x -= 5;
        i++;
    }
    while (j < 15) {
        if (greenPlankCoord[j].x <= 0){
            greenPlankCoord[j].x = greenPlankX[Math.floor(Math.random() * 7)];
            greenPlankCoord[j].y = greenPlankY[Math.floor(Math.random() * 4)];
        }
        greenPlankCoord[j].x -= 4;
        j++;
    }
}
function drawPlankton() {
    for (var i = 0; i < 10; i++) {
        ctx.drawImage(plank, plankCoord[i].x, plankCoord[i].y, 50, 25);
    }
    for (var j = 0; j < 15; j++) {
        ctx.drawImage(greenPlank, greenPlankCoord[j].x, greenPlankCoord[j].y, 50, 25);
    }
}
function drawShark() {
    for (var q = 0; q < 2; q++) {
        ctx.drawImage(shark, sharkCoord[q].x, sharkCoord[q].y, 100, 85);
    }
    
}
function moveShark() {
    for (var q = 0; q < 2; q++) {
        sharkCoord[q].x -= 3;
        if (sharkCoord[q].x <= 0){
            sharkCoord[q].x = c.width - 20;
            if (q == 0){
                sharkCoord[q].y = sharkY1[Math.floor(Math.random() * 2)];
            }
            else {
                sharkCoord[q].y = sharkY2[Math.floor(Math.random() * 3)];
            }
            
        }
    }
    
}
 
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        spacePressed = true;
    }
}
function collisionDetection(){
    var i = 0;
    var leftPlankton;
    var leftFish;
    var rightPlankton;
    var rightFish;
    var topPlankton;
    var topFish;
    var bottomPlankton;
    var bottomFish;
    while (i < 10){
        leftPlankton = plankCoord[i].x;
        leftFish = x;
        rightPlankton = plankCoord[i].x + 50;
        rightFish = x + 40;
        topPlankton = plankCoord[i].y;
        topFish = y;
        bottomPlankton = plankCoord[i].y + 25;
        bottomFish = y + 25;
        //https://www.oreilly.com/library/view/html5-canvas-2nd/9781449335847/ch04s10.html
        if (!((bottomPlankton < topFish) || (topPlankton > bottomFish) || (rightPlankton < leftFish) || (leftPlankton > rightFish))) {
            if (fish.src == ("https://anastasiak36.github.io/Ocean-Escape/images/fish_mouth_open.png")) {
                plankCoord[i].x = yellowPlankX[Math.floor(Math.random() * 7)];  
                plankCoord[i].y = yellowPlankY[Math.floor(Math.random() * 7)];
                drawPlankton();
                energy++;
                drawEnergy();
                
            }
            else {
                plankCoord[i].x = yellowPlankX[Math.floor(Math.random() * 7)];  
                plankCoord[i].y = yellowPlankY[Math.floor(Math.random() * 7)];
                drawPlankton();
            }
        }
        i++;
    }
    i = 0;
    while (i < 15) {
        leftPlankton = greenPlankCoord[i].x;
        rightPlankton = greenPlankCoord[i].x + 50;
        topPlankton = greenPlankCoord[i].y;
        bottomPlankton = greenPlankCoord[i].y + 25;
        if (!((bottomPlankton < topFish) || (topPlankton > bottomFish) || (rightPlankton < leftFish) || (leftPlankton > rightFish))) {
            if (fish.src == ("https://anastasiak36.github.io/Ocean-Escape/images/fish_mouth_open.png")) {
                greenPlankCoord[i].x = yellowPlankX[Math.floor(Math.random() * 7)];  
                greenPlankCoord[i].y = yellowPlankY[Math.floor(Math.random() * 4)];
                energy--;
                if (energy < 0){
                    energy = 0;
                }
                drawEnergy();
            }
            else {
                greenPlankCoord[i].x = yellowPlankX[Math.floor(Math.random() * 7)];  
                greenPlankCoord[i].y = yellowPlankY[Math.floor(Math.random() * 4)];
            }
            drawPlankton();
        }
        i++;
    }
        
    for (var q = 0; q < 2; q++) {
        if (!(sharkCoord[q].x > (x + fish.width) || x > (sharkCoord[q].x+ 20) || sharkCoord[q].y > (y + fish.height) || y > (sharkCoord[q].y + 50))) {
            if (energy < 10) {
                sharkCoord[q].x = c.width - 20; 
                if (q == 0){
                    sharkCoord[q].y = sharkY1[Math.floor(Math.random() * 2)];
                } 
                else{
                    sharkCoord[q].y = sharkY2[Math.floor(Math.random() * 3)];
                }
                drawShark();
                if (fish.src == ("https://anastasiak36.github.io/Ocean-Escape/images/fish_mouth_open.png")) {
                    lives--;
                    counter = 0;
                    energy = 0;
                    x = 10;
                    y = 450;
                }
                else if (fish.src == ("https://anastasiak36.github.io/Ocean-Escape/images/fish_mouth_closed.png")) {
                    lives--;
                    counter = 0;
                    x = 10;
                    y = 450;
                }
            }
            else {
                energy = 0;
            }
            
        }
    }
    
    
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
function drawLoser() {
    drawTime();
    drawLives();
    drawEnergy();
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "#ae00ff";
    ctx.fillText("GAME OVER :( Reload the page to try again!", (c.width / 2) - 450, c.height / 2 + 10);
}
 
function move() {
    y -= 50;
    counter++;
}
setInterval(move, 10000);
 
function draw() {
    
    ctx.clearRect(0, 0, c.width, c.height);
    if (counter == 9){
        drawPlayer();
    }
    if (counter < 9 && lives > 0) {
        drawPlankton();
        drawPlayer();
        drawShark();
        movePlankton();
        moveShark();
        drawLives();
        drawTime();
        drawEnergy();
        collisionDetection();
        requestAnimationFrame(draw);
    }
    else if (lives <= 0) {
        drawLoser();
    }
    else {
        drawWinner();
    }
    if (spacePressed) {
        if (fish.src == ("https://anastasiak36.github.io/Ocean-Escape/images/fish_mouth_closed.png")) {
            fish.src = "images/fish_mouth_open.png";
            spacePressed = false;
        }
        else {
            fish.src = "images/fish_mouth_closed.png";
            spacePressed = false;
        }
    }
   
 }
 draw();
 createPlankton();
 
 
