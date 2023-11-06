let NUM_OF_PARTICLES = 20;
let NUM_OF_PARTICLES2 = 3;
let NUM_OF_PARTICLES3 = 100;

let particles = [];
let particles2 = [];
let particles3 = [];

function setup() {
  let canvas=createCanvas(600, 600);
    canvas.parent("p5-canvas");

  // generate shooting stars
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new star(random(width), random(height));
  }

  //generate planets
  for (let i = 0; i < NUM_OF_PARTICLES2; i++) {
    particles2[i] = new planet(
      random(100, width - 100),
      random(100, height - 100)
    );
  }

  //generate sparkling stars
  for (let i = 0; i < NUM_OF_PARTICLES3; i++) {
    particles3[i] = new littleStar();
  }
}

function draw() {
  background(0, 10);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.goBackToCanvas();
  }
  for (let i = 0; i < particles.length; i++) {
    let p3 = particles3[i];
    p3.display();
  }
  for (let j = 0; j < particles2.length; j++) {
    let p2 = particles2[j];
    p2.display();
    p2.move();
    p2.goBackToCanvas();
  }

  //show explode&crack&shake&splice
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles2.length; j++) {
      if (
        dist(
          particles[i].x,
          particles[i].y,
          particles2[j].x2,
          particles2[j].y2
        ) >= 0 &&
        dist(
          particles[i].x,
          particles[i].y,
          particles2[j].x2,
          particles2[j].y2
        ) <=
          particles2[j].s2 / 2
      ) {
        particles2[j].crack();
        particles2[j].shake();
        particles[i].explode();
      }
      if (particles[i].s >= 100) {
        particles.splice(i, 1);
      }
    }
  }
}

class star {
  // constructor functions
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.s = random(3, 5);
  }

  // move
  update() {
    this.x += 1;
    this.y += 1;
  }

  // star's appearance
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    colorMode(RGB);
    fill(238, 232, 170);
    circle(0, 0, this.s);
    pop();
  }

  //star explode
  explode() {
    this.s += 20;
    this.x -= 2;
    this.y -= 2;
    
  }

  goBackToCanvas() {
    if (this.x > width + this.s || this.y > height + this.s) {
      this.x = width - this.x;
      this.y = height - this.y;
    }
  }
}

class planet {
  constructor(startX2, startY2) {
    this.x2 = startX2;
    this.y2 = startY2;
    this.s2 = random(40, 60);
    this.xx1 = random(10, 0);
    this.yy1 = random(-10, 0);
    this.xx2 = random(0, -10);
    this.yy2 = random(0, 10);
    this.h = random(360);
  }

  move() {
    this.x2 -= 0.4;
  }
  goBackToCanvas() {
    if (this.x2 < 0 - this.s2) {
      this.x2 = width + this.s2;
    }
  }

  shake() {
    this.x2 += map(noise(frameCount), 0, 1, -2, 2);
    this.y2 += map(noise(1 + frameCount), 0, 1, -2, 2);
    this.h = random(360);
  }

  //planet appearance
  display() {
    noStroke();
    push();
    translate(this.x2, this.y2);
    colorMode(HSB);
    fill(this.h, 60, 90);
    circle(0, 0, this.s2);
    for (let k = 0; k < 2; k++)
      for (let rad = 0; rad < PI * 2; rad = rad + PI / 10) {
        let radDist = 40 - 5 * k;
        let x = cos(rad + frameCount * 0.01) * radDist;
        let y = sin(rad + frameCount * 0.005) * radDist;
        let sz = 3 + 2 * k;
        circle(x, y, sz);
      }
    pop();
  }

  //the crack on the planets
  crack() {
    stroke(0, 10, 10);
    strokeWeight(3);
    push();
    translate(this.x2, this.y2);
    line((this.s2 * cos(1)) / 2, (this.s2 * sin(1)) / 2, this.xx1, this.yy1);
    line(this.xx1, this.yy1, this.xx2, this.yy2);
    line(
      this.xx2,
      this.yy2,
      (this.s2 * cos(1 + PI)) / 2,
      (this.s2 * sin(1 + PI)) / 2
    );
    pop();
  }
}

class littleStar {
  constructor() {
    this.x3 = random(width);
    this.y3 = random(height);
    this.s3 = 2;
  }

  display() {
    push();
    translate(random(width), random(height));
    fill(255);
    circle(0, 0, 2);
    pop();
  }
}
