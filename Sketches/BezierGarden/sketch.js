var alph;
var palettes = [];
var fl = [] ;
var gr = [];
var weeds;
var grass_palettes = [];


function setup(){
	createCanvas(2700,2700);
	background(0);
	noLoop();
	stroke(0, 100);
	rs = int(random(999, 99999));
	console.log(rs);
	randomSeed(rs);
	noiseSeed(rs);	
	palettes.push([[2,83,147], [104,239,0], [255,185,203], [253,86,220], [1,211,252]]);
	palettes.push([[81,202,9], [201,41,67], [254,112,126], [0,153,135], [2,68,32]]);
	palettes.push([[81,35,36], [217,222,94], [136,130,1], [70,168,168], [168,199,203]]);
	palettes.push([[114,146,161], [117,23,127], [202,61,168], [235,225,218], [128,180,184]]);
	palettes.push([[164,35,34], [235,233,238], [192,60,165], [224,211,239], [52,39,141]]);
	
	grass_palettes.push([[38, 78, 44], [85, 118, 26], [157, 179, 62], [223, 228, 115]]);
	grass_palettes.push([[67,63,27], [144,140,133], [83,84,47], [27,36,10]]);
	grass_palettes.push([[204,169,118], [96,96,30], [180,122,36], [29,79,19], [46,72,22]]);

	weeds = grass_palettes[int(random(grass_palettes.length))];

	alph = 100;
	// Initialize Flowers
	fl.push(new Flower(0, 0, random(50,200), PI/2, 0));
	for(var i=0; i<TWO_PI; i+= TWO_PI/8){
		x1 = cos(i) * (.15*width);
		y1 = sin(i) * (.15*height);

		x2 = cos(i + PI/9) * (.2*width);
		y2 = sin(i + PI/9) * (.2*height);
		
		x3 = cos(i + PI/9) * (.3*width);
		y3 = sin(i + PI/9) * (.3*height);
		
		fl.push(new Flower(x1, y1, random(.05*width, .15*width), PI/2, random(PI)));
		
		fl.push(new Flower(x2, y2, random(.05*width, .15*width), PI/2, random(PI)));
		fl.push(new Flower(x3, y3, random(.1*width, .2*width), PI/2, random(PI)));
	}
	// Initialize Grass
	for(var i=0; i <TWO_PI*2; i+=PI/200){
		var r = int(random(200, width/4*3));
		x = cos(i) * r + width/2;
		y = sin(i) * r + height/2;
		gr.push(new Grass(x, y, i));
	}
}


function draw(){
	background(0);
	for(var i=0; i<gr.length;i++){
		gr[i].display();
	}
		
	for(var i=fl.length-1; i>=0; i--){
		fl[i].draw();
	}
	frame();
}

	
function petal(cx, cy, h, a, r, rep, offset, aNoise, xNoise, yNoise){
	rotate(offset);
	for(var i=0; i < rep; i++){
		beginShape();
		vertex(0,0);
		var x = cos(a*noise(aNoise)) * (r*noise(xNoise, yNoise));
		var y = sin(a*noise(aNoise)) * (r*noise(xNoise, yNoise));
		quadraticVertex(x, y, 0,  h);
		quadraticVertex(-x, y, 0, 0);	
		rotate(TWO_PI/rep);
		endShape();
	}	
}


function Flower(cx, cy, H, angle, off){
	this.cx = cx;
	this.cy = cy;
	this.h = H;
	this.offset = off;
	this.n = int(random(100));
	this.aNoise = random(40);
	this.xNoise = random(40);
	this.yNoise = random(40);
	this.rep = int(random(4,10));
	this.angle = angle;
	this.palette = palettes[int(random(palettes.length))]

	this.draw = function(){
		N = this.n;
		an = this.aNoise;
		xn = this.xNoise;
		yn = this.yNoise;
		off = this.offset;
		translate(width/2 + cx, height/2 + cy);
		rotate(this.offset);
		for(H=this.h; H>20; H-=H*.2){
			fill(this.palette[N%this.palette.length][0], this.palette[N%this.palette.length][1], this.palette[N%this.palette.length][2], alph);
			//rep = int(random(3, 9));
			radius = H/1.2;
			petal(this.cx, this.cy, H, this.angle, radius, this.rep, off, an, xn, yn)
			off+=PI/10;
			N++
			an+=0.01;
			xn+=0.01;
			yn+=0.01;
		}
		this.aNoise += 0.002;
		this.xNoise += 0.002;
		this.yNoise += 0.002;
		resetMatrix();;
	}
}


function Grass(x, y, a){
	this.x = x;
	this.y = y;
	this.n = int(random(6, 10));
	this.r = int(random(.03*width, .1*width));
	this.step = PI/7;
	this.angle = a - (this.n/2) * this.step;

	this.display = function(){
		var start_angle = this.angle;
		for(var i=0; i<this.n; i++){
			fill(weeds[(i+this.n)%weeds.length][0], weeds[(i+this.n)%weeds.length][1], weeds[(i+this.n)%weeds.length][2], 50);
			var x1 = this.x + cos(start_angle + PI/3) * (this.r/2);
			var y1 = this.y + sin(start_angle + PI/3) * (this.r/2);
			
			var x2 = this.x + cos(start_angle - PI/5) * (this.r/3*2);
			var y2 = this.y + sin(start_angle - PI/5) * (this.r/3*2);

			var x3 = this.x + cos(start_angle) * this.r;
			var y3 = this.y + sin(start_angle) * this.r;

			var x5 = this.x + cos(start_angle + PI/4) * (this.r/2);
			var y5 = this.y + sin(start_angle + PI/4) * (this.r/2);
			
			var x4 = this.x + cos(start_angle - PI/3) * (this.r/3*2);
			var y4 = this.y + sin(start_angle - PI/3) * (this.r/3*2);		


			beginShape();
			vertex(this.x, this.y);
			bezierVertex(x1, y1, x2, y2, x3, y3);
			
			bezierVertex(x4, y4, x5, y5, this.x, this.y);
			endShape();
			start_angle+=this.step;
		}
	}
}


function frame(){
	var w = .022*width;
	fill(grass_palettes[1][3][0], grass_palettes[1][3][1], grass_palettes[1][3][2], 200);
	rect(0,0, w, height);
	rect(0,0, width, w);
	rect(width-w, 0, w, height);
	rect(0,height-w, width, w);
	fill(0, 200);
	rect(0,0,w,w);
	rect(width-w,0,w,w);
	rect(0,height-w,w,w);
	rect(width-w,height-w,w,w);
}

