//Jordan Snow
//email: cjordan.snow@gmail.com
//github.com/s-no1ukno
//
//Nature of Code - Week One
//July 26, 2019
//Title: "Levy Colors"



//Global variables - xoff, yoff, soff are offsets for Perlin
//noise initiation;
let w;
let xoff = 0;
let yoff = 0;
let soff = 0;

function setup() {
	createCanvas(400, 400);
	background(51);

	w = new Walker();

	
}

function draw() {
	w.update();
	w.display();
	w.edges();
	let s = "S-no1ukno"
	fill(255);
	textSize(32);
	let t = new Text(s, width - 50, height - 10);
}


class Walker {
	//Want EVERYTHING random!!

	constructor() {
		//pos and vel vectors with different iterations of randomness
		this.pos = createVector(random(width), random(height));
		this.vel = p5.Vector.random2D();
	}

	update() {
		//accelerating randomly
		this.accel = createVector(random(-1,1), random(-1,1));
		this.accel.normalize();
		this.accel.mult(0.1);

		//constraining velocity for a slower walk
		if (this.vel.x > 0.5 || this.vel.y > 0.5) {
			this.vel = createVector(0, 0);
		}		

		//implementing Perlin noise for random color mapped
		//across the x and y pos of the walker
		xoff += random(-1, 1);
		yoff += random(-1, 1);

		let R = noise(xoff) * this.pos.x;
		let G = noise(yoff) * this.pos.y;
		let B = noise(soff) * 10;
		let S = noise(soff) * 10;
		soff += 0.1;

		//also using noise for strokeWeight
		strokeWeight(S);
		stroke(R, G, B, 150);

		this.pos.add(this.vel);
		this.vel.add(this.accel);
	}

	display() {
		point(this.pos.x, this.pos.y);
	}

	//constraining the walker to the canvas by using a 
	//"levy-like" random jump
	edges() {
		if (this.pos.x <= 0 || this.pos.x >= width || this.pos.y <= 0 || this.pos.y >= height) {
			w = new Walker();
		}
	}
}