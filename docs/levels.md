# Level design

## Win condition

All pairs must be connected **and** every playable cell must be covered by a path. Levels with holes or non-rectangular shapes only require the playable cells to be filled.

## The core constraint

Two pairs of coloured dots can be connected without crossing if and only if their four endpoints are **not interleaved** around the grid perimeter. Interleaved means the pattern A…B…A…B going clockwise — this is topologically impossible to solve.

The safe pattern is **nested**: A…A…B…B, or A…B…B…A (one pair's arc fully contains the other's). Think of it like matching brackets — `(())` is valid, `()()` is valid, `)(` is not.

This applies to all pairs in a level simultaneously. For three colours, you need a nesting like `R[B[G]G]B` or `R[B]B[G]G` etc.

## Designing a fill-all level

The most reliable method is to work backwards from a solution:

1. Pick a grid size and number of colours.
2. Sketch paths that together cover every cell (no cell left empty, no cell visited twice).
3. The start and end of each path become that colour's two dots.
4. Verify the dot positions don't interleave around the perimeter (or trace the paths to confirm they don't cross).

For a single-colour path partitioning, a useful starting point is a Hamiltonian path (a snake or spiral that visits every cell once), then split it into segments — the cut points become adjacent dots of different colours.

## Checking a level

1. List all dot positions that sit on the grid perimeter.
2. Read them in clockwise order, noting the colour at each.
3. Verify the sequence is a valid bracket nesting — no two pairs interleave.
4. Manually trace at least one complete solution filling every cell.

Dots placed in the **interior** of the grid (not on the perimeter) are harder to check with the bracket rule. When placing interior dots, always trace a full solution manually.

## Grid shapes

Levels can use:
- **Square grids** — `size: n` in the level data (e.g. 5×5, 6×6)
- **Rectangular grids** — `width` and `height` properties
- **Grids with holes** — `holes: [{x, y}, …]` lists cells to punch out; those cells are impassable and don't count toward the fill requirement

Holes and irregular shapes increase the routing challenge without needing a larger grid. Keep level 1 as a plain square; introduce shaped grids from level 4 or 5 onward.

## Level rotation

Rotating a level 90°, 180°, or 270° produces a visually different puzzle with identical difficulty. Mirroring works too. This gives up to 8 variants from one layout.

To rotate a level with grid size `n`, transform each dot coordinate:

| Rotation | x′         | y′         |
|----------|------------|------------|
| 90° CW   | (n-1) − y  | x          |
| 180°     | (n-1) − x  | (n-1) − y  |
| 90° CCW  | y          | (n-1) − x  |

For rectangular grids, swap `n` for `width` or `height` as appropriate and swap `width`/`height` in the level data after a 90° turn.

## Current levels

### Level 1 — 5×5, 4 colours

```
R  .  .  .  .
.  .  B  R  .
.  .  .  .  B
G  .  .  .  G
Y  .  .  .  Y
```

Dots: Red (0,0)/(3,1) · Blue (2,1)/(4,2) · Green (0,3)/(4,3) · Yellow (0,4)/(4,4)

Solution (fills all 25 cells):
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(3,1)  [7]
- Blue:   (2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)→(4,2)  [8]
- Green:  (4,3)→(3,3)→(2,3)→(1,3)→(0,3)  [5]
- Yellow: (0,4)→(1,4)→(2,4)→(3,4)→(4,4)  [5]

---

### Level 2 — 5×5, 4 colours (harder routing)

```
.  .  R  B  .
.  G  .  .  .
.  Y  .  .  .
.  .  .  G  .
R  .  Y  B  .
```

Dots: Red (2,0)/(0,4) · Blue (3,0)/(3,4) · Green (1,1)/(3,3) · Yellow (1,2)/(2,4)

Solution (fills all 25 cells):
- Red:    (0,4)→(0,3)→(0,2)→(0,1)→(0,0)→(1,0)→(2,0)  [7]
- Blue:   (3,0)→(4,0)→(4,1)→(4,2)→(4,3)→(4,4)→(3,4)  [7]
- Green:  (1,1)→(2,1)→(3,1)→(3,2)→(3,3)  [5]
- Yellow: (1,2)→(2,2)→(2,3)→(1,3)→(1,4)→(2,4)  [6]

Key challenge: Red must travel up the entire left column before turning right; Blue must loop around the right column — neither follows the obvious short route.

---

### Level 3 — 6×6, 4 colours (larger grid)

```
.  .  .  .  .  R
.  .  .  .  .  G
.  .  .  .  G  B
R  Y  .  .  .  .
Y  .  .  .  .  .
B  .  .  .  .  .
```

Dots: Red (5,0)/(0,3) · Blue (0,5)/(5,2) · Green (5,1)/(4,2) · Yellow (1,3)/(0,4)

