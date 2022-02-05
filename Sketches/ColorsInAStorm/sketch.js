let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  rect(0,0,width,height);
  fill(0);
  ellipse(width/2, height/2, width*0.7,height*0.7);
  noFill();
  for(var i=0; i<5; i++){
    rotators.push(new Rotator());
  }
}


function draw(){
  for(var i = 0; i < rotators.length; i++){
    rotators[i].display();
  }
}


function keyReleased(){
  for(var i = 0; i < 5; i++){
    rotators.push(new Rotator());
  }
}


function mouseReleased(){
  for(var i = 0; i < 5; i++){
    rotators.push(new Rotator());
  }
}

function Rotator(){
  this.cxnoise = random(10);
  this.cynoise = random(10);
  this.rnoise = random(10);
  this.re = random(255);
  this.gr = random(255);
  this.bl = random(255);
  this.r = random(60,120);
  this.cx = random(width/2-width*0.35,width/2+width*0.35);
  this.cy = random(height/2-height*0.35,height/2+height*0.35);
  this.angle = int(random(360));
  if(floor(random(0,2)) == 0){
    this.dispx = 1;
  }else{
    this.dispx = -1;
  }if(floor(random(0,2)) == 0){
    this.dispy = 1;
  }else{
    this.dispy = -1;
  }
  this.display = function(){
    var dist = (pow(this.cx-(width/2),2)/pow(width*0.35,2)) + (pow(this.cy-(height/2),2)/pow(height*0.35,2)); 
    if(dist > 1){
      stroke(120,70);
    }
    else{
      stroke(this.re, this.gr, this.bl,70);
    }
    var xf = noise(this.cxnoise)*this.dispx;
    var yf = noise(this.cynoise)*this.dispy;
    var rf = noise(this.rnoise);
    var x = cos(radians(this.angle)) * (this.r*rf+30) + this.cx;
    var y = sin(radians(this.angle)) * (this.r*rf+30) + this.cy;
    line(this.cx, this.cy, x, y);
    this.angle +=2.5;
    this.cy+=yf;
    this.cx+=xf;
    if(this.angle % 30 == 0){
      this.rnoise += 0.05;
      this.dispx += random(-0.2,0.2);
      this.dispy += random(-0.2,0.2);
    }
    this.cxnoise += 0.05;
    this.cynoise += 0.05;
    if(this.cx > width-this.r || this.cx < this.r){
      this.dispx *= -1;
    }
    if(this.cy > height-this.r || this.cy < this.r){
      this.dispy *= -1;
    } 
  }
}