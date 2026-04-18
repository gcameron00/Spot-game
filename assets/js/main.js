const COLOR_HEX = {
  red:    '#ef4444',
  blue:   '#3b82f6',
  green:  '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  purple: '#a855f7',
  teal:   '#14b8a6',
  pink:   '#ec4899',
};

// Level 1: 5x5 grid
// Layout:
//   R B . . .
//   . . . . .
//   G . . . B
//   . . . . .
//   . . G . R
//
// Solution:
//   Red:   (0,0)→(0,1)→(1,1)→(2,1)→(3,1)→(3,2)→(3,3)→(3,4)→(4,4)
//   Blue:  (1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)
//   Green: (0,2)→(0,3)→(0,4)→(1,4)→(2,4)
const LEVELS = [
  {
    size: 5,
    dots: [
      { id: 'red',   x: 0, y: 0 },
      { id: 'red',   x: 4, y: 4 },
      { id: 'blue',  x: 1, y: 0 },
      { id: 'blue',  x: 4, y: 2 },
      { id: 'green', x: 0, y: 2 },
      { id: 'green', x: 2, y: 4 },
    ],
  },
];

let levelIdx = 0;
let paths = {};
let dragging = null;
let canvas, ctx;

function lvl() { return LEVELS[levelIdx]; }

function cellSize() {
  const padding = 48;
  const available = Math.min(window.innerWidth - padding, window.innerHeight - 180);
  return Math.max(48, Math.floor(available / lvl().size));
}

function loadLevel(idx) {
  levelIdx = idx;
  paths = {};
  for (const id of colorIds()) paths[id] = [];
  document.getElementById('level-label').textContent = `Level ${idx + 1}`;
  document.getElementById('message').textContent = '';
  resizeCanvas();
}

function colorIds() {
  return [...new Set(lvl().dots.map(d => d.id))];
}

function resizeCanvas() {
  const cs = cellSize();
  const n = lvl().size;
  canvas.width = cs * n;
  canvas.height = cs * n;
  render();
}

function render() {
  const cs = cellSize();
  const n = lvl().size;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#3a3a3a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  for (let i = 0; i <= n; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cs + 0.5, 0);
    ctx.lineTo(i * cs + 0.5, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cs + 0.5);
    ctx.lineTo(canvas.width, i * cs + 0.5);
    ctx.stroke();
  }

  // Paths
  for (const [id, path] of Object.entries(paths)) {
    if (path.length < 2) continue;
    ctx.strokeStyle = COLOR_HEX[id];
    ctx.lineWidth = cs * 0.38;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(path[0].x * cs + cs / 2, path[0].y * cs + cs / 2);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x * cs + cs / 2, path[i].y * cs + cs / 2);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Dots (drawn last so they appear on top of paths)
  for (const dot of lvl().dots) {
    const cx = dot.x * cs + cs / 2;
    const cy = dot.y * cs + cs / 2;
    const r = cs * 0.26;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = COLOR_HEX[dot.id];
    ctx.fill();

    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function getCell(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const cs = cellSize();
  const x = Math.floor((clientX - rect.left) / cs);
  const y = Math.floor((clientY - rect.top) / cs);
  const n = lvl().size;
  if (x < 0 || x >= n || y < 0 || y >= n) return null;
  return { x, y };
}

function dotAt(x, y) {
  return lvl().dots.find(d => d.x === x && d.y === y) || null;
}

function occupant(x, y) {
  for (const [id, path] of Object.entries(paths)) {
    if (path.some(p => p.x === x && p.y === y)) return id;
  }
  return null;
}

function isComplete(id) {
  const path = paths[id];
  if (!path || path.length < 2) return false;
  const [a, b] = lvl().dots.filter(d => d.id === id);
  const s = path[0], e = path[path.length - 1];
  return (s.x === a.x && s.y === a.y && e.x === b.x && e.y === b.y) ||
         (s.x === b.x && s.y === b.y && e.x === a.x && e.y === a.y);
}

function handleStart(clientX, clientY) {
  const cell = getCell(clientX, clientY);
  if (!cell) return;
  const dot = dotAt(cell.x, cell.y);
  if (!dot) return;

  paths[dot.id] = [{ x: cell.x, y: cell.y }];
  dragging = dot.id;
  render();
}

function handleMove(clientX, clientY) {
  if (!dragging) return;
  const cell = getCell(clientX, clientY);
  if (!cell) return;

  const path = paths[dragging];
  const last = path[path.length - 1];

  if (cell.x === last.x && cell.y === last.y) return;

  // Only accept single-step cardinal moves
  if (Math.abs(cell.x - last.x) + Math.abs(cell.y - last.y) !== 1) return;

  // Retract if moving back to an already-visited cell
  const existingIdx = path.findIndex(p => p.x === cell.x && p.y === cell.y);
  if (existingIdx !== -1) {
    paths[dragging] = path.slice(0, existingIdx + 1);
    render();
    return;
  }

  // Block movement into another color's path
  const occ = occupant(cell.x, cell.y);
  if (occ && occ !== dragging) return;

  // Block movement onto another color's dot
  const dot = dotAt(cell.x, cell.y);
  if (dot && dot.id !== dragging) return;

  paths[dragging] = [...path, { x: cell.x, y: cell.y }];
  render();

  // Stop when the matching endpoint is reached
  if (dot && dot.id === dragging) {
    const start = paths[dragging][0];
    if (dot.x !== start.x || dot.y !== start.y) {
      dragging = null;
      checkWin();
    }
  }
}

function handleEnd() {
  dragging = null;
}

function checkWin() {
  if (colorIds().every(id => isComplete(id))) {
    document.getElementById('message').textContent = 'Solved!';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');

  canvas.addEventListener('mousedown',  e => handleStart(e.clientX, e.clientY));
  canvas.addEventListener('mousemove',  e => handleMove(e.clientX, e.clientY));
  canvas.addEventListener('mouseup',    handleEnd);
  canvas.addEventListener('mouseleave', handleEnd);

  canvas.addEventListener('touchstart', e => { e.preventDefault(); handleStart(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
  canvas.addEventListener('touchend',   e => { e.preventDefault(); handleEnd(); }, { passive: false });

  window.addEventListener('resize', resizeCanvas);

  loadLevel(0);
});
