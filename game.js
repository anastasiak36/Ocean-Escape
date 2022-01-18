var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function draw() {
    var fish = getElementById('fish');
    ctx.drawImage(fish, 10, ctx.height - 10);
}
draw();
