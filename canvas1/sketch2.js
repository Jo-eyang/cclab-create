let mic
let fft


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("p5-canvas2")
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0,10);
  let spectrum = fft.analyze();
  noStroke();
  fill(187,255,255);
  for (let i = 0; i< spectrum.length; i+=30){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height/2+ map(spectrum[i], 0, 255, height/2,0);
    rect(x, height, 10, h )
  }
  
  let waveform = fft.waveform();
  noFill();
  //beginShape();
  stroke(187,255,255);
  for (let i = 0; i < waveform.length; i+=50){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height/2);
    circle(x,y,10)
  }
  //endShape();
}