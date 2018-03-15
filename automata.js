class Cell {
	constructor(x, y, alive, rgb) {
		this.x = x;
		this.y = y;
		this.alive = alive;
		this.age = 0;
		this.R = rgb[0];
		this.G = rgb[1];
		this.B = rgb[2];
		this.color = color(this.R, this.G, this.B);
	}
}

var grid; 
var cols; 
var rows;
var cellSize = 5;
var generation = 0;
var population = 0;
function setup() {
	frameRate(60);
	createCanvas(screen.width/2, screen.height/2);
	cols = width / cellSize;
	rows = height / cellSize;
	grid = initArray(cols, rows);
	populate(grid);
}

function initArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function populate(grid) {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let alive = floor(random(2));
			if (alive) {population += 1;}
			grid[i][j] = new Cell(i, j, alive, [0, 255, 0]);
		}
	}
}

function countAdjacent(grid, x, y) {
	let sum = 0;
	for (let i=-1; i<2; i++) {
		for (let j = -1; j < 2; j++) {
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += grid[col][row].alive;
		}
	}
	sum -= grid[x][y].alive
	return sum;
}

function draw() {
	background(25);
	for (var i=0; i < cols; i++) {
		for (let j = 0; j < rows; j++){
			let x = i * cellSize;
			let y = j * cellSize;
			let cell = grid[i][j];
			if (cell.alive == 1) {
				fill(cell.color);
				stroke(25);
				rect(x, y, cellSize - 1, cellSize - 1);
			}
		}
	}

	let next = initArray(cols, rows);
	for (let i=0; i < cols; i++) {
		for (let j =0; j < rows; j++) {
			var currCell = grid[i][j];
			let alive = currCell.alive;
			let numAdjacent = countAdjacent(grid, i, j);
			if (alive == 0 && numAdjacent == 3) {
				next[i][j] = new Cell(i, j, 1, [0, 255, 0]);
				population += 1;
			} else if (alive == 1 && (numAdjacent < 2 || numAdjacent > 3)) {
				next[i][j] = new Cell(i, j, 0, [0, 255, 0]);
				population -= 1;
			} else {
				if (currCell.R < 255) {
					next[i][j] = new Cell(currCell.x, currCell.y, currCell.alive, 
						[currCell.R + 1, currCell.G, currCell.B]);
				} else {
					next[i][j] = new Cell(currCell.x, currCell.y, currCell.alive, 
						[currCell.R, currCell.G - 1, currCell.B]);
				}
			}
		}
	}
	grid = next;
	generation += 1;
	var genTicker = document.getElementById("genTicker");
	var popTicker = document.getElementById("popTicker")
	genTicker.innerHTML = "Generation: " + generation;
	popTicker.innerHTML = "Population: " + population;
}