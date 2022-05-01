var W;
var circle_dirps = [];
var black_dirps = [];
var in_view = [];
var palette_size;
var black_state = 1;
var frames = 0;
var appearence;

function setup(){
	palette_size = int(random(3, 6));
	if(windowHeight > windowWidth){
		W = windowWidth;
	}else{
		W = windowHeight;
	}
	createCanvas(windowWidth, windowHeight);
	background(random(10, 200));
	for(var i=0; i< 800; i++){
		d = new Drip();
		d.r = 0;
		d.color = [0, 0, 0];
		black_dirps.push(d);
		in_view.push(d);
	}
	appearence = int(random(100, 500));
}


function draw(){
	for(var i=0; i<in_view.length; i++){
		in_view[i].display();
		black_state+=in_view[i].state;
	}
	frames++;
	if(frames == appearence){
		in_view.push(new Circle(width/2, height/2, int(random(W/20, W/10))));
	}else{
		black_state = 0;
	}
}


function Drip(){
	this.direction = round(random(3))
	this.noise_direction = round(random())
	if(this.direction == 0 || this.direction == 1){
		this.x = random(width);
		this.y = this.direction * height;
	}

	else if(this.direction == 2 || this.direction == 3){
		this.y = random(height);
		this.x = (this.direction-2) * width;
	}
	else{
		this.x = random(width);
		this.y = random(height);
		this.direction = round(random(3));
	}

	this.weight = random(W/90, W/45);
	this.alpha = 50;
	this.color = [random(255), random(255), random(255)];
	this.n = random(100);
	this.angle = random(TWO_PI);
	this.inc = random() / 100;
	this.state = 1;
	this.center;
	this.r;
	this.step = W*0.0005 + random() * W * .001;
	this.detction = 1;


	this.display = () => {
		if(this.state){
			stroke(this.color[0], this.color[1], this.color[2], this.alpha);
			if(this.r != 0){
				if(dist(this.x, this.y, this.center[0], this.center[1]) < this.r){
					stroke(this.color[0]-70, this.color[1]-70, this.color[2]-70, this.alpha-40);
				}else{
					stroke(this.color[0], this.color[1], this.color[2], this.alpha);
				}
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


			if(this.detction && (this.x <= 0 || this.x >= width || this.y >= height || this.y <= 0)){
				if(this.noise_direction){
					this.noise_direction = 0;
				}else{
					this.noise_direction = 1;
				}
			}
			this.angle += this.inc;
			this.weight *= 0.995;
			this.alpha -= .025;
			if(this.alpha <= 0.2 || this.weight <= 0.2){
				this.state = 0;
			}
		}
	}
}



function Circle(x, y, r){
	this.r = r;
	this.drips = []
	this.center = [x, y];
	this.last_state = 1;
	this.direction = round(random(3));
	this.palette = []
	for(var i=0; i < palette_size; i++){
		this.palette.push([random(255), random(255), random(255)]);
	}

	for(var i=0; i < int(this.r/W*4000); i++){
		this.drips.push(new Drip());
		a = map(i, 0, TWO_PI, 0, this.r);
		this.drips[i].x = this.center[0]  + cos(a) * this.r; 
		this.drips[i].y = this.center[1]  + sin(a) * this.r;
		this.drips[i].center = this.center;
		this.drips[i].r = this.r;
		this.drips[i].direction = this.direction;
		this.drips[i].color = this.palette[i%palette_size];
		this.drips[i].detction = 0;
	}
	this.display = () => {
		if (!this.last_state){
			return 0;
		}
		this.last_state = 0;
		for(var i=0; i<this.drips.length; i++){
			this.drips[i].display();
			this.last_state += this.drips[i].state;
		}
	}
}
