var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function draw() {
    //var fish = document.getElementById('fish');
    var img = new Image();
    img.addEventListener('load', function() {
        ctx.drawImage(img, 10, ctx.height - 100);
    }, false);
    img.src = "../images/fish_mouth_closed.png";
    //ctx.drawImage(img, 10, ctx.height - 100);
    
}
draw();
