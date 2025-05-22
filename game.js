// Get the canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the player's car
const car = {
  x: canvas.width / 2 - 25, // Initial x position (centered on the track)
  y: canvas.height - 70,   // Initial y position (near the bottom)
  width: 50,
  height: 70,
  color: 'blue',
  speed: 15 // Movement speed
};

// Define the track properties
const track = {
  color: 'grey',
  lineWidth: 10,
  // Position the track lines, e.g., 1/4 and 3/4 of canvas width
  leftLineX: canvas.width / 4,
  rightLineX: (canvas.width / 4) * 3
};

// Function to draw the track and the car
function drawGame() {
  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the track lines
  ctx.strokeStyle = track.color;
  ctx.lineWidth = track.lineWidth;

  // Left track line
  ctx.beginPath();
  ctx.moveTo(track.leftLineX, 0);
  ctx.lineTo(track.leftLineX, canvas.height);
  ctx.stroke();

  // Right track line
  ctx.beginPath();
  ctx.moveTo(track.rightLineX, 0);
  ctx.lineTo(track.rightLineX, canvas.height);
  ctx.stroke();

  // Draw the car rectangle
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Adjust car's initial x position to be centered within the track
car.x = track.leftLineX + (track.rightLineX - track.leftLineX) / 2 - car.width / 2;

// Event listener for keyboard input - This will only update car's state
document.addEventListener('keydown', function(event) {
  let moved = false;
  if (event.key === 'ArrowLeft') {
    car.x -= car.speed;
    moved = true;
  } else if (event.key === 'ArrowRight') {
    car.x += car.speed;
    moved = true;
  }

  if (moved) {
    // Keep the car within track boundaries
    if (car.x < track.leftLineX) {
      car.x = track.leftLineX;
    }
    if (car.x + car.width > track.rightLineX) {
      car.x = track.rightLineX - car.width;
    }
    // No direct drawing call here, gameLoop will handle it
  }
});

// The main game loop
function gameLoop() {
  drawGame(); // Draw the current state of the game
  requestAnimationFrame(gameLoop); // Request the next frame
}

// Start the game loop
gameLoop();
