// Declaring canvas variable and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

// Declaring some useful variables
var x = (canvas.width / 2) + Math.floor(Math.random() * 21) - 10, y = (canvas.height - 30) + Math.floor(Math.random() * 21) - 10, dx = 5, dy = -5;
var ballRadius = 15;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rigthPressed = false, leftPressed = false;
var brickRowCount = 3, brickColumnCount = 5, brickWidth = 75, brickHeight = 20;
var brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;
var score = 0, lives = 3, level = 1, maxLevel = 5, paused = false;
var ball = new Image();
ball.src = 'ball.png';

// Initializing bricks array
var bricks = [];
initBricks();
function initBricks(){
    for (column = 0; column < brickColumnCount; column++){
        bricks[column] = [];
        for (row = 0; row < brickRowCount; row++){
            bricks[column][row] = {x: 0, y: 0, status: 1};
        }
    }
}

// Adding keyboard event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

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

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;

    if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2){
        paddleX = relativeX - paddleWidth / 2;
    } 
}

function drawBricks(){
    for (var column = 0; column < brickColumnCount; column++){
        for (var row = 0; row < brickRowCount; row++){
            if (bricks[column][row].status == 1){
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
}

// Function to draw the ball
function drawball(){
    // ctx.beginPath();
    // ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "#0095DD";
    // ctx.closePath();
    // ctx.fill();
    // ctx.closePath();
    ctx.drawImage(ball, x, y, ballRadius, ballRadius);
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
            
            if (b.status == 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if (score == brickColumnCount * brickRowCount){
                        if (level == maxLevel){
                            alert("You win. CONGRATULATIONS");
                            document.location.reload();
                        } else {
                            level++;
                            brickRowCount++;
                            initBricks();
                            score = 0;
                            dx += 1;
                            dy = -dy;
                            dy -= 1;
                            x = (canvas.width / 2) + Math.floor(Math.random() * 21) - 10;
                            y = (canvas.height - 30) + Math.floor(Math.random() * 21) - 10;
                            paddleX = (canvas.width - paddleWidth) / 2;
                            paused = true;

                            ctx.beginPath();
                            ctx.rect(0, 0, canvas.width, canvas.height);
                            ctx.fillStyle = "#0095DD";    
                            ctx.fill();
                            ctx.font = "16px Arial";
                            ctx.fillStyle = "#fff";
                            ctx.fillText("Level: " + (level - 1) + " completed, starting next level...", 110, 150)

                            setTimeout(() => {
                                paused = false;
                                draw();
                            }, 3000);
                        }
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawLevel(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Level: " + level, 210, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawball();
    drawPaddle();
    drawScore();
    drawLives();
    drawLevel();
    collisionDetection();

    if (y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            lives--;

            if (lives == 0){
                alert("Game Over");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
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

    if (!paused){
        requestAnimationFrame(draw);
    }
}

// Calls setInterval passing draw function every 10 miliseconds
draw();