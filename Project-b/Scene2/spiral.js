let mic;
let fft;
let amp;
let y = 0

function setup() {
  let canvas = createCanvas(1000,700);
  canvas.parent("p5-canvas")
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 5);
  let waveform = fft.waveform();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  for (let i = 0; i < waveform.length; i += 5) {
    push();
    rotate(2.1*i+radians(i));
    let maxHeight = map(i, 0, waveform.length, -width/2, width/2);
    let y = map(waveform[i], -1, 1, 0, maxHeight);
    stroke(0, 0, 100, 50);
    // line(0, 0, 0, y);
    let s = map(waveform[i], -1, 1, 0, 10, 50);
    let h = map(waveform[i], -1, 1, 0, 360, 50);
    noStroke();
    fill(h, 100, 100);
    circle(0, y, s);
    pop();
  }
}

