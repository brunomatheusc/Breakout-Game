var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

setInterval(draw, 10);

var x = canvas.width / 2, y = canvas.height - 30, dx = 2, dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rigthPressed = false, leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
    if (e.keyCode == 39){
        rigthPressed = true;
    } else if (e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if (e.keyCode == 39){
        rigthPressed = false;
    } else if (e.keyCode == 37){
        leftPressed = false;
    }
}

function drawball(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.closePath();
    ctx.fill();
    ctx.closePath();

}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawball();
    drawPaddle();

    if (y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            alert("Game Over");
            document.location.reload();
        }
    }

    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = -dx;
    }

    if (rigthPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    } else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}