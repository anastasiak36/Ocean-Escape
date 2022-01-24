var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 10;
var y = 450;
var fish = document.getElementById("fish");
var mouth = true;
var spacePressed = false;
var startTime = new Date();
var elapsed;
var lives = 3;
var counter = 0;
var energy = 0;
var defaultPlankx = c.width / 2;
var defaultPlanky = c.height / 2;
var plankCoord = [];
var lastPlank = 0;

function createPlankton() {
    if (elapsed % 5 == 0) {
        for (var i = lastPlank; i < lastPlank + 3; i++) {
            plankCoord[i] = {x: c.width - 20, y: Math.floor(Math.random() * c.height - 100) + 90};
            if (lastPlank <= plankCoord.length - 3){
                lastPlank++;
            }
            else {
                lastPlank = 0;
            }
        }
    }
    
}
for (var i = 0; i < 30; i++) {
    var imgTag = new Image();
    imgTag.onload = drawPlankton;
    imgTag.src = "images/yellow_plankton.png";   // load image
    plankCoord[i] = {x: c.width + 10, y: c.height + 10, img: imgTag};
}

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        spacePressed = true;
    }
}
function drawPlayer() {
    ctx.drawImage(fish, x, y, 100, 50);
    fish.height = "100px";
    fish.width = "150px";
}

function drawPlankton() {
    ctx.drawImage(plankCoord[i].img, plankCoord[i].x, plankCoord[i].y, 50, 30);
}


window.onload = function() {
    drawPlayer();
    //drawPlankton();
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
    //sort of works but is glitchy
    if (spacePressed) {
        var path = window.location.pathname;
        var dir = path.substring(0, path.lastIndexOf('/'));
        //alert("file://" + dir + "/images/fish_mouth_closed.png");
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
    drawPlayer();
    if (counter < 9) {
        createPlankton();
        for (var i = 0; i < 30; i++) {
            drawPlankton();
        }
        drawLives();
        drawTime();
        drawEnergy();
        requestAnimationFrame(draw);
    }
    else {
        drawWinner();
        //setTimeout()
    }
    
 }
 draw();
