var d=[];
var nx, ny, frames, complete;
var flower_count = 1;


function angle_corruption(){
	col =[0,0,0]//[random(100, 180), random(150, 230), 0];
	for (var i=0; i<10; i++){
		////////////////////// TL ////////////////////////////////////////
		var g = new Splinter(0, 0, random(100),random(random(HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		///////////////////// TM //////////////////////////////////////////
		var g = new Splinter(width/3, 0, random(100),random(random(PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		var g = new Splinter(2*width/3, 0, random(100),random(random(PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		//////////////////// TR ///////////////////////////////////////////
		var g = new Splinter(width, 0, random(100),random(random(HALF_PI, PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		/////////////////// RM ////////////////////////////////////////////
		var g = new Splinter(width, height/3, random(100),random(random(HALF_PI, PI + HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		var g = new Splinter(width, 2*height/3, random(100),random(random(HALF_PI, PI + HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		/////////////////// BR ////////////////////////////////////////////
		var g = new Splinter(width, height, random(100),random(random(PI, PI+HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		//////////////////// BM /////////////////////////////////////
		var g = new Splinter(width/3, height, random(100),0, col)//random(random(-PI, 0)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		var g = new Splinter(2*width/3, height, random(100),random(random(-PI, 0)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		/////////////////// BL /////////////////////////////////////
		var g = new Splinter(0, height, random(100),random(random(0, -HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		/////////////////// LM ////////////////////////////////////
		var g = new Splinter(0, height/3, random(100),random(random(-HALF_PI, HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		var g = new Splinter(0, 2*height/3, random(100),random(random(-HALF_PI, HALF_PI)), col);
		g.scale = random(1.5, 2);
		g.alpha = 40;
		g.weight = random(W*0.034, W*0.045);
		g.weight_inc = .99;
		d.push(g);
		
		var inc = random(W*0.0005, W*0.0015);
		var x = random(width);
		var y = random(height);
		var offset = random(TWO_PI);
		var h = random(W/10, W/4);
		var petals = 1;
		d.push(new QuadraticPetal(x, y, offset, h, col, inc));
		d.push(new QuadraticPetal(x, y, offset+PI/3, h, col, inc));
		d.push(new QuadraticPetal(x, y, offset+2*PI/3, h, col, inc));
		d.push(new QuadraticPetal(x, y, offset+3*PI/3, h, col, inc));
		d.push(new QuadraticPetal(x, y, offset+4*PI/3, h, col, inc));
		d.push(new QuadraticPetal(x, y, offset+5*PI/3, h, col, inc));
	}

}



function circular(s){
	d.push(new Composition(width/2, height/2, s));
	for(var i=0; i<TWO_PI; i+=PI/3){
		if (int(random(2)) == 1){
		var x = width/2 + cos(i) * (1.8*s - .4*s*noise(nx));
		var y = height/2 + sin(i) * (1.8*s - .4*s*noise(nx));
		d.push(new Composition(x, y, s));
		nx += 0.01;
		flower_count++;
		}
	}
	for(var i=0; i<TWO_PI; i+=PI/6){
		if (int(random(3)) == 1){
		var x = width/2 + cos(i) * (3.3*s - .2*s*noise(nx));
		var y = height/2 + sin(i) * (3.3*s - .2*s*noise(nx));
		d.push(new Composition(x, y, s));
		nx += 0.01;
		flower_count++;
		}	
	}
}



function setup(){
	if(windowHeight > windowWidth){
		W = windowWidth;
	}else{
		W = windowHeight;
	}
	createCanvas(windowWidth, windowHeight);
	background(random(10, 50));
	noFill();
	nx = random(100);
	ny = random(100);
	frames = 0;
	complete = 0;
	angle_corruption();
	circular(W*.13);
}




function draw(){
	for(var i=0; i<d.length; i++){
		if (d[i].constructor['name'] == 'Splinter' || d[i].constructor['name'] == 'QuadraticPetal'){
			d[i].update();
		}
		else if ( (d[i].grass_state == 1 && d[i].order[1] == 2) || (d[i].petals_state == 1 && d[i].order[1] == 1) ){	
			d[i].time_update();
		}
		else if(frames > 500){
			d[i].time_update();
		}
	}
	frames++;
}


function Composition(x, y, h){
	this.x = x;
	this.y = y;
	this.grass = [];
	this.petals = [];
	this.splinters = [];


	this.white = int(random(7));
	this.grass_state = 1;
	this.petals_state = 1;
	this.splinters_state = 1;
	if(round(random())){
		this.order = [0, 2, 1];
	}
	else{
		this.order = [0, 1, 2];
	}

	// Grass
	for(var j=0; j<TWO_PI; j+=PI/14){
		col =[0,0,0]//[random(100, 180), random(150, 230), 0];
		var g = new Splinter(x, y, random(100), j, col);
		g.scale = 2;
		g.alpha = 10;
		g.weight = random(W*0.0316, W*0.04215);
		this.grass.push(g);
	}
	// Petals
	col = [random(255), random(255), random(255)];
	petals_off = random(TWO_PI);
	inc = random(W*0.0005, W*0.0015);
	for(var i = petals_off; i < TWO_PI+petals_off; i+=PI/3){
		this.petals.push(new QuadraticPetal(this.x, this.y, i, h, col, inc));
	}
	
	// Splinters
	for (var offset=0; offset < PI/6; offset+=0.08){
		if(!this.white){
			col = [255, 255, 255];
		}else{
			col = [random(255), random(255), random(255)];
		}
		for (var i=petals_off; i<TWO_PI+petals_off; i+=PI/3){	
			var s1 = W * 0.11
			var s2 = W * .19 * offset
			var x = cos(i+offset) * (s1-s2) + this.x;
			var y = sin(i+offset) * (s1-s2) + this.y;
			t = new Splinter(x, y, nx, i-offset, col);
			t.sacle = h/200;

			this.splinters.push(t);
			nx+=0.09;
		}
	}

	// Leaves
	if (int(random(2)) == 1){
		col = [random(100, 255), random(150, 230), 0];
		leaves_off = petals_off + PI/6;
		inc = W*0.0007;
		for(var i = leaves_off; i < TWO_PI+leaves_off; i+=PI/3){
			this.petals.push(new QuadraticPetal(this.x, this.y, i, h*1.2, col, inc));
		}
	}

	// noraml: 0 2 1    |    
	this.time_update = () => {
		if(this.grass_state + this.petals_state == this.order[0]){
			this.splinters_state = 0;
			for(var i=0; i<this.splinters.length; i++){
				this.splinters[i].update();
				this.splinters_state += this.splinters[i].state;
			}
			this.splinters_state = Math.floor(
				this.splinters_state / this.splinters.length);
		}
		else if(this.grass_state + this.petals_state == this.order[2]){
			this.petals_state = 0;
			for(var i=0; i<this.petals.length; i++){
				this.petals[i].update();
				this.petals_state += this.petals[i].state;
			}	
			this.petals_state = Math.floor(
				this.petals_state / this.petals.length);
		}
		else if(this.grass_state + this.petals_state == this.order[1]){
			this.grass_state = 0;
			for(var i=0; i<this.grass.length; i++){
				this.grass[i].update();
				this.grass_state += this.grass[i].state;
			}
			this.grass_state = Math.floor(
				this.grass_state / this.grass.length);
		}

	}


	this.basic_update = () => {
		if(!this.state){
			return 0;
		}
		this.state = 0;
		for(var i=0; i<this.petals.length; i++){
			this.petals[i].update();
			this.state += this.petals[i].state;
		}
		for(var i=0; i<this.splinters.length; i++){
			this.splinters[i].update();
			this.state += this.splinters[i].state;
		}
		for(var i=0; i<this.grass.length; i++){
			this.grass[i].update();
			this.state += this.grass[i].state;
		}
	}

}



function Splinter(x, y, n, dir, col){
	this.x = x;
	this.y = y;
	this.noise = n;//random(100);
	this.maxWeight = random(W*0.0159, W*0.0232); // (15 , 22) W=949
	this.weight = this.maxWeight;
	this.alpha = 10;
	this.state = 1;
	this.color = col;
	this.direction = dir;
	this.scale = 1;
	this.xplus = W*0.0022; // ~ 2  W = 949
	this.yplus = W*0.0008; // ~ .7  W = 949
	this.weight_inc = .98;

	this.update = () => {
		if(!this.state){
			return 0;
		}
		this.weight *= this.weight_inc;
		this.alpha -= .02;
		strokeWeight(this.weight);
		stroke(this.color[0], this.color[1], this.color[2], this.alpha);
		if (this.alpha < 2 || this.weight < .2){
			this.state = 0;
		}
		var x_inc = cos(this.direction) * noise(this.noise)*this.xplus;
		var y_inc = sin(this.direction)*this.yplus;
		line(this.x, this.y, this.x + x_inc, this.y+y_inc);
		this.y += y_inc*this.scale;
		this.x += x_inc*this.scale;
		if (this.x > width){
			this.x = 0;
		}
		else if (this.x < 0){
			this.x = width;
		}
		else if (this.y > height){
			this.y = 0;
		}
		else if (this.y < 0){
			this.y = height;
		}


		this.noise += 0.01;
	}
}



function QuadraticPetal(x, y, a, h, col, inc){
	this.x = x;
	this.y = y;
	this.angle = a;
	this.h = h;
	this.x0 = this.x + cos(this.angle) * this.h;
	this.y0 = this.y + sin(this.angle) * this.h;
	this.w = 0;
	this.alpha = 20;
	this.state = 1;
	this.color = col;
	this.inc = inc;


	this.update = () => {
		if (!this.state){
			return 0;
		}
		this.alpha -= 0.2;
		strokeWeight(W*0.00211);
		stroke(this.color[0], this.color[1], this.color[2], this.alpha);
		if (this.alpha < 2){
			this.state = 0;
		}
		// PetalPoint Calculations
		var xm = this.x + cos(this.angle) * (this.h * .2);
		var ym = this.y + sin(this.angle) * (this.h * .2);
		var xDisp = cos(this.angle-HALF_PI) * this.w;
		var yDisp = sin(this.angle-HALF_PI) * this.w;
		
		var xR = xm + xDisp;
		var yR = ym + yDisp;
		var xL = xm - xDisp;
		var yL = ym - yDisp;
		
		///////////////////////////////
		
		beginShape();
		vertex(this.x, this.y);
		quadraticVertex(xR, yR, this.x0, this.y0);

		quadraticVertex(xL, yL, this.x, this.y);
		endShape();
		this.w += this.inc//this.h/200;
	}
}
