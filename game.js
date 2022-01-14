var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
ctx.fillStyle = "#8BD9C2";
ctx.fill();
ctx.closePath();