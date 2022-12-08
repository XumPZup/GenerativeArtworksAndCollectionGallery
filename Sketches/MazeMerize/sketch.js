let w = window.innerWidth;
let h = window.innerHeight;
let W, n;
let stepn = 0;
let speed = 5;
let multipliers = [10, 5, 2, 1];

let positions = [[-1, 0],[1, 0], [0, -1], [0, 1]];
let size, from, to;
let rules = [{0: [2, 4, 6], 1: [3, 5, 6], 2:[2, 3], 3:[4, 5]},  // 0
			 {0: [3, 5], 1: [2, 4], 2:[4, 5, 6], 3:[2, 3, 6]},  // 1
			 {0: [1, 3, 5], 1: [0, 3, 5, 6], 2:[1, 4, 5, 6], 3:[0, 4, 5]},  // 2
			 {0: [0, 2, 4, 6], 1: [1, 2, 4], 2:[1, 4, 5, 6], 3:[0, 4, 5]},  // 3
			 {0: [1, 3, 5], 1: [0, 3, 5, 6], 2:[0, 2, 3], 3:[1, 2, 3, 6]},  // 4
			 {0: [0, 2, 4, 6], 1: [1, 2, 4], 2:[0, 2, 3], 3:[1, 2, 3, 6]},  // 5
			 {0: [0, 2, 4], 1: [0, 3, 5], 2:[1, 4, 5], 3:[1, 2, 3]}   // 6
]

let grid = [];
let existing = [];
let drawF = 1;
let looping = true;

document.addEventListener('keydown', listenKey);

function listenKey(e){
	if (e.keyCode == 80){
		if (looping){
			looping = false;
			noLoop();
		}else{
			looping = true;
			loop();
		}
	}
	else if (e.keyCode == 38){
		if (speed < 20){
			speed++;
		}
	}
	else if (e.keyCode == 40){
		if (speed > 1){
			speed --;
		}
	}

}

function setup() {
	w = int(w/100) * 100;
	h = int(h/100) * 100;
	if (w < h){
		W = w;
	}else{
		W = h;
	}
	n = int(W / 100);
	createCanvas(w, h);
	noFill();
	size = n * multipliers[stepn];//round(W * 0.1) //100;

	from = color(random(255), random(255), random(255));
	to = color(random(255), random(255), random(255));
	_background();
	
	strokeWeight(size/W * (W*0.27));
	
	for(var i=0; i<int(height/size); i++){
		grid.push(new Array(int(width/size)).fill(0));
	}

	first_cell = new Cell(int(random(width/size - 1)), int(random(height/size - 1)), int(random(rules.length)));
	
	existing.push(first_cell); 
	grid[first_cell.y][first_cell.x] = first_cell;
	first_cell.display();
}


function draw() {
	if (existing.length){
		for(var i= 0; i<speed; i++){
			next_cell();
		}
	}
	else{
		noLoop();
		if (stepn == multipliers.length-1){
			stepn = 0;
			size = n * multipliers[stepn]; //100;
		}else{
			stepn++;
			size = n * multipliers[stepn];
		}
		setTimeout(reset_grid, 1000);
	}
}


function _background(){
	let c_to = [].concat(to.levels);
	let c_from = [].concat(from.levels);
	c_to[3] = 100;
	c_from[3] = 100;
	let new_to = color(c_to[0],  c_to[1], c_to[2], c_to[3]);
	let new_from = color(c_from[0],  c_from[1], c_from[2], c_from[3]);
	background(0);
	strokeWeight(1);
	for(var i=0; i<height; i++){
		stroke(lerpColor(new_to, new_from, map(i, 0, height, 0, 1)));
		line(0, i, width, i);
	}
}


function reset_grid(){	
	grid = [];
	for(var i=0; i<int(height/size); i++){
		grid.push(new Array(int(width/size)).fill(0));
	}
	if (looping){
		_background();
		strokeWeight(size/W * (W*0.27));
		first_cell = new Cell(int(random(int(width/size - 1))), int(random(int(height/size - 1))), int(random(rules.length)));
		existing.push(first_cell); 
		grid[first_cell.y][first_cell.x] = first_cell;
		first_cell.display();
		loop();
	}
}



