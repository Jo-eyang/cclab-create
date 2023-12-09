let mic
let fft

function setup() {
  let canvas = createCanvas(windowWidth, 500);
  canvas.parent("p5-canvas");
  colorMode(HSB)
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(30,0.1);
  let HUE = map(sin(frameCount*0.01),-1,1,0,360)
  fill(HUE,50,255);
  //the bars below
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i< spectrum.length; i+=30){
    let x = map(i, 0, spectrum.length, 0, width/2);
    let h = -height/2+ map(spectrum[i], 0, 255, height/2,0);
    rect(x+width/2, height, 10, h)
    rect(width/2-x, height, 10, h)
  }
  
  //the spots above
  let waveform = fft.waveform();
  noFill();
  //beginShape();
  stroke(HUE,50,255);
  for (let i = 0; i < waveform.length; i+=15){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height/2);
    circle(x,y,10)
  }
  //endShape();
}