Solution (fills all 36 cells):
- Red:    (5,0)→(4,0)→(3,0)→(2,0)→(1,0)→(0,0)→(0,1)→(0,2)→(0,3)  [9]
- Blue:   (0,5)→(1,5)→(2,5)→(3,5)→(4,5)→(5,5)→(5,4)→(5,3)→(5,2)  [9]
- Green:  (5,1)→(4,1)→(3,1)→(2,1)→(1,1)→(1,2)→(2,2)→(3,2)→(4,2)  [9]
- Yellow: (1,3)→(2,3)→(3,3)→(4,3)→(4,4)→(3,4)→(2,4)→(1,4)→(0,4)  [9]

---

---

### Level 4 — 6×6 L-shape (top-right 3×3 removed, 27 cells)

```
.  .  R  ░  ░  ░
.  .  .  ░  ░  ░
.  B  R  ░  ░  ░
.  .  .  .  B  G
G  .  .  .  .  .
Y  .  .  .  .  Y
```

Holes: x≥3 and y≤2 (9 cells)  
Dots: Red (2,0)/(2,2) · Blue (1,2)/(4,3) · Green (5,3)/(0,4) · Yellow (0,5)/(5,5)

Solution:
- Red:    (2,0)→(1,0)→(0,0)→(0,1)→(1,1)→(2,1)→(2,2)  [7]
- Blue:   (1,2)→(0,2)→(0,3)→(1,3)→(2,3)→(3,3)→(4,3)  [7]
- Green:  (5,3)→(5,4)→(4,4)→(3,4)→(2,4)→(1,4)→(0,4)  [7]
- Yellow: (0,5)→(1,5)→(2,5)→(3,5)→(4,5)→(5,5)  [6]

---

### Level 5 — 6×6 with 2×2 centre hole (32 cells)

```
R  .  .  .  .  .
.  .  .  .  .  .
.  B  ░  ░  B  R
.  G  ░  ░  .  .
.  .  .  G  Y  .
.  .  Y  .  .  .
```

Holes: (2,2)(3,2)(2,3)(3,3)  
Dots: Red (0,0)/(5,2) · Blue (1,2)/(4,2) · Green (1,3)/(3,4) · Yellow (4,4)/(2,5)

Solution:
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(5,0)→(5,1)→(5,2)  [8]
- Blue:   (4,2)→(4,1)→(3,1)→(2,1)→(1,1)→(0,1)→(0,2)→(1,2)  [8]
- Green:  (1,3)→(0,3)→(0,4)→(0,5)→(1,5)→(1,4)→(2,4)→(3,4)  [8]
- Yellow: (4,4)→(4,3)→(5,3)→(5,4)→(5,5)→(4,5)→(3,5)→(2,5)  [8]

---

### Level 6 — 7×7 with 2×2 centre hole (45 cells)

```
R  .  .  .  B  .  .
.  .  .  .  .  .  .
.  .  .  R  .  .  .
G  .  .  ░  ░  B  .
.  .  .  ░  ░  .  .
.  Y  .  .  .  Y  .
.  .  .  G  .  .  .
```

Holes: (3,3)(4,3)(3,4)(4,4)  
Dots: Red (0,0)/(3,2) · Blue (4,0)/(5,3) · Green (0,3)/(3,6) · Yellow (1,5)/(5,5)

Solution:
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(3,1)→(2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)  [12]
- Blue:   (4,0)→(5,0)→(6,0)→(6,1)→(5,1)→(4,1)→(4,2)→(5,2)→(6,2)→(6,3)→(5,3)  [11]
- Green:  (0,3)→(1,3)→(2,3)→(2,4)→(1,4)→(0,4)→(0,5)→(0,6)→(1,6)→(2,6)→(3,6)  [11]
- Yellow: (1,5)→(2,5)→(3,5)→(4,5)→(4,6)→(5,6)→(6,6)→(6,5)→(6,4)→(5,4)→(5,5)  [11]

---

### Level 7 — 7×7, 5 colours (introduces orange)

```
R  .  .  .  .  .  .
.  .  .  B  R  .  .
.  .  .  .  .  B  O
.  .  .  .  .  .  .
O  G  .  .  .  .  .
.  .  Y  G  .  .  .
.  .  .  .  .  .  Y
```

Dots: Red (0,0)/(4,1) · Blue (3,1)/(5,2) · Orange (6,2)/(0,4) · Green (1,4)/(3,5) · Yellow (2,5)/(6,6)

Solution (fills all 49 cells):
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(5,0)→(6,0)→(6,1)→(5,1)→(4,1)  [10]
- Blue:   (3,1)→(2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)→(4,2)→(5,2)  [10]
- Orange: (6,2)→(6,3)→(5,3)→(4,3)→(3,3)→(2,3)→(1,3)→(0,3)→(0,4)  [9]
- Green:  (1,4)→(2,4)→(3,4)→(4,4)→(5,4)→(6,4)→(6,5)→(5,5)→(4,5)→(3,5)  [10]
- Yellow: (2,5)→(1,5)→(0,5)→(0,6)→(1,6)→(2,6)→(3,6)→(4,6)→(5,6)→(6,6)  [10]