function Cell(x, y, s){
	this.x = x;
	this.y = y;
	this.shape = s;
	this.has_empty_neighbors;
	
	this.display = () => {
		let drawF = int(random(2));
		if (drawF){
			draw_shape2(this.x, this.y, this.shape);	
		}
		else{
			draw_shape(this.x, this.y, this.shape);	
		}
		//draw_shape3(this.x, this.y, this.shape);
	}

	this.rule_neighbors = () => {
		this.has_empty_neighbors = 0;
		let low_entropy = [];
		let low_entropy_value = 10;

		for(var i=0; i<positions.length; i++){
			// Check bounds
			let x = this.x + positions[i][0];
			let y = this.y + positions[i][1];
			if( (x < grid[0].length && x >= 0) && (y < grid.length && y >= 0) ){
				this.has_empty_neighbors++;
				// Empty cell
				if ( Object.prototype.toString.call(grid[y][x]) != '[object Object]' ){
					// Vergin cell
					if ( Object.prototype.toString.call(grid[y][x]) == '[object Number]' ){
						grid[y][x] = rules[this.shape][i];
					}
					// Array needs to check intesection
					else if ( Object.prototype.toString.call(grid[y][x]) == '[object Array]' ){
						grid[y][x] = check_intesection(grid[y][x], rules[this.shape][i]);				
					}
					// Check entropy values
					// New lowest entropy
					if (low_entropy_value> grid[y][x].length){
						low_entropy_value = grid[y][x].length;
						low_entropy = [[x, y]];
					}
					// Append same entropy
					else if (low_entropy_value== grid[y][x].length){
						low_entropy.push([x, y]);
					}

				// Existing cell
				}else{
					this.has_empty_neighbors--;
				}
			}
		}
		if (this.has_empty_neighbors > 0){
			return {cells: low_entropy, entropy: low_entropy_value};
		}
	}
}



function check_intesection(arr1, arr2){
	let result = [];
	for (var i=0; i<arr1.length; i++){
		for (var j=0; j<arr2.length; j++){
			if (arr1[i] == arr2[j]){
				result.push(arr1[i]);
			}
		}
	}

	if (result.length == 0){
		//console.log('Error')
		return [6]//arr2;
	}
	return result
}


function next_cell(){
	let low_entropy = []; // array of [x, y] pairs
	let low_entropy_value = 11;
	let to_remove = []; // array containing idxs of cells without empty neighbors
	
	// Grid update and search for lowest entropy cells
	for(var i=0; i<existing.length; i++){
		let cells_entropy = existing[i].rule_neighbors();
		// Check that this cell has empty neighbors
		if (existing[i].has_empty_neighbors == 0){
			to_remove.push(i);
		}
		// Update entropy values
		else if (typeof(cells_entropy) == 'object'){
			// New lowest entropy
			if (low_entropy_value > cells_entropy.entropy){
				low_entropy = cells_entropy.cells;
				low_entropy_value = cells_entropy.entropy;
			}
			// Append with same entropy
			else if (low_entropy_value == cells_entropy.entropy){
				low_entropy.concat(cells_entropy.cells);
			}
		}
	}
	// Remove cells without neighbors
	for (var i=0; i<to_remove.length; i++){
		existing.splice(to_remove[i], 1);
	}
	// Add new cell with lowest entropy
	let xy = low_entropy[int(random(low_entropy.length))] // grid [x, y] index
	
	if (xy == undefined) return;
	
	let x = xy[0];
	let y = xy[1];
	let new_shape = int(random(grid[y][x])) // new cell shape
	let nxt = new Cell(x, y, new_shape);
	existing.push(nxt);
	grid[y][x] = nxt
	grid[y][x].display();
}


