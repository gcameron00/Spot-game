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

// Level 1: 5×5 — 4 colours, fills all 25 cells
// Layout:  R . . . .  /  . . B R .  /  . . . . B  /  G . . . G  /  Y . . . Y
// Solution:
//   Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(3,1)
//   Blue:   (2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)→(4,2)
//   Green:  (4,3)→(3,3)→(2,3)→(1,3)→(0,3)
//   Yellow: (0,4)→(1,4)→(2,4)→(3,4)→(4,4)

// Level 2: 5×5 — harder routing, fills all 25 cells
// Layout:  . . R B .  /  . G . . .  /  . Y . . .  /  . . . G .  /  R . Y B .
// Solution:
//   Red:    (0,4)→(0,3)→(0,2)→(0,1)→(0,0)→(1,0)→(2,0)
//   Blue:   (3,0)→(4,0)→(4,1)→(4,2)→(4,3)→(4,4)→(3,4)
//   Green:  (1,1)→(2,1)→(3,1)→(3,2)→(3,3)
//   Yellow: (1,2)→(2,2)→(2,3)→(1,3)→(1,4)→(2,4)

// Level 3: 6×6 — larger grid, fills all 36 cells
// Layout:  . . . . . R  /  . . . . . G  /  . . . . G B  /  R Y . . . .  /  Y . . . . .  /  B . . . . .
// Solution:
//   Red:    (5,0)→(4,0)→(3,0)→(2,0)→(1,0)→(0,0)→(0,1)→(0,2)→(0,3)
//   Blue:   (0,5)→(1,5)→(2,5)→(3,5)→(4,5)→(5,5)→(5,4)→(5,3)→(5,2)
//   Green:  (5,1)→(4,1)→(3,1)→(2,1)→(1,1)→(1,2)→(2,2)→(3,2)→(4,2)
//   Yellow: (1,3)→(2,3)→(3,3)→(4,3)→(4,4)→(3,4)→(2,4)→(1,4)→(0,4)

// Level 4: 6×6 L-shape — top-right 3×3 removed (27 valid cells)
// Holes: x≥3 and y≤2
// Layout (X=hole):  . . R X X X  /  . . . X X X  /  . B R X X X  /  . . . . B G  /  G . . . . .  /  Y . . . . Y
// Solution:
//   Red:    (2,0)→(1,0)→(0,0)→(0,1)→(1,1)→(2,1)→(2,2)
//   Blue:   (1,2)→(0,2)→(0,3)→(1,3)→(2,3)→(3,3)→(4,3)
//   Green:  (5,3)→(5,4)→(4,4)→(3,4)→(2,4)→(1,4)→(0,4)
//   Yellow: (0,5)→(1,5)→(2,5)→(3,5)→(4,5)→(5,5)

// Level 5: 6×6 — 2×2 hole in centre (32 valid cells)
// Holes: (2,2)(3,2)(2,3)(3,3)
// Layout:  R . . . . .  /  . . . . . .  /  . B X X B R  /  . G X X . .  /  . . . G Y .  /  . . Y . . .
// Solution:
//   Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(5,0)→(5,1)→(5,2)
//   Blue:   (4,2)→(4,1)→(3,1)→(2,1)→(1,1)→(0,1)→(0,2)→(1,2)
//   Green:  (1,3)→(0,3)→(0,4)→(0,5)→(1,5)→(1,4)→(2,4)→(3,4)
//   Yellow: (4,4)→(4,3)→(5,3)→(5,4)→(5,5)→(4,5)→(3,5)→(2,5)

// Level 6: 7×7 — 2×2 hole in centre (45 valid cells)
// Holes: (3,3)(4,3)(3,4)(4,4)
// Layout:  R . . . B . .  /  . . . . . . .  /  . . . R . . .  /  G . . X X B .  /  . . . X X . .  /  . Y . . . Y .  /  . . . G . . .
// Solution:
//   Red:    (0,0)→(1,0)→(2,0)→(3,0)→(3,1)→(2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)
//   Blue:   (4,0)→(5,0)→(6,0)→(6,1)→(5,1)→(4,1)→(4,2)→(5,2)→(6,2)→(6,3)→(5,3)
//   Green:  (0,3)→(1,3)→(2,3)→(2,4)→(1,4)→(0,4)→(0,5)→(0,6)→(1,6)→(2,6)→(3,6)
//   Yellow: (1,5)→(2,5)→(3,5)→(4,5)→(4,6)→(5,6)→(6,6)→(6,5)→(6,4)→(5,4)→(5,5)

