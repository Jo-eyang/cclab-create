let mic;
let amp;
let volHistory = [];

function setup() {
  // createCanvas(600, 600);
  let canvas = createCanvas(600, 600);
  canvas.parent("p5-canvas");
  angleMode(DEGREES); // Change the mode to DEGREES
  mic = new p5.AudioIn();
  mic.start();
  colorMode(HSB);
}

function draw() {
  background(0);
  let vol = mic.getLevel();
  console.log(vol);
  volHistory.push(vol);
  stroke(255, 0, 0);
  translate(width / 2, height / 2);
  noFill();
  beginShape();

  for (let i = 0; i < 360; i++) {
    let h = map(vol, 0, 1, 0, 360);
    stroke(h, 100, 100);
    let r = map(volHistory[i], 0, 1, 100, 300);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volHistory.length > 360) {
    volHistory.splice(0, 1);
  }

  // ellipse(300, 300, vol*300, vol*300);
  console.log(vol);
}
