const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let foodEaten = 0;

function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: 0, y: 0 };
    foodEaten = 0;
    generateFood();
    document.getElementById("game-over").style.display = "none";
    gameLoop();
}

// Generate food at random position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Draw the snake on the canvas
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Update the snake's position
function updateSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        foodEaten++;
        if (foodEaten === 10) {
            document.getElementById("game-over").style.display = "block";
            return;
        }
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        document.getElementById("game-over").style.display = "block";
        return;
    }

    // Check for collisions with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            document.getElementById("game-over").style.display = "block";
            return;
        }
    }
}

// Handle keyboard input to change direction
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (e.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
});

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateSnake();

    setTimeout(gameLoop, 100);  // Keep game running at regular intervals
}

// Start the game initially
gameLoop();

// Reset button functionality
document.getElementById("resetButton").addEventListener("click", resetGame);