// Level 7: 7×7 square — 5 colours, fills all 49 cells
// Solution (snake, split at segment boundaries):
//   Red:    (0,0)→…→(6,0)→(6,1)→(5,1)→(4,1)  [10]
//   Blue:   (3,1)→(2,1)→(1,1)→(0,1)→(0,2)→…→(5,2)  [10]
//   Orange: (6,2)→(6,3)→(5,3)→(4,3)→(3,3)→(2,3)→(1,3)→(0,3)→(0,4)  [9]
//   Green:  (1,4)→(2,4)→…→(6,4)→(6,5)→(5,5)→(4,5)→(3,5)  [10]
//   Yellow: (2,5)→(1,5)→(0,5)→(0,6)→(1,6)→…→(6,6)  [10]

// Level 8: 8×8 square — 5 colours, fills all 64 cells
// Solution (snake):
//   Red:    (0,0)→…→(8,0)→(7,1)→…→(3,1)  [13]  (note: 8×8 uses indices 0–7)
//   Blue:   (2,1)→(1,1)→(0,1)→(0,2)→…→(7,2)→(7,3)→(6,3)  [13]
//   Orange: (5,3)→(4,3)→(3,3)→(2,3)→(1,3)→(0,3)→(0,4)→…→(6,4)  [13]
//   Green:  (7,4)→(7,5)→(6,5)→…→(0,5)→(0,6)→(1,6)→…→(3,6)  [13]
//   Yellow: (4,6)→(5,6)→(6,6)→(7,6)→(7,7)→(6,7)→…→(0,7)  [12]

// Level 9: 8×8 L-shape — top-right 3×4 removed (52 valid cells), 5 colours
// Holes: x≥5, y≤3
// Solution:
//   Red:    (0,0)→…→(4,0)→(4,1)→…→(0,1)→(0,2)  [11]
//   Blue:   (1,2)→…→(4,2)→(4,3)→…→(0,3)→(0,4)→(1,4)  [11]
//   Orange: (2,4)→…→(7,4)→(7,5)→…→(4,5)  [10]
//   Green:  (3,5)→(2,5)→(1,5)→(0,5)→(0,6)→…→(5,6)  [10]
//   Yellow: (6,6)→(7,6)→(7,7)→(6,7)→…→(0,7)  [10]

// Level 10: 9×9 square — 5 colours, fills all 81 cells (hardest)
// Solution (snake, 17+17+17+15+15 split):
//   Red:    (0,0)→…→(8,0)→(8,1)→…→(1,1)  [17]
//   Blue:   (0,1)→(0,2)→…→(8,2)→(8,3)→…→(2,3)  [17]
//   Orange: (1,3)→(0,3)→(0,4)→…→(8,4)→(8,5)→…→(3,5)  [17]
//   Green:  (2,5)→(1,5)→(0,5)→(0,6)→…→(8,6)→(8,7)→…→(6,7)  [15]
//   Yellow: (5,7)→(4,7)→…→(0,7)→(0,8)→…→(8,8)  [15]

