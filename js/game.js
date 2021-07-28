let newGame = document.getElementById('reset');
let csv = document.getElementById('game');
let ctx = csv.getContext('2d');
csv.width = 608;
csv.height = 608;
let box = 32;
let score = 0;
const foodImg = new Image;
foodImg.src = 'img/apple.png';
const ground = new Image;
ground.src = 'img/field.png';

let easy = document.getElementById('easy');
let normal = document.getElementById('normal');
let hard = document.getElementById('hard');


document.addEventListener('keydown', someMethod)

let food = {
    x: Math.floor((Math.random()*17+1)) * box,
    y: Math.floor((Math.random()*15+3)) * box
};
let game;
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

let dir;

function someMethod(event) {
    if (event.keyCode === 37 && dir !== 'right') {
        dir = 'left';
    } else if (event.keyCode === 38 && dir !== 'down') {
        dir = 'up';
    } else if (event.keyCode === 39 && dir !== 'left') {
        dir = 'right';
    } else if (event.keyCode === 40 && dir !== 'up') {
        dir = 'down';
    }
}

function eatTail (head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game);
            newGame.disabled = false;
        }
    }
}

function draw () {
    ctx.clearRect(0, 0, 609, 609);
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'purple': 'gold';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.6);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        newGame.disabled = false;
    }

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random()*17+1)) * box,
            y: Math.floor((Math.random()*15+3)) * box
        };
    } else {snake.pop()}

    if (dir === 'right') {snakeX += box}
    if (dir === 'left') {snakeX -= box}
    if (dir === 'up') {snakeY -= box}
    if (dir === 'down') {snakeY += box}

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

easy.addEventListener('click', function() {
     game = setInterval(draw, 150);
     easy.disabled = true;
     normal.disabled = true;
     hard.disabled = true;

});
normal.addEventListener('click', function() {
     game = setInterval(draw, 100);
     easy.disabled = true;
     normal.disabled = true;
     hard.disabled = true;
});
hard.addEventListener('click', function() {
     game = setInterval(draw, 75);
     easy.disabled = true;
     normal.disabled = true;
     hard.disabled = true;
});

newGame.disabled = true;

newGame.addEventListener('click', function() {
    window.location.reload();
})