---

### Level 8 — 8×8, 5 colours

```
R  .  .  .  .  .  .  .
.  .  B  R  .  .  .  .
.  .  .  .  .  .  .  .
.  .  .  .  .  O  B  .
.  .  .  .  .  .  O  G
.  .  .  .  .  .  .  .
.  .  .  Y  G  .  .  .
Y  .  .  .  .  .  .  .
```

Dots: Red (0,0)/(3,1) · Blue (2,1)/(6,3) · Orange (5,3)/(6,4) · Green (7,4)/(3,6) · Yellow (4,6)/(0,7)

Solution (fills all 64 cells):
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(5,0)→(6,0)→(7,0)→(7,1)→(6,1)→(5,1)→(4,1)→(3,1)  [13]
- Blue:   (2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)→(4,2)→(5,2)→(6,2)→(7,2)→(7,3)→(6,3)  [13]
- Orange: (5,3)→(4,3)→(3,3)→(2,3)→(1,3)→(0,3)→(0,4)→(1,4)→(2,4)→(3,4)→(4,4)→(5,4)→(6,4)  [13]
- Green:  (7,4)→(7,5)→(6,5)→(5,5)→(4,5)→(3,5)→(2,5)→(1,5)→(0,5)→(0,6)→(1,6)→(2,6)→(3,6)  [13]
- Yellow: (4,6)→(5,6)→(6,6)→(7,6)→(7,7)→(6,7)→(5,7)→(4,7)→(3,7)→(2,7)→(1,7)→(0,7)  [12]

---

### Level 9 — 8×8 L-shape, top-right 3×4 removed (52 cells)

```
R  .  .  .  .  ░  ░  ░
.  .  .  .  .  ░  ░  ░
R  B  .  .  .  ░  ░  ░
.  .  .  .  .  ░  ░  ░
.  B  O  .  .  .  .  .
.  .  .  G  O  .  .  .
.  .  .  .  .  Y  G  .
Y  .  .  .  .  .  .  .
```

Holes: x≥5, y≤3 (12 cells)  
Dots: Red (0,0)/(0,2) · Blue (1,2)/(1,4) · Orange (2,4)/(4,5) · Green (3,5)/(5,6) · Yellow (6,6)/(0,7)

Solution (fills all 52 cells):
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(3,1)→(2,1)→(1,1)→(0,1)→(0,2)  [11]
- Blue:   (1,2)→(2,2)→(3,2)→(4,2)→(4,3)→(3,3)→(2,3)→(1,3)→(0,3)→(0,4)→(1,4)  [11]
- Orange: (2,4)→(3,4)→(4,4)→(5,4)→(6,4)→(7,4)→(7,5)→(6,5)→(5,5)→(4,5)  [10]
- Green:  (3,5)→(2,5)→(1,5)→(0,5)→(0,6)→(1,6)→(2,6)→(3,6)→(4,6)→(5,6)  [10]
- Yellow: (6,6)→(7,6)→(7,7)→(6,7)→(5,7)→(4,7)→(3,7)→(2,7)→(1,7)→(0,7)  [10]

---

### Level 10 — 9×9, 5 colours (hardest)

```
R  .  .  .  .  .  .  .  .
B  R  .  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .
.  O  B  .  .  .  .  .  .
.  .  .  .  .  .  .  .  .
.  .  G  O  .  .  .  .  .
.  .  .  .  .  .  .  .  .
.  .  .  .  .  Y  G  .  .
.  .  .  .  .  .  .  .  Y
```

Dots: Red (0,0)/(1,1) · Blue (0,1)/(2,3) · Orange (1,3)/(3,5) · Green (2,5)/(6,7) · Yellow (5,7)/(8,8)

Solution (fills all 81 cells — paths follow the snake, each making a long detour):
- Red:    (0,0)→(1,0)→…→(8,0)→(8,1)→(7,1)→…→(1,1)  [17]
- Blue:   (0,1)→(0,2)→(1,2)→…→(8,2)→(8,3)→(7,3)→…→(2,3)  [17]
- Orange: (1,3)→(0,3)→(0,4)→(1,4)→…→(8,4)→(8,5)→(7,5)→…→(3,5)  [17]
- Green:  (2,5)→(1,5)→(0,5)→(0,6)→(1,6)→…→(8,6)→(8,7)→(7,7)→(6,7)  [15]
- Yellow: (5,7)→(4,7)→(3,7)→(2,7)→(1,7)→(0,7)→(0,8)→(1,8)→…→(8,8)  [15]
