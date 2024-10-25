// Task 2: Configure the JavaScript for Drawing Context

// Get canvas element and 2D drawing context
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext("2d");

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

// initialize canvas
resizeCanvas();
window.addEventListener(resizeCanvas);

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event Listeners for tool selection and color change
document.querySelectorForAll('input[name="drawingTool"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentTool = e.target.value;
    });
});

document.getElementById('colorPicker').addEventListener('change', (e) => {
    currentColor = e.target.value;
});

document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

// Task 3: Implement Shape Drawing Logic

// Drawing Funtions
function startDrawing(e) {
    isDrawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;

    // Clear the canvas to redraw the shape dynamically
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = 2;

    switch (currentTool) {
        case 'line':
            drawLine(e.offsetX, e.offsetY);
            break;
        case 'circle':
            drawCircle(e.offsetX, e.offsetY);
            break;
    }
}
