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
window.onload = function() {
    drawPlayer();
}

function drawTime() {
    elapsed = parseInt((new Date() - startTime) / 1000);
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#5500ff";
    ctx.fillText("Time: " + elapsed, c.width - 100, 20);
}
function drawLives() {
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#5500ff";
    ctx.fillText("Lives: " + lives, c.width - 100, 50);
}

function drawWinner() {
    drawTime();
    drawLives();
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
        drawLives();
        drawTime();
        requestAnimationFrame(draw);
    }
    else {
        drawWinner();
        setTimeout()
    }
    
 }
 draw();
