// Configure the JavaScript for Drawing Context

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