# Level design

## The core constraint

Two pairs of coloured dots can be connected without crossing if and only if their four endpoints are **not interleaved** around the grid perimeter. Interleaved means the pattern A…B…A…B going clockwise — this is topologically impossible to solve.

The safe pattern is **nested**: A…A…B…B, or A…B…B…A, or A…B…B…A (one pair's arc fully contains the other's). Think of it like matching brackets — `(())` is valid, `()()` is valid, `)(` is not.

This applies to all pairs in a level simultaneously. For three colours, you need a nesting like `R[B[G]G]B` or `R[B]B[G]G` etc.

## Checking a level

1. List all dot positions that sit on the grid perimeter.
2. Read them in clockwise order, noting the colour at each.
3. Verify the sequence is a valid bracket nesting — no two pairs interleave.
4. Manually trace at least one complete solution to confirm it works.

Dots placed in the **interior** of the grid (not on the perimeter) are harder to check with this rule alone. When placing interior dots, trace a solution manually to confirm.

## Level rotation

Rotating a level 90°, 180°, or 270° produces a different-looking puzzle with the same difficulty. Mirroring (horizontal or vertical flip) also works. This gives up to 8 variants from a single layout.

To rotate a level with grid size `n`, transform each dot coordinate:

| Rotation | x′         | y′         |
|----------|------------|------------|
| 90° CW   | (n-1) - y  | x          |
| 180°     | (n-1) - x  | (n-1) - y  |
| 90° CCW  | y          | (n-1) - x  |

## Current levels

### Level 1 — 5×5, 3 colours

```
R B . . .
. . . . .
G . . . B
. . . . .
. . G . R
```

Dots:
- Red: (0,0) and (4,4)
- Blue: (1,0) and (4,2)
- Green: (0,2) and (2,4)

One solution:
- Red:   (0,0)→(0,1)→(1,1)→(2,1)→(3,1)→(3,2)→(3,3)→(3,4)→(4,4)
- Blue:  (1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)
- Green: (0,2)→(0,3)→(0,4)→(1,4)→(2,4)

## Planned levels 2–10

| Level | Grid | Colours | Notes                        |
|-------|------|---------|------------------------------|
| 2     | 5×5  | 4       | Add a fourth colour          |
| 3     | 6×6  | 4       | Larger grid                  |
| 4     | 6×6  | 5       |                              |
| 5     | 7×7  | 5       |                              |
| 6     | 7×7  | 6       |                              |
| 7     | 8×8  | 6       |                              |
| 8     | 8×8  | 7       |                              |
| 9     | 9×9  | 7       |                              |
| 10    | 9×9  | 8       | Hardest                      |
