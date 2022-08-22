let c1, c2, c3, c4, r, W;
let w = window.innerWidth;
let h = window.innerHeight;
let drips = [];

function setup() {
	if (w < h){
		W = w;
	}else{
		W = h;
	}
	createCanvas(w, h);
	r = W / 10;

	c1 = color(100 + random()*155, 100 + random()*155, 100 + random()*155);
	c2 = color(random()*100, random()*100, random()*100);
	c3 = color(100 + random()*155, 100 + random()*155, 100 + random()*155);
	c4 = color(random()*100, random()*100, random()*100);
	let style = int(random(3));

	if (style == 2){
		double_setup();
	}
	else if (style == 1){
		double_setup_vertical();
	}else{
		quad_setup();
	}
}


function draw(){
	for(var i=0; i<drips.length; i++){
		drips[i].display();
	}
}


function bkg_lerp(col1, col2){
	for(i=0; i<height; i++){
		stroke(lerpColor(col1, col2, map(i, 0, height, 0, 1)));
		line(0, i, width, i);
	}
}


function bkg_lerp_vertical(col1, col2){
	for(i=0; i<width; i++){
		stroke(lerpColor(col1, col2, map(i, 0, width, 0, 1)));
		line(i, 0, i, height);
	}
}



function bkg_lerp4(col1, col2, col3, col4){
	for(var i=0; i<width; i++){
		stroke(lerpColor(col1, col2, map(i, 0, width, 0, 1)));
		line(width/2, height/2, i, 0);	
	}
	
	for(var i=0; i<height; i++){
		stroke(lerpColor(col2, col3, map(i, 0, height, 0, 1)));
		line(width/2, height/2, width, i);	
	}
	
	for(var i=0; i<width; i++){
		stroke(lerpColor(col4, col3, map(i, 0, width, 0, 1)));
		line(width/2, height/2, i, height);	
	}
	
	for(var i=0; i<height; i++){
		stroke(lerpColor(col1, col4, map(i, 0, height, 0, 1)));
		line(width/2, height/2, 0, i);	
	}
}


function circles(){
	strokeWeight(W*0.0018);
	let s = width/6;
	split_circle_lerp(s*2 - r/2, height/2, random()*TWO_PI, c1, c2);
	split_circle_lerp(s*4 + r/2, height/2, random()*TWO_PI, c1, c2);
}


function circles_vertical(){
	strokeWeight(W*0.0018);
	let s = height/6;
	split_circle_lerp(width/2, s*2 - r/2, random()*TWO_PI, c1, c2);
	split_circle_lerp(width/2, s*4 + r/2, random()*TWO_PI, c1, c2);
}


function split_circle_lerp(x, y, a, col1, col2){
	for(var i=0; i<PI; i+=PI/200){
		let c = lerpColor(col1, col2, map(i, 0, PI, 0, 1))
		stroke(c);
		line(x + cos(i+a)*r, y + sin(i+a)*r, x + cos(a-i)*r, y + sin(a-i)*r);
		let rand = round(random() * 8);
		if (rand == 2){
			drips.push(new Drip(x + cos(i+a)*r, y + sin(i+a)*r, [x, y], c));
		}else if (rand == 4){
			drips.push(new Drip(x + cos(a-i)*r, y + sin(a-i)*r, [x, y], c));
		}
	}
}

function circles4(){
	c2 = color(random()*100, random()*100, random()*100);
	strokeWeight(W*0.0018);
	split_circle_lerp(width/2, height/4-r/2, random()*TWO_PI, c1, c2);
	split_circle_lerp(3*width/4+r/2, height/2, random()*TWO_PI, c2, c3);
	split_circle_lerp(width/2, 3*height/4+r/2, random()*TWO_PI, c3, c4);
	split_circle_lerp(width/4-r/2, height/2, random()*TWO_PI, c1, c4);
	let a = random()*TWO_PI;
	let c = [c3, c4, c1, c2, c3];
	for(var i=0; i<4; i++){
		for(var j=0; j<HALF_PI; j+=PI/200){
			let col = lerpColor(c[i], c[i+1], map(j, 0, HALF_PI, 0, 1));
			stroke(col);
			line(width/2, height/2, width/2 + cos(i*HALF_PI + j + a)*r, height/2 + sin(i*HALF_PI + j + a)*r);
			let rand = round(random()*15);
			if (rand == 2){
			drips.push(new Drip(width/2 + cos(i*HALF_PI + j + a)*r, height/2 + sin(i*HALF_PI + j + a)*r, [width/2, height/2], col));
			}
		}
	}
}


function double_setup(){
	bkg_lerp(c1, c2);
	circles();
}


function double_setup_vertical(){
	bkg_lerp_vertical(c1, c2)
	circles_vertical();
}


function quad_setup(){
	bkg_lerp4(c1, c2, c3, c4);
	circles4();
}



function Drip(x, y, center, color){
	this.direction = round(random()*3)
	this.noise_direction = round(random())
	this.x = x
	this.y = y

	this.weight = W/90 + random() * (W/45-W/90);
	this.alpha = 50;
	this.color = color;
	this.color.setAlpha(this.alpha)
	this.n = random()*100;
	this.angle = random()*TWO_PI;
	this.inc = random() / 100;
	this.state = 1;
	this.center = center;
	this.r = r;
	this.step = W*0.0005 + random() * W * .001;


	this.display = () => {
		if(this.state){
			stroke(this.color);
			if(dist(this.x, this.y, this.center[0], this.center[1]) < this.r){
				stroke(this.color.levels[0]-70, this.color.levels[1]-70, this.color.levels[2]-70, this.color.levels[3]-40);
			this.color.setAlpha(this.alpha);
			}else{
				stroke(this.color);
			}
			strokeWeight(this.weight);
			this.n += 0.005;
			if(this.direction == 0 || this.direction == 1){
				var next_y = this.y + (this.direction * -2 + 1)*sin(this.angle)*this.step;
				var next_x = this.x + (this.noise_direction * -2 +1) * noise(this.n)*this.step;
			}else{
				var next_x = this.x + ((this.direction-2) * -2 + 1)*cos(this.angle)*this.step;
				var next_y = this.y + (this.noise_direction * -2 +1) * noise(this.n)*this.step;
			}

			line(this.x, this.y, next_x, next_y);
			this.x = next_x;
			this.y = next_y;


			this.angle += this.inc;
			this.weight *= 0.995;
			this.alpha -= .025;
			this.color.setAlpha(this.alpha);
			if(this.alpha <= 0.2 || this.weight <= 0.2){
				this.state = 0;
			}
		}
	}
}

