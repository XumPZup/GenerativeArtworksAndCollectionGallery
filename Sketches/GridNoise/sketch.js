var palette, jump, n, p;
var W = 900 *3;
var H = 900 *3;
var alph = 70;
var points = [];
var factors = [];
var noises = [];
var spacing = 2 		*3;
var grid_size = 100 	*3;
var	off = 80 			*3;
var random_range = 80 	*3;


var palettes = [[[165, 241, 246], [208, 250, 249], [232, 255, 255],
			    [255, 255, 243], [255, 244, 223]],

			   [[107, 167, 160], [106, 245, 208],
			    [87, 100, 146], [47, 65, 73]],

			   [[103,40,40], [159,41,41], [240,112,112],
			    [34,122,98], [31,51,54]],

			   [[17, 34, 54], [67, 98, 128], [163, 186, 210],
			    [219, 228, 237], [255,255,255]],

			   [[194, 178, 165], [163, 193, 180], [122, 139, 101],
			    [66, 79, 53], [34, 49, 47]],

			   [[6, 4, 1], [63, 147, 132], [241, 244, 250],
			    [250, 215, 104], [227, 105, 0]]];


function setup() {
	createCanvas(W, H);
	background(0);
	jump = round((W + 2 * off) / grid_size);	
	setValues();
}


function draw() {
	background(0);
	FR();
	noStroke();
	display();
}


function display(){
	for(var i=0; i<points.length-jump-1; i++){
		if((i+1)%jump != 0){
			fill(palette[(i+n)%palette.length][0], palette[(i+n)%palette.length][1],palette[(i+n)%palette.length][2], alph);
			beginShape();
		
			vertex(points[i][0] + (factors[i][0]*noise(noises[i][0])) + spacing, 
				   points[i][1] + (factors[i][1]*noise(noises[i][1])) + spacing);
			noises[i][0] += 0.005;
			noises[i][1] += 0.005;

			vertex(points[i+1][0] + (factors[i+1][0]*noise(noises[i+1][0])) - spacing, 
				   points[i+1][1] + (factors[i+1][1]*noise(noises[i+1][1])) + spacing);
			noises[i+1][0] += 0.005;
			noises[i+1][1] += 0.005;
			
			vertex(points[i+12][0] + (factors[i+12][0]*noise(noises[i+12][0])) - spacing, 
				   points[i+12][1] + (factors[i+12][1]*noise(noises[i+12][1])) - spacing);
			noises[i+12][0] += 0.005;
			noises[i+12][1] += 0.005;

			vertex(points[i+11][0] + (factors[i+11][0]*noise(noises[i+11][0])) + spacing, 
				   points[i+11][1] + (factors[i+11][1]*noise(noises[i+11][1])) - spacing);
			noises[i+11][0] += 0.005;
			noises[i+11][1] += 0.005;
			
			endShape(CLOSE);
		}else{
			n = int(i/3);
		}
	}
}


function FR(){
	d = 40
	noFill();
	beginShape();
	stroke(190);
	strokeWeight(d*2);
	vertex(d, d);
	vertex(d, height-d);
	vertex(width-d, height-d);
	vertex(width-d, d);
	endShape(CLOSE);
}


function setValues(){
	points = [];
	factors = [];
	for(var y=-off; y<height + off; y+=grid_size){
		for(var x=-off; x<width+off; x+=grid_size){
			factors.push([random(-random_range,random_range), random(-random_range, random_range)]);
			noises.push([random(40), random(40)]);
			points.push([x, y]);
		}
	}			
	n = int(random(10));
	palette = palettes[int(random(palettes.length))];(
	alph = int(random(50,120)))
}


function mouseClicked() {
  setValues();
  draw();
}