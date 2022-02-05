var angle, d, c, pal, limit;
var fr = [];
var palettes = [];
var div;

function setup() {
	frameRate(20);
	createCanvas(windowWidth, windowHeight);
	background(0);
	noFill();
	//div = int(random(2,10));
	palettes.push([color(70,205,196), color(199,244,100), color(255,107,107), color(196,77,88)]);
	palettes.push([color(209,242,165), color(239,250,180), color(255,196,140), color(255,159,128), color(245,105,145)]);
	palettes.push([color(250,208,137), color(255,156,91), color(245,99,74), color(237,48,60)]);
	palettes.push([color(207,240,158), color(168,219,168), color(121,189,154), color(59,134,134), color(11,72,107)]);
	palettes.push([color(209,242,165), color(239,250,180), color(255,196,140), color(255,159,128), color(245,105,145)]);
	initialize();
	strokeWeight(2);
	if(width > height){
		limit = width*1.7;
	}else{
		limit = height*1.7;
	}
}


function draw(){
	for(var i = 0; i<fr.length; i++){
		fr[i].display();
	}
	if(fr[0].r > limit){
		initialize();
	}
}

function initialize(){
	background(0);
	var i = 0;
	pal = int(random(palettes.length));
	angle = int(random(100,600));
	d = int(random(2,20));
	c = int(random(6,20));
	div = int(random(2,6));
	fr = [];
	for(var y = height/div; y < height; y+=height/div){
		for(var x = width/div; x < width; x+=width/div){
			fr[i] = new Fract(x, y, angle, d, c, palettes[pal]);
			i++;
		}
	}	
}

function mousePressed(){
	initialize();
}


function Fract(x, y, ang, f, c, pal){
	this.cx = x;
	this.cy = y;
	this.angle = ang;
	this.fig = f;
	this.space = c;
	this.palette = pal;
	this.n = 0;
	this.col = 0;
	this.xx = 0;
	this.yy = 0;
	this.r = 0;
	
	this.display = function(){
		if(this.n % (this.fig*10) == 0){
			this.col ++;
			if(this.col == this.palette.length){
				this.col = 0;
			}
		}
		push();
		translate(this.cx, this.cy);
		beginShape();
		for(var i = 0; i<this.fig; i++){
			var a = radians(this.n * this.angle);
			this.r = this.space * sqrt(this.n);
			this.xx = this.r*cos(a);
			this.yy = this.r*sin(a);
			this.space+=0.01;
			this.n++;
			vertex(this.xx, this.yy);
		}
		if(this.r < width/div){
			alph = 255-map(this.r,0,width/div,0,205);
		}else{
			alph = 40;
		}
		stroke(red(this.palette[this.col]),
			   green(this.palette[this.col]),
			   blue(this.palette[this.col]),alph);
		endShape(CLOSE);
		pop();
	}	
}
