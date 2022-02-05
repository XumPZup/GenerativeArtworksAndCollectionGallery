var r, angle, x1, y1, x2, y2, a1, a2, noise1, noise2, stop;
var a,b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var bkg = floor(random(0,2));
  if(bkg == 0){
    background(0);
  }
  else{
    background(255);
  }
  frameRate(24);
  angle = random(PI);
  r = random(10,width/20);
  x1 = width/2+(cos(angle)*r);
  y1 = height/2+(sin(angle)*r);
  x2 = width/2+(cos(angle+PI)*r);
  y2 = height/2+(sin(angle+PI)*r);
  a1 = random(TWO_PI);
  a2 = random(TWO_PI);
  noise1 = random(10);
  noise2 = random(10);
  var mult = int(noise(noise1)*6);
  if(mult == 0){mult = 1;}
  stop = 180*mult;
  noFill();
  if(width > height){
	  a = width;
	  b = height;
  }else{
	  a = height;
	  b = width;
  }
}


function draw(){
    var l = sqrt(pow((x2-x1),2) + pow((y2-y1),2));
    stroke(map(l, 0, b, 60,255),
    map(abs(x1-y2), 0, a*0.5, 60,255),
    map(abs(y1-x2), 0, a*0.5, 60,255), 90);
    var m = atan((y1-y2)/(x1-x2));
    if(x1 < x2){
      sinFunc(x1, y1, l, m,0,stop);
    }
    else{
      if(stop % 360 == 0){
        sinFunc(x2, y2, l, m,0,stop);
      }else{ 
        sinFunc(x2, y2, l, m,180,stop+180);
      }
    }
    x1 += cos(a1+noise(noise1)*2)*5;
    y1 += sin(a1+noise(noise1)*2)*5;
    x2 += cos(a2+noise(noise2)*2)*5;
    y2 += sin(a2+noise(noise2)*2)*5;
    if (x1 < 0){
        a1 = random(-HALF_PI,HALF_PI);
        noise1 += 0.03;
  }
    else if (x1 > width){
        a1 = random(HALF_PI, HALF_PI+PI);
        noise1 += 0.03;
  }
    if (y1 < 0){
        a1 = random(PI);
        noise1 += 0.03;
  }
    else if (y1 > height){
        a1 = random(-PI,0);
        noise1 += 0.03;
  }
    if (x2 < 0){
        a2 = random(-HALF_PI,HALF_PI);
        noise2 += 0.03;
  }
    else if (x2 > width){
        a2 = random(HALF_PI, HALF_PI+PI);
        noise2 += 0.03;
  }
    if (y2 < 0){
        a2 = random(PI);
        noise2 += 0.03;
  }
    else if (y2 > height){
        a2 = random(-PI,0);
        noise2 += 0.03;
  }
}

function sinFunc(xs, ys, l, rot, start, stop){
  var inc = l / ((stop-start)/5);
  var x = 0;
  var y = 0;
  beginShape();
  for(var i = start; i < stop; i+=floor((stop-start)/((stop-start)/5))){
    y = sin(radians(i))*r;
    x += inc;
    //rnoise += 0.01;
    vertex((x*cos(rot) - y*sin(rot))+xs, (y*cos(rot) + x*sin(rot))+ys);
  }
  
  endShape();
}