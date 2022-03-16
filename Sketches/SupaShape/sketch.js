/*
Some nice values of T are:
	from 1 to 20
	23
	26
	28
	33
	34
	47
	53

	146	
	209
	229
	300
	361
	381
	505
	563
	602
	629
	664
	702
	841
*/
var niceT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
	     19, 20, 23, 26, 28, 33, 47, 53, 146, 209, 229, 300, 361, 381,
	     505, 563, 602, 629, 664, 702, 841]
var s = [];
var T;
var erraticness = 1000

function setup(){
	createCanvas(windowHeight*2, windowHeight);
	strokeWeight(2.5);
	noFill();
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/1.66));
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/2.16));
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/3.6));
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/5.4));
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/10.8));
	s.push(new supaShape(1, 1, 1, 1, 1, 1, windowHeight/21.6));
	for(var i=0; i<s.length; i++){
		s[i].randomize();
		s[i].c = [random(255), random(255), random(255), 50];	
	}
	//T = niceT[int(random(niceT.length))] - random(2);
	T = random(erraticness);
}


function draw(){
	background(0)
	translate(width/2, height/2);	
	for(var i=0; i<s.length-1; i++){
		s[i].connect_to(s[i+1], T);
		s[i].anim();
	}
	s[i].anim();
	T+=0.005
	//textSize(24);
	//stroke(255)
	//text(T, width/2-100, -height/2+20)
}


function supaShape(a, b, m, n1, n2, n3, scale){
	this.a = new lfo(a, a, 1);
	this.b = new lfo(b, b, 1);
	this.m = new lfo(m, m, 1);
	this.n1 = new lfo(n1, n1, 1);
	this.n2 = new lfo(n2, n2, 1);
	this.n3 = new lfo(n3, n3, 1);
	this.detail = 300;
	this.rotation = TWO_PI;
	this.scale = scale;
	this.c = [255, 0, 0, 10]

	this.r = (t) => {
		step1 = abs(cos(this.m.get() * t / 4) / this.a.get());
		step2 = abs(sin(this.m.get() * t / 4) / this.b.get());
		return (step1 ** this.n2.get() + step2 ** this.n3.get()) ** (-1/this.n1.get());
	}
	this.anim = () => {
		this.a.move();
		this.b.move();
		this.m.move();
		this.n1.move();
		this.n2.move();
		this.n3.move();
	}
	this.display = () => {
		strokeWeight(6);
		stroke(this.c[0], this.c[1], this.c[2], this.c[3])
		beginShape();
		for(var i=0; i<this.rotation; i+=PI/this.detail){
			var x = this.scale * this.r(i) * cos(i);
			var y = this.scale * this.r(i) * sin(i);
			vertex(x, y);
		}
		endShape(CLOSE);
		this.anim();
	}

	this.lines = (n) => {
		strokeWeight(2);
		for(var i=0; i<this.rotation; i+=PI/this.detail){
			var r0 = this.r(i);
			var r1 = this.r(i*n);
			var x0 = this.scale * r0 * cos(i);
			var y0 = this.scale * r0 * sin(i);
			var x1 = this.scale * r1 * cos(i*n);
			var y1 = this.scale * r1 * sin(i*n);
			stroke(
				map(r0, 0, max(this.get_max_r()), 0, this.c[0]), 
				this.c[1], 
				map(r1, 0, max(this.get_max_r()), 0, this.c[1]), 
				map(dist(x0, y0, x1, y1), 0, max(this.get_max_r())*this.scale*2, 0, 25));
			line(x0, y0, x1, y1);
		}
	}
	this.connect_to = (other, n) => {
		stroke(this.c[0], this.c[1], this.c[2], 40);
		for(var i=0; i<this.rotation; i+=PI/this.detail){
			var r0 = this.r(i);
			var r1 = other.r(i*n);
			var x0 = this.scale * r0 * cos(i);
			var y0 = this.scale * r0 * sin(i);
			var x1 = this.scale * r1 * cos(i*n);
			var y1 = this.scale * r1 * sin(i*n);
			line(x0, y0, x1, y1);
		}
	}
	this.randomize = () => {
		var a0 = random(.1,5);
		var a1 = random(a0, a0+2);
		var b0 = random(.3, 3);
		var b1 = random(b0, b0+2);
		var m0 = random(.1, 1);
		var m1 = random(m0, m0+50);
		var n1_0 = random(.1, 10);
		var n1_1 = random(n1_0, n1_0+2);
		var n2_0 = random(1, 10);
		var n2_1 = random(n2_0, n2_0+2);
		var n3_0 = random(1, 10);
		var n3_1 = random(n3_0, n3_0+2);
		this.a.reset(a0, a1, a0-a1*500);
		this.b.reset(b0, b1, b0-b1*500);
		this.m.reset(m0, m1, m0-m1*500);
		this.n1.reset(n1_0, n1_1, n1_0-n1_1*500);
		this.n2.reset(n2_0, n2_1, n2_0-n2_1*500);
		this.n3.reset(n3_0, n3_1, n3_0-n3_1*500);
	}
	this.get_max_r = () => {
		var r0 = this.r(0);
		var r1 = this.r(2*PI/this.m.get());
		var r2 = this.r(4*PI/this.m.get());
		var r3 = this.r(6*PI/this.m.get());
		var r4 = this.r(8*PI/this.m.get());
		var r5 = this.r(10*PI/this.m.get());
		return [r0, r1, r2, r3, r4, r5]
	}
}


function lfo(start, stop, steps){
	this.start = start;
	this.position = start;
	this.stop = stop;
	this.increment = abs(this.start - this.stop) / steps;
	this.direction = 1;
	this.move = () => {
		this.position += this.increment * this.direction;
		if(this.position > this.stop || this.position < this.start){
			this.direction *= -1;
		}
		this.get();
	}
	this.get = () => {
		return this.position;
	}
	this.reset = (start, stop, steps) => {
		this.start = start;
		this.position = start;
		this.stop = stop;
		this.increment = abs(this.start - this.stop) / steps;
		this.direction = 1;
	}
}