function draw_shape(x, y, type){
	x *= size;
	y *= size;
	// -
	stroke(lerpColor(from, to, map(y, 0, height, 0, 1)));
	if (type == 0){
		line(x + size/2, y, x + size/2, y+size);	
	}
	// |
	else if (type == 1){
			draw_shape2(this.x, this.y, this.shape);	
		line(x, y + size/2, x+size, y + size/2);		
	}
	// _
	//  |
	else if (type == 2){
		beginShape();
		vertex(x, y + size/2);
		vertex(x+size/2, y + size/2);
		vertex(x+size/2, y + size);	
		endShape();
	}
	//  _
	// |
	else if (type == 3){
		beginShape();
		vertex(x+size, y + size/2);
		vertex(x+size/2, y + size/2);
		vertex(x+size/2, y + size);	
		endShape();
	}
	// _|
	else if (type == 4){
		beginShape();
		vertex(x+size/2, y);
		vertex(x+size/2, y + size/2);
		vertex(x, y + size/2);		
		endShape();
	}
	// |_
	else if (type == 5){
		beginShape();
		vertex(x+size/2, y);
		vertex(x+size/2, y + size/2);
		vertex(x+size, y + size/2);	
		endShape();
	}
	else if (type == 6){
		noStroke();
		fill(lerpColor(from, to, map(y, 0, height, 0, 1)));
		rect(x, y, size, size);
		noFill();
	}
}




function draw_shape2(x, y, type){
	x *= size;
	y *= size;
	// -
	stroke(lerpColor(from, to, map(y, 0, height, 0, 1)));
	if (type == 0){
		line(x + size/2, y, x + size/2, y+size);	
	}
	// |
	else if (type == 1){
		line(x, y + size/2, x+size, y + size/2);		
	}
	// _
	//  |
	else if (type == 2){
		let center = [x, y + size];
		beginShape();
		for (var i=-HALF_PI; i<=0; i+=PI/20){
			x = center[0] + cos(i) * (size / 2);
			y = center[1] + sin(i) * (size / 2);
			vertex(x, y);
		}
		endShape();
	}
	//  _
	// |
	else if (type == 3){
		let center = [x + size, y + size];
		beginShape();
		for (var i=PI; i<=3*HALF_PI; i+=PI/20){
			x = center[0] + cos(i) * (size / 2);
			y = center[1] + sin(i) * (size / 2);
			vertex(x, y);
		}
		endShape();
	}
	// _|
	else if (type == 4){
		let center = [x, y];
		beginShape();
		for (var i=0; i<=HALF_PI; i+=PI/20){
			x = center[0] + cos(i) * (size / 2);
			y = center[1] + sin(i) * (size / 2);
			vertex(x, y);
		}
		endShape();
	
	}
	// |_
	else if (type == 5){
		let center = [x + size, y];
		beginShape();
		for (var i=HALF_PI; i<=PI; i+=PI/20){
			x = center[0] + cos(i) * (size / 2);
			y = center[1] + sin(i) * (size / 2);
			vertex(x, y);
		}
		endShape();	
	}
	else if (type == 6){
		let center = [x + size/2, y+size / 2];
		noStroke()
		fill(lerpColor(from, to, map(y, 0, height, 0, 1)));
		ellipse(center[0], center[1], size, size);
		noFill();
	}
}



function draw_shape3(x, y, type){
	x *= size;
	y *= size;
	// -
	stroke(lerpColor(from, to, map(y, 0, height, 0, 1)));
	if (type == 0){
		line(x, y + size, x + size, y);	
	}
	// |
	else if (type == 1){
			draw_shape2(this.x, this.y, this.shape);	
		line(x, y, x + size, y + size);		
	}
	// _
	//  |
	else if (type == 2){
		beginShape();
		vertex(x, y);
		vertex(x + size/2, y + size/2);
		vertex(x, y + size);	
		endShape();
	}
	//  _
	// |
	else if (type == 3){
		beginShape();
		vertex(x + size, y);
		vertex(x + size/2, y + size/2);
		vertex(x + size, y + size);	
		endShape();
	}
	// _|
	else if (type == 4){
		beginShape();
		vertex(x, y + size);
		vertex(x + size/2, y + size/2);
		vertex(x + size , y + size);		
		endShape();
	}
	// |_
	else if (type == 5){
		beginShape();
		vertex(x, y);
		vertex(x + size/2, y + size/2);
		vertex(x + size, y);	
		endShape();
	}
	else if (type == 6){
		noStroke();
		fill(lerpColor(from, to, map(y, 0, height, 0, 1)));
		beginShape();
		vertex(x + size/2, y);
		vertex(x, y + size/2);
		vertex(x + size/2, y + size);
		vertex(x + size, y + size/2);	
		endShape();
		noFill();
	}
}