const LEVELS = [
  {
    size: 5,
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 3, y: 1 },
      { id: 'blue',   x: 2, y: 1 },
      { id: 'blue',   x: 4, y: 2 },
      { id: 'green',  x: 4, y: 3 },
      { id: 'green',  x: 0, y: 3 },
      { id: 'yellow', x: 0, y: 4 },
      { id: 'yellow', x: 4, y: 4 },
    ],
  },
  {
    size: 5,
    dots: [
      { id: 'red',    x: 2, y: 0 },
      { id: 'red',    x: 0, y: 4 },
      { id: 'blue',   x: 3, y: 0 },
      { id: 'blue',   x: 3, y: 4 },
      { id: 'green',  x: 1, y: 1 },
      { id: 'green',  x: 3, y: 3 },
      { id: 'yellow', x: 1, y: 2 },
      { id: 'yellow', x: 2, y: 4 },
    ],
  },
  {
    size: 6,
    dots: [
      { id: 'red',    x: 5, y: 0 },
      { id: 'red',    x: 0, y: 3 },
      { id: 'blue',   x: 0, y: 5 },
      { id: 'blue',   x: 5, y: 2 },
      { id: 'green',  x: 5, y: 1 },
      { id: 'green',  x: 4, y: 2 },
      { id: 'yellow', x: 1, y: 3 },
      { id: 'yellow', x: 0, y: 4 },
    ],
  },
  // Level 4 — 6×6 L-shape
  {
    size: 6,
    holes: [
      {x:3,y:0},{x:4,y:0},{x:5,y:0},
      {x:3,y:1},{x:4,y:1},{x:5,y:1},
      {x:3,y:2},{x:4,y:2},{x:5,y:2},
    ],
    dots: [
      { id: 'red',    x: 2, y: 0 },
      { id: 'red',    x: 2, y: 2 },
      { id: 'blue',   x: 1, y: 2 },
      { id: 'blue',   x: 4, y: 3 },
      { id: 'green',  x: 5, y: 3 },
      { id: 'green',  x: 0, y: 4 },
      { id: 'yellow', x: 0, y: 5 },
      { id: 'yellow', x: 5, y: 5 },
    ],
  },
  // Level 5 — 6×6 with 2×2 centre hole
  {
    size: 6,
    holes: [
      {x:2,y:2},{x:3,y:2},
      {x:2,y:3},{x:3,y:3},
    ],
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 5, y: 2 },
      { id: 'blue',   x: 4, y: 2 },
      { id: 'blue',   x: 1, y: 2 },
      { id: 'green',  x: 1, y: 3 },
      { id: 'green',  x: 3, y: 4 },
      { id: 'yellow', x: 4, y: 4 },
      { id: 'yellow', x: 2, y: 5 },
    ],
  },
  // Level 6 — 7×7 with 2×2 centre hole
  {
    size: 7,
    holes: [
      {x:3,y:3},{x:4,y:3},
      {x:3,y:4},{x:4,y:4},
    ],
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 3, y: 2 },
      { id: 'blue',   x: 4, y: 0 },
      { id: 'blue',   x: 5, y: 3 },
      { id: 'green',  x: 0, y: 3 },
      { id: 'green',  x: 3, y: 6 },
      { id: 'yellow', x: 1, y: 5 },
      { id: 'yellow', x: 5, y: 5 },
    ],
  },
  // Level 7 — 7×7 square, 5 colours
  {
    size: 7,
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 4, y: 1 },
      { id: 'blue',   x: 3, y: 1 },
      { id: 'blue',   x: 5, y: 2 },
      { id: 'orange', x: 6, y: 2 },
      { id: 'orange', x: 0, y: 4 },
      { id: 'green',  x: 1, y: 4 },
      { id: 'green',  x: 3, y: 5 },
      { id: 'yellow', x: 2, y: 5 },
      { id: 'yellow', x: 6, y: 6 },
    ],
  },
  // Level 8 — 8×8 square, 5 colours
  {
    size: 8,
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 3, y: 1 },
      { id: 'blue',   x: 2, y: 1 },
      { id: 'blue',   x: 6, y: 3 },
      { id: 'orange', x: 5, y: 3 },
      { id: 'orange', x: 6, y: 4 },
      { id: 'green',  x: 7, y: 4 },
      { id: 'green',  x: 3, y: 6 },
      { id: 'yellow', x: 4, y: 6 },
      { id: 'yellow', x: 0, y: 7 },
    ],
  },
  // Level 9 — 8×8 L-shape, top-right 3×4 cut (52 cells), 5 colours
  {
    size: 8,
    holes: [
      {x:5,y:0},{x:6,y:0},{x:7,y:0},
      {x:5,y:1},{x:6,y:1},{x:7,y:1},
      {x:5,y:2},{x:6,y:2},{x:7,y:2},
      {x:5,y:3},{x:6,y:3},{x:7,y:3},
    ],
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 0, y: 2 },
      { id: 'blue',   x: 1, y: 2 },
      { id: 'blue',   x: 1, y: 4 },
      { id: 'orange', x: 2, y: 4 },
      { id: 'orange', x: 4, y: 5 },
      { id: 'green',  x: 3, y: 5 },
      { id: 'green',  x: 5, y: 6 },
      { id: 'yellow', x: 6, y: 6 },
      { id: 'yellow', x: 0, y: 7 },
    ],
  },
  // Level 10 — 9×9 square, 5 colours (hardest)
  {
    size: 9,
    dots: [
      { id: 'red',    x: 0, y: 0 },
      { id: 'red',    x: 1, y: 1 },
      { id: 'blue',   x: 0, y: 1 },
      { id: 'blue',   x: 2, y: 3 },
      { id: 'orange', x: 1, y: 3 },
      { id: 'orange', x: 3, y: 5 },
      { id: 'green',  x: 2, y: 5 },
      { id: 'green',  x: 6, y: 7 },
      { id: 'yellow', x: 5, y: 7 },
      { id: 'yellow', x: 8, y: 8 },
    ],
  },
];

