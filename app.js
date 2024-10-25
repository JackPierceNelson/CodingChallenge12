// Task 2: Configure the JavaScript for Drawing Context
// Task 3: Implement Shape Drawing Logic
// Task 4: Add Color Selection and Canvas Clearing

// Get canvas element and 2D drawing context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set initial drawing state
let isDrawing = false;
let currentTool = 'line';
let currentColor = '#000000';
let startX, startY;

// Configure canvas size
function resizeCanvas() {
   canvas.width = window.innerWidth - 20;
   canvas.height = window.innerHeight - 100;
}

// Initialize canvas
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event listeners for tool selection and color change
document.querySelectorAll('input[name="drawingTool"]').forEach(radio => {
   radio.addEventListener('change', (e) => {
       currentTool = e.target.value;
   });
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
   currentColor = e.target.value;
});

document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

// Drawing functions
function startDrawing(e) {
   isDrawing = true;
   [startX, startY] = [e.offsetX, e.offsetY];
}

function draw(e) {
   if (!isDrawing) return;

   // Clear the canvas to redraw the shape dynamically
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   ctx.strokeStyle = currentColor;
   ctx.fillStyle = currentColor;
   ctx.lineWidth = 2;

   switch (currentTool) {
       case 'line':
           drawLine(e.offsetX, e.offsetY);
           break;
       case 'rectangle':
           drawRectangle(e.offsetX, e.offsetY);
           break;
       case 'circle':
           drawCircle(e.offsetX, e.offsetY);
           break;
   }
}

function stopDrawing() {
   isDrawing = false;
   ctx.beginPath();
}

function drawLine(x, y) {
   ctx.beginPath();
   ctx.moveTo(startX, startY);
   ctx.lineTo(x, y);
   ctx.stroke();
   [startX, startY] = [x, y];
}

function drawRectangle(x, y) {
   const width = x - startX;
   const height = y - startY;

   ctx.beginPath();
   ctx.rect(startX, startY, width, height);
   ctx.stroke();
}

function drawCircle(x, y) {
   const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
   ctx.beginPath();
   ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
   ctx.stroke();
}

function clearCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}
