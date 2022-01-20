var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 10;
var y = 450;
var img = document.getElementById("fish");
var mouth = true;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "ArrowRight" || e.key == "Right") {
        spacePressed = true;
    }
} 

function keyUpHandler(e) {
    if(e.key == "ArrowRight" || e.key == "Right" ) {
        spacePressed = false;
    }
}
function drawPlayer() {
    ctx.drawImage(img, x, y, 100, 50);
    img.height = "100px";
    img.width = "150px";
}
window.onload = function() {
    drawPlayer();
}
function move() {
    y -= 50;
}
setInterval(move, 10000);

function draw() {
    //sort of works but is glitchy
    if (spacePressed) {
        if (mouth) {
            img.src = "images/fish_mouth_closed.png";
            mouth = false;
        }
        else {
            img.src = "images/fish_mouth_open.png";
            mouth = true;
        }
    }
    ctx.clearRect(0, 0, c.width, c.height);
    drawPlayer();
    requestAnimationFrame(draw);
 }
 draw();
