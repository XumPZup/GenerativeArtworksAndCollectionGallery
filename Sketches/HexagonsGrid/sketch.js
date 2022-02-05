var W = 900*3;
var H = 900*3;
var l = 100*3;
var disp = 5*3;
var random_range = [-80*3, 80*3];
var alph=90;

var xStep, yStep, Ls, startX, n;
var points = [];
var noises = [];
var factors = [];

var palettes = [[[165, 241, 246], [208, 250, 249], [232, 255, 255],
			    [255, 255, 243], [255, 244, 223]],

			   [[107, 167, 160], [106, 245, 208],
			    [87, 100, 146], [47, 65, 73]],

			   [[103,40,40], [159,41,41], [240,112,112],
			    [34,122,98], [31,51,54]],

			   [[17, 34, 54], [67, 98, 128], [163, 186, 210],
			    [219, 228, 237], [255,255,255]],

			   [[194, 178, 165], [163, 193, 180], [122, 139, 101],
			    [66, 79, 53], [34, 49, 47]],

			   [[6, 4, 1], [63, 147, 132], [241, 244, 250],
			    [250, 215, 104], [227, 105, 0]]];


var palette

function setup() {
	createCanvas(W, H);
	background(0);
	noStroke();
//	colorMode(HSB, 255);
	
	Ls = [l, 2*l];
	yStep = l*sin(PI/3);
	xStep = l*cos(PI/3);
	startX = [0, -xStep];
	k=0;
	for(var y=-2*yStep; y<H+3*yStep; y+=yStep){
		points.push([]);
		factors.push([]);
		noises.push([]);
		for(var x=startX[k%2]-Ls[1]; x<W+Ls[1]-startX[k%2];){
			points[k].push([x, y]);
			x+= Ls[k%2];
			points[k].push([x, y]);
			x+= Ls[(k+1)%2];
			factors[k].push([random(random_range[0], random_range[1]),random(random_range[0], random_range[1])]);
			factors[k].push([random(random_range[0], random_range[1]),random(random_range[0], random_range[1])]);
			noises[k].push(random(40));
			noises[k].push(random(40));
		}
		k++
	}
	palette = palettes[int(random(100))%palettes.length];
}


function draw() {
	n=0;
	noStroke();

	background(0);
	hexagon();
	FR();
}


