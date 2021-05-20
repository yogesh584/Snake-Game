let inputDir = {
    x: 0,
    y: 0
};

// Game constants and Varibles
// let foodSound = new Audio('food.mp3');
// let gameOverSound = new Audio('gameOverSound.mp3');
// let moveSound = new Audio('move.mp3');
// let musicSound = new Audio('music.mp3');
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,
        y: 16
    }
];
let board = document.getElementById("board");
let scoreTag = document.getElementById("score");
let food = {
    x: 8,
    y: 9
}

// Game Functions
function main(ctime) {

    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    // console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    // if you dump into your self
    for(let i= 1;i<snakeArr.length;i++){
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Part : 1 Updating the snake array and food

    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over ! Press ok to play again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

    }
    
    // If you have eaten the food, increment the score and regenrate the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x,y : snakeArr[0].y + inputDir.y});
        console.log(snakeArr);
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())};
        score += 1;
        scoreTag.innerHTML = "Score : " + score;
    }

    // Moving the Snake
    for(let i = (snakeArr.length - 2);i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part : 2 Display the snake and food
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        let SnakeElement = document.createElement('div');
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        board.appendChild(SnakeElement);
        if (index == 0) {
            SnakeElement.classList.add('head');
        }
        else {
            SnakeElement.classList.add('snakeBody');
        }
    });


    // Display the food
    let FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    board.appendChild(FoodElement);
    FoodElement.classList.add('food');

}



// Main LOGIC starts here
window.requestAnimationFrame(main);

// Getting that which key is pressed
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };
    if (e.key == "ArrowUp") {
        // console.log("Arrow up");
        inputDir.x = 0;
        inputDir.y = -1;
    }
    else if (e.key == "ArrowDown") {
        // console.log("Arrow down");
        inputDir.x = 0;
        inputDir.y = 1;
    }
    else if (e.key == "ArrowLeft") {
        // console.log("Arrow Left");
        inputDir.x = -1;
        inputDir.y = 0;
    }
    else if (e.key == "ArrowRight") {
        // console.log("Arrow Right");
        inputDir.x = 1;
        inputDir.y = 0;
    }
});