let levelIdx = 0;
let paths = {};
let dragging = null;
let canvas, ctx;

// --- Progress ---
function getHighestSolved() {
  const v = localStorage.getItem('spotHighestSolved');
  return v === null ? -1 : parseInt(v, 10);
}

function markSolved(idx) {
  if (idx > getHighestSolved()) localStorage.setItem('spotHighestSolved', String(idx));
}

// --- Level picker ---
function buildPicker() {
  const picker = document.getElementById('level-picker');
  const highest = getHighestSolved();
  picker.innerHTML = '';
  LEVELS.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    if (i === levelIdx) {
      btn.classList.add('unlocked', 'current');
    } else if (i <= highest + 1) {
      btn.classList.add('unlocked');
      btn.addEventListener('click', () => { closePicker(); loadLevel(i); });
    }
    picker.appendChild(btn);
  });
}

function openPicker()  { buildPicker(); document.getElementById('level-picker').classList.add('open'); }
function closePicker() { document.getElementById('level-picker').classList.remove('open'); }
function togglePicker() {
  document.getElementById('level-picker').classList.contains('open') ? closePicker() : openPicker();
}

function lvl() { return LEVELS[levelIdx]; }

function gridW(level) { return level.width  || level.size; }
function gridH(level) { return level.height || level.size; }

// A cell is valid (playable) unless listed in level.holes
function isValidCell(x, y) {
  const level = lvl();
  if (x < 0 || x >= gridW(level) || y < 0 || y >= gridH(level)) return false;
  if (!level.holes) return true;
  return !level.holes.some(h => h.x === x && h.y === y);
}

// Total number of playable cells in the level
function totalCells() {
  const level = lvl();
  const all = gridW(level) * gridH(level);
  return all - (level.holes ? level.holes.length : 0);
}

function cellSize() {
  const padding = 48;
  const level = lvl();
  const maxDim = Math.max(gridW(level), gridH(level));
  const available = Math.min(window.innerWidth - padding, window.innerHeight - 180);
  return Math.max(48, Math.floor(available / maxDim));
}

function loadLevel(idx) {
  levelIdx = idx;
  paths = {};
  dragging = null;
  for (const id of colorIds()) paths[id] = [];
  closePicker();
  document.getElementById('level-label').textContent = `Level ${idx + 1}`;
  document.getElementById('message').textContent = '';
  resizeCanvas();
}

function colorIds() {
  return [...new Set(lvl().dots.map(d => d.id))];
}

function resizeCanvas() {
  const cs = cellSize();
  canvas.width  = cs * gridW(lvl());
  canvas.height = cs * gridH(lvl());
  render();
}

function render() {
  const cs = cellSize();
  const gw = gridW(lvl());
  const gh = gridH(lvl());

  // Dark page colour shows through holes
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw valid cells in board colour
  ctx.fillStyle = '#3a3a3a';
  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      if (isValidCell(x, y)) ctx.fillRect(x * cs, y * cs, cs, cs);
    }
  }

  // Grid lines on valid cells only
  ctx.strokeStyle = '#505050';
  ctx.lineWidth = 1;
  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      if (!isValidCell(x, y)) continue;
      ctx.strokeRect(x * cs + 0.5, y * cs + 0.5, cs - 1, cs - 1);
    }
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
  if (!isValidCell(x, y)) return null;
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
  if (!colorIds().every(id => isComplete(id))) return;
  const covered = Object.values(paths).reduce((n, p) => n + p.length, 0);
  if (covered !== totalCells()) return;

  const isNewLevel = levelIdx > getHighestSolved();
  markSolved(levelIdx);
  document.getElementById('message').textContent = 'Solved!';

  // Only auto-advance when clearing a level for the first time
  if (isNewLevel) {
    const next = levelIdx + 1;
    if (next < LEVELS.length) setTimeout(() => loadLevel(next), 1200);
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

  // Level picker toggle
  document.getElementById('level-label').addEventListener('click', togglePicker);
  document.addEventListener('click', e => {
    if (!document.getElementById('level-wrap').contains(e.target)) closePicker();
  });

  // Resume at first unsolved level (or last if all done)
  const highest = getHighestSolved();
  const start = Math.min(highest + 1, LEVELS.length - 1);
  loadLevel(Math.max(start, 0));
});