function hexagon(){
		for(var k=0; k<points.length-2; k+=2){
			for(var i=0; i<points[k].length-2; i+=2){
				fill(palette[(i+n)%palette.length][0], palette[(i+n)%palette.length][1],
					   palette[(i+n)%palette.length][2], alph);

				var A = dist(points[k][i][0] + (factors[k][i][0]*noise(noises[k][i])), 
						 	 points[k][i][1]+ (factors[k][i][1]*noise(noises[k][i])),
						 	 points[k][i+1][0] + (factors[k][i+1][0]*noise(noises[k][i+1])), 
						 	 points[k][i+1][1]+ (factors[k][i+1][1]*noise(noises[k][i+1])));

				var B = dist(points[k][i+1][0] + (factors[k][i+1][0]*noise(noises[k][i+1])), 
						 	 points[k][i+1][1]+ (factors[k][i+1][1]*noise(noises[k][i+1])),
						 	 points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])), 
							 points[k+1][i+1][1] + (factors[k+1][i+1][1]*noise(noises[k+1][i+1])));

				var C = dist(points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])), 
							 points[k+1][i+1][1] + (factors[k+1][i+1][1]*noise(noises[k+1][i+1])),
							 points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])), 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])));

				var D = dist(points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])), 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])),
							 points[k+2][i][0] + (factors[k+2][i][0]*noise(noises[k+2][i])), 
							 points[k+2][i][1] + (factors[k+2][i][1]*noise(noises[k+2][i])));

				var E = dist(points[k+2][i][0] + (factors[k+2][i][0]*noise(noises[k+2][i])), 
							 points[k+2][i][1] + (factors[k+2][i][1]*noise(noises[k+2][i])),
							 points[k+1][i][0] + (factors[k+1][i][0]*noise(noises[k+1][i])), 
							 points[k+1][i][1] + (factors[k+1][i][1]*noise(noises[k+1][i])));

				var F = dist(points[k+1][i][0] + (factors[k+1][i][0]*noise(noises[k+1][i])), 
							 points[k+1][i][1] + (factors[k+1][i][1]*noise(noises[k+1][i])),
							 points[k][i][0] + (factors[k][i][0]*noise(noises[k][i])), 
						 	 points[k][i][1]+ (factors[k][i][1]*noise(noises[k][i])));
				var len = A+B+C+D+E+F;
				//fill(map(len, 500, 700, 0, 255),200, 255, alph);
				beginShape();
				vertex(points[k][i][0] + (factors[k][i][0]*noise(noises[k][i])) +disp, 
							 points[k][i][1]+ (factors[k][i][1]*noise(noises[k][i])) +disp);
				vertex(points[k][i+1][0] + (factors[k][i+1][0]*noise(noises[k][i+1])) -disp, 
							 points[k][i+1][1]+ (factors[k][i+1][1]*noise(noises[k][i+1])) +disp);
				vertex(points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])) -disp, 
							 points[k+1][i+1][1] + (factors[k+1][i+1][1]*noise(noises[k+1][i+1])));
				vertex(points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])) -disp, 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])) -disp);
				vertex(points[k+2][i][0] + (factors[k+2][i][0]*noise(noises[k+2][i])) +disp, 
							 points[k+2][i][1] + (factors[k+2][i][1]*noise(noises[k+2][i])) -disp);
				vertex(points[k+1][i][0] + (factors[k+1][i][0]*noise(noises[k+1][i])) +disp, 
							 points[k+1][i][1] + (factors[k+1][i][1]*noise(noises[k+1][i])));
				endShape(CLOSE);
				n++
				fill(palette[(i+n)%palette.length][0], palette[(i+n)%palette.length][1],
					   palette[(i+n)%palette.length][2], alph);
				var A = dist(points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])), 
						 	 points[k+1][i+1][1]+ (factors[k+1][i+1][1]*noise(noises[k+1][i+1])),
						 	 points[k+1][i+2][0] + (factors[k+1][i+2][0]*noise(noises[k+1][i+2])), 
						 	 points[k+1][i+2][1]+ (factors[k+1][i+2][1]*noise(noises[k+1][i+2])));

				var B = dist(points[k][i+2][0] + (factors[k+1][i+2][0]*noise(noises[k+1][i+2])), 
						 	 points[k][i+2][1]+ (factors[k+1][i+2][1]*noise(noises[k+1][i+2])),
						 	 points[k+2][i+2][0] + (factors[k+2][i+2][0]*noise(noises[k+2][i+2])), 
							 points[k+2][i+2][1] + (factors[k+2][i+2][1]*noise(noises[k+2][i+2])));

				var C = dist(points[k+2][i+2][0] + (factors[k+2][i+2][0]*noise(noises[k+2][i+2])), 
							 points[k+2][i+2][1] + (factors[k+2][i+2][1]*noise(noises[k+2][i+2])),
							 points[k+3][i+2][0] + (factors[k+3][i+2][0]*noise(noises[k+3][i+2])), 
							 points[k+3][i+2][1] + (factors[k+3][i+2][1]*noise(noises[k+3][i+2])));

				var D = dist(points[k+3][i+2][0] + (factors[k+3][i+2][0]*noise(noises[k+3][i+2])), 
							 points[k+3][i+2][1] + (factors[k+3][i+2][1]*noise(noises[k+3][i+2])),
							 points[k+3][i+1][0] + (factors[k+3][i+1][0]*noise(noises[k+3][i+1])), 
							 points[k+3][i+1][1] + (factors[k+3][i+1][1]*noise(noises[k+3][i+1])));

				var E = dist(points[k+3][i+1][0] + (factors[k+3][i+1][0]*noise(noises[k+3][i+1])), 
							 points[k+3][i+1][1] + (factors[k+3][i+1][1]*noise(noises[k+3][i+1])),
							 points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])), 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])));

				var F = dist(points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])), 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])),
							 points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])), 
						 	 points[k+1][i+1][1]+ (factors[k+1][i+1][1]*noise(noises[k+1][i+1])));
				var len = A+B+C+D+E+F;
				//fill(map(len, 300, 1000, 100, 225),200, 255, alph);
				beginShape();
				vertex(points[k+1][i+1][0] + (factors[k+1][i+1][0]*noise(noises[k+1][i+1])) +disp, 
							 points[k+1][i+1][1] + (factors[k+1][i+1][1]*noise(noises[k+1][i+1])) +disp);
				vertex(points[k+1][i+2][0] + (factors[k+1][i+2][0]*noise(noises[k+1][i+2])) -disp, 
						 	 points[k+1][i+2][1] + (factors[k+1][i+2][1]*noise(noises[k+1][i+2])) +disp);
				vertex(points[k+2][i+2][0] + (factors[k+2][i+2][0]*noise(noises[k+2][i+2])) -disp, 
							 points[k+2][i+2][1] + (factors[k+2][i+2][1]*noise(noises[k+2][i+2]))) ;
				vertex(points[k+3][i+2][0] + (factors[k+3][i+2][0]*noise(noises[k+3][i+2])) -disp, 
						   points[k+3][i+2][1] + (factors[k+3][i+2][1]*noise(noises[k+3][i+2])) -disp);
				vertex(points[k+3][i+1][0] + (factors[k+3][i+1][0]*noise(noises[k+3][i+1])) +disp, 
							 points[k+3][i+1][1] + (factors[k+3][i+1][1]*noise(noises[k+3][i+1])) -disp);
				vertex(points[k+2][i+1][0] + (factors[k+2][i+1][0]*noise(noises[k+2][i+1])) +disp, 
							 points[k+2][i+1][1] + (factors[k+2][i+1][1]*noise(noises[k+2][i+1])) );
				endShape(CLOSE);
				n++
				noises[k][i]+=0.005;
				noises[k][i+1]+=0.005;
				noises[k+1][i+1]+=0.005;
				noises[k+2][i+1]+=0.005;
				noises[k+2][i]+=0.005;
				noises[k+1][i]+=0.005;

				noises[k+1][i+2]+=0.005;
				noises[k+2][i+2]+=0.005;
				noises[k+3][i+2]+=0.005;
				noises[k+3][i+1]+=0.005;
			}
		}
}


function FR(){
	d = 40
	noFill();
	beginShape();
	stroke(190);
	strokeWeight(d*2);
	vertex(d, d);
	vertex(d, height-d);
	vertex(width-d, height-d);
	vertex(width-d, d);
	endShape(CLOSE);
}
