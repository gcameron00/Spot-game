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

Dots:
- Red:    (0,0) and (3,1)
- Blue:   (2,1) and (4,2)
- Green:  (0,3) and (4,3)
- Yellow: (0,4) and (4,4)

Solution (fills all 25 cells):
- Red:    (0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(3,1)  [7 cells]
- Blue:   (2,1)→(1,1)→(0,1)→(0,2)→(1,2)→(2,2)→(3,2)→(4,2)  [8 cells]
- Green:  (4,3)→(3,3)→(2,3)→(1,3)→(0,3)  [5 cells]
- Yellow: (0,4)→(1,4)→(2,4)→(3,4)→(4,4)  [5 cells]

Total: 7+8+5+5 = 25 ✓

## Planned levels 2–10

| Level | Grid | Colours | Shape        | Notes                         |
|-------|------|---------|--------------|-------------------------------|
| 2     | 5×5  | 4       | Square       | Harder routing than level 1   |
| 3     | 6×6  | 4       | Square       | Larger grid                   |
| 4     | 6×6  | 5       | Square       |                               |
| 5     | 6×6  | 5       | With holes   | First non-rectangular layout  |
| 6     | 7×7  | 5       | Square       |                               |
| 7     | 7×7  | 6       | With holes   |                               |
| 8     | 8×8  | 6       | Square       |                               |
| 9     | 8×8  | 7       | With holes   |                               |
| 10    | 9×9  | 8       | Square       | Hardest                       |
