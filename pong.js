const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let leftPaddle = {
    x: 0,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    dx: 4,
    dy: 4
};

let leftScore = 0;
let rightScore = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'w') {
        leftPaddle.dy = -6;
    } else if (e.key === 's') {
        leftPaddle.dy = 6;
    }
}

function keyUpHandler(e) {
    if (e.key === 'w' || e.key === 's') {
        leftPaddle.dy = 0;
    }
}

function drawPaddle(paddle) {
    context.fillStyle = 'black';
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

function drawScore() {
    context.font = '32px Arial';
    context.fillStyle = 'black';
    context.fillText(leftScore, canvas.width / 4, 50);
    context.fillText(rightScore, 3 * canvas.width / 4, 50);
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;
    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && 
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > rightPaddle.x && 
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x - ball.radius < 0) {
        rightScore += 1;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        leftScore += 1;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    drawScore();

    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
    moveBall();

    requestAnimationFrame(draw);
}

function moveBotPaddle() {
    if (rightPaddle.y + rightPaddle.height / 2 < ball.y) {
        rightPaddle.dy = 4;
    } else if (rightPaddle.y + rightPaddle.height / 2 > ball.y) {
        rightPaddle.dy = -4;
    } else {
        rightPaddle.dy = 0;
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    drawScore();

    movePaddle(leftPaddle);
    movePaddle(rightPaddle);
    moveBall();
    moveBotPaddle(); 
    requestAnimationFrame(draw);
}

draw();

