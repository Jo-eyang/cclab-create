let mic;
let stars = [];
let col;

function setup() {
  let canvas = createCanvas(1200,700);
  canvas.parent("p5-canvas")
  //colorMode(HSB)
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  

  //console.log(waveform)
}

function draw() {
  background(0);
  waveform = fft.waveform();
  

  for (let i = 0; i < stars.length; i++) {
    stars[i].move();
    stars[i].show();
    if (stars[i].y < 0) {
      stars.splice(i, 1);
    }
  }

  // noStroke()
  
  for (let i = 0; i < width; i += 30) {
    let index = int(map(i, 0, width, 0, 1024));
    let h = abs(500 * waveform[index]);
    let x = i
    let y = 0
    push();
    translate(x, y);
    // rotateX(PI / 2);
    let c1 = color(150, 250, 250);
    let c2 = color(250, 150, 250);
    let rate = map(i, 0, width, 0, 0.9);
    col = lerpColor(c1, c2, rate);
    fill(col);
    noStroke()
    rect(0, 0, 20, h)
    pop();
    for (let k = 0; k < 10; k++) {
      if (random(0.01, 1) < 0.5 * waveform[index]) {
        stars.push(new star(x, y, col));
      }
    }
  }
}

class star {
  constructor(x, y, col) {
    this.x = x + random(-2, 2);
    this.y = y + random(-5, 5)
    this.col = col;
    this.life = 500;
    this.speedX = random(-0.3, 0.3);
    this.speedY = 1
  }

  move() {
    this.x += this.speedX;
    this.y += (this.speedY*random(0.5,1.5));
    this.life -= 1;
  }

  show() {
    push();
    let a = map(this.life, 0, 500, 0, 1);
    stroke(this.col);
    strokeWeight(5);
    point(this.x, this.y);
    pop();
  }
}
