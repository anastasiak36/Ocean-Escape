// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");

// function draw() {
//     //var fish = document.getElementById('fish');
//     var img = new Image();
//     img.addEventListener('load', function() {
//         ctx.drawImage(img, 10, ctx.height - 100);
//     }, false);
//     img.src = "../images/fish_mouth_closed.png";
//     //ctx.drawImage(img, 10, ctx.height - 100);
    
// }
// draw();
window.onload = function() {
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
        if (e.key == "Right" || e.key == "ArrowRight") {
            spacePressed = true;
        }
    } 

    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            spacePressed = false;
        }
    }
    function drawPlayer() {
        ctx.drawImage(img, x, y, 100, 50);
        img.height = "100px";
        img.width = "150px";
    }
    function draw() {
       drawPlayer();
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
    }
    function move() {
        y -= 25;
    }
    
    draw();
    
    
  };
