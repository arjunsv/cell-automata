# cell-automata

A quick Javascript Implementation of Game of Life, a cellular automaton formulated by Mathematician John Conway in 1970. 


## Conway's Rules
1. A live cell with few than two live neighbors dies (underpopulation)
2. A live cell with two or three neighbors lives to the next generation (self renewal)
3. A cell with with more than three live neighbors dies (overpopulation)
4. A dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Visuals

Cells that persist from one generation to another (Rule 2) will be colored by a gradient from green (youngest), to yellow, to red (oldest).

## Installation
1. Download or clone the repository
2. Run npm install http-server to run on localhost
3. View with localhost in browser