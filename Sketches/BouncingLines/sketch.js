var r, anlge, x1, y1, x2, y2, a1, a2, noise1, noise2;


function setup() {
	createCanvas(windowWidth, windowHeight);
	bkg = floor(random(0,2));
	if(bkg == 0){
		background(0);
	}
	else{
		background(255);
	}
	frameRate(30);
	angle = random(PI)
	r = random(50,150)
	x1 = 350+(cos(angle)*r)
	y1 = 350+(sin(angle)*r)
	x2 = 350+(cos(angle+PI)*r)
	y2 = 350+(sin(angle+PI)*r)
	a1 = random(TWO_PI)
	a2 = random(TWO_PI)
	noise1 = random(10)
	noise2 = random(10)

}


function draw(){
	l = sqrt((x1-x2)**2 + (y1-y2)**2);
    stroke(map(l, 0, 700, 60,255),
    map(abs(x1-y2), 0, 700, 60,255),
    map(abs(y1-x2), 0, 700, 60,255), 70);
    line(x1,y1, x2,y2);
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
