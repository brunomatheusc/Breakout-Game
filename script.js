// Declaring canvas variable and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

// Calls setInterval passing draw function every 10 miliseconds
setInterval(draw, 10);

// Declaring some useful variables
var x = canvas.width / 2, y = canvas.height - 30, dx = 2, dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rigthPressed = false, leftPressed = false;
var brickRowCount = 3, brickColumnCount = 5, brickWidth = 75, brickHeight = 20;
var brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;

// Initializing bricks array
var bricks = [];
for (column = 0; column < brickColumnCount; column++){
    bricks[column] = [];
    for (row = 0; row < brickRowCount; row++){
        bricks[column][row] = {x: 0, y: 0};
    }
}

// Adding keyboard event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks(){
    for (var column = 0; column < brickColumnCount; column++){
        for (var row = 0; row < brickRowCount; row++){
            var brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
            
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Function to handle keyDown event
function keyDownHandler(e){
    if (e.keyCode == 39){
        rigthPressed = true;
    } else if (e.keyCode == 37){
        leftPressed = true;
    }
}


// Function to handle keyUp event
function keyUpHandler(e){
    if (e.keyCode == 39){
        rigthPressed = false;
    } else if (e.keyCode == 37){
        leftPressed = false;
    }
}

// Function to draw the ball
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

function collisionDetection(){
    for (var column = 0; column < brickColumnCount; column++){
        for (var row = 0; row < brickRowCount; row++){
            var b = bricks[column][row];
            
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
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