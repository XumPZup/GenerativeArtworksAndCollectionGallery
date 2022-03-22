var curves = [];
var groups = [];
var frameColor1, frameColor2;
var nGroups;

function setup(){
	noLoop();
	if(windowHeight < windowWidth){
		var W = windowHeight;
	}else{
		var W = windowWidth;
	}
	nGroups = parseInt(random() * 4 + 2);
	frameColor = random() * 100 + 50;
	createCanvas(W, W);
	stroke(0);
	strokeWeight(width/290);
	for(var i=1; i<=nGroups; i++){
		g = new Group(width/(nGroups+4) * i); 
		g.reps = int(random() * 18 + 3);
		g.createCurves()
		groups.push(g);
	}
	rndG = int(random(nGroups));
	rndC = int(random(groups[rndG].curves.length));
	frameColor1 = groups[rndG].curves[rndC].c;
	rndG = int(random(nGroups));
	rndC = int(random(groups[rndG].curves.length));
	frameColor2 = groups[rndG].curves[rndC].c;
}

function draw(){
	background(0);
	for(var i=0; i <groups.length; i++){
		groups[i].display();
	}
	frame();
}

function Curve(){
	this.p0;
	this.p1;
	this.p2;
	this.p3;
	this.p4;
	this.p5;
	this.reps = 4;
	this.c = [random()*255, random()*255, random()*255];
	this.display = (scale) => {
		var A = TWO_PI / this.reps;
		fill(this.c[0], this.c[1], this.c[2]);
		for(var i=0; i<TWO_PI; i+=A){
			beginShape();
			this.p0.getCords(i, scale);
			this.p1.getCords(i, scale);
			this.p2.getCords(i, scale);
			this.p3.getCords(i, scale);
			this.p4.getCords(i, scale);
			this.p5.getCords(i, scale);
			vertex(this.p0.x, this.p0.y);
			bezierVertex(this.p1.x, this.p1.y, this.p2.x, this.p2.y,
					this.p3.x, this.p3.y);
			bezierVertex(this.p4.x, this.p4.y, this.p5.x, this.p5.y,
					this.p0.x, this.p0.y);
			endShape();
		}
		
	}
	this.setupPoints = (start, stop) => {
		var r0 = start;
		var step = (start - stop) / 4;
		var A = TWO_PI/ 3;
		for(var i=0; i<4; i++){
			var r = random() * (step);
			switch (i){
				case 0:
					this.p0 = new paramPoint(r0, random() * A);
				case 1:
					this.p1 = new paramPoint(r0, random() * (A+this.p0.a) + this.p0.a);
				case 2:
					this.p2 = new paramPoint(r0, random() *  (A+this.p1.a) + this.p1.a);
				case 3:
					this.p3 = new paramPoint(r0, random() *  (A+this.p2.a) + this.p2.a);

			}
			r0 -= r;
			this.p4 = new paramPoint(this.p2.r+width/15, this.p2.a);
			this.p5 = new paramPoint(this.p1.r+width/15, this.p1.a);
		}
	}
}


function Group(r){
	this.r = r;
	this.curves = [];
	this.reps = 4;
	this.scale = 1;
	this.display = () => {
		var A = TWO_PI / this.reps;
		for(var k=0; k<=this.reps; k++){
			var x = width/2 + cos(A*k) * this.r;
			var y = height/2 + sin(A*k) * this.r;
			translate(x, y);
			for(var i=0; i<this.curves.length; i++){
				this.curves[i].display(this.scale);
			}
			resetMatrix();
		}
	}
	this.createCurves = () => {
		var distances = [];
		for (var i=0; i<3+random()*2; i++){
			var start = random()  * width/2;
			var stop = start - (random() * (width/20) + width/48);
			var c = new Curve();
			c.reps = int(8 * random() + 3);
			c.setupPoints(start, stop);
			this.curves.push(c);
			if (i > 0){
				this.curves[i].p0 = this.curves[i-1].p3;
			}
			distances.push(this.curves[i].p0.r);
		}
		var size = 2 * max(distances);
		this.scale = (width / (nGroups+2)) / size;
	}
}


function paramPoint(r, a){
	this.r = r;
	this.a = a;
	this.getCords = (offset, scale) => {
		this.x = cos(this.a + offset) * r * scale;
		this.y = sin(this.a + offset) * r * scale;	
	}
}


function frame() {
	fill(frameColor1[0], frameColor1[1], frameColor1[2], 150);
	var w = width/40
	var m = 2
	rect(0, 0, w, height);
	rect(0, 0, width, w);
	rect(0, height-w, width, w);
	rect(width-w, 0, w, height);
	fill(frameColor2[0], frameColor2[1], frameColor2[2], 100);
	strokeWeight(width/400);
	for(var i=0; i<width; i+=w*m){
		beginShape();
		vertex(0, i);
		vertex(w/2, i + w*m);
		vertex(w, i + w*m);
		vertex(w/2, i);
		endShape();
		beginShape();
		vertex(w/2, i);
		vertex(0, i + w*m);
		vertex(w/2, i + w*m);
		vertex(w, i);
		endShape();

		beginShape();
		vertex(i, 0);
		vertex(i + w*m, w/2);
		vertex(i + w*m, w);
		vertex(i, w/2);
		endShape();
		beginShape();
		vertex(i, w/2);
		vertex(i + w*m, 0);
		vertex(i + w*m, w/2);
		vertex(i, w);
		endShape();
		
		beginShape();
		vertex(width, i);
		vertex(width-w/2, i + w*m);
		vertex(width-w, i + w*m);
		vertex(width-w/2, i);
		endShape();
		beginShape();
		vertex(width-w/2, i);
		vertex(width, i + w*m);
		vertex(width-w/2, i + w*m);
		vertex(width-w, i);
		endShape();

		beginShape();
		vertex(i, height);
		vertex(i + w*m, height-w/2);
		vertex(i + w*m, height-w);
		vertex(i, height-w/2);
		endShape();
		beginShape();
		vertex(i, height-w/2);
		vertex(i + w*m, height);
		vertex(i + w*m, height-w/2);
		vertex(i, height-w);
		endShape();
	}
}
