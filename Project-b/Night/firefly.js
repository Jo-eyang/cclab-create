let mic;
let fft;
let amp;
// let y = 0
let img;
let xp;
let yp;
let sound;
let amplitude;


function preload() {
  img = loadImage("night.jpg");
  img2 = loadImage("light.png");
  sound = loadSound('nightM.mp3')
  
}

function setup() {
  let canvas = createCanvas(1800,600);
  canvas.parent("p5-canvas")
  canvas.mouseClicked(togglePlay);
  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude()
  fft = new p5.FFT();
  fft.setInput(sound);
  colorMode(HSB, 360, 100, 100, 100);
  xp = width/2
  yp = height/2
}

function draw() {
  // background(255);
  xp = xp+0.01*(mouseX-xp)
  yp = yp+0.01*(mouseY-yp)
  tint(255, 20)
  let level = amplitude.getLevel();
  let lightSize = map(level, 0, 1, 4, 10)
  // console.log(lightSize)
  image(img, 0, 0, width, height);
  image(img2, xp-lightSize*width/2, yp-lightSize*height/2-10, lightSize*width, lightSize*height)
  image(img2, xp-lightSize*width/2, yp-lightSize*height/2-10, lightSize*width, lightSize*height)
  image(img2, xp-lightSize*width/2, yp-lightSize*height/2-10, lightSize*width, lightSize*height)
  
  translate(xp, yp);
  let waveform = fft.waveform();
  for (let i = 0; i < waveform.length; i += 5) {
    push();
    rotate(2.1*i+radians(i));
    let maxHeight = map(i, 0, waveform.length, -300, 300);
    let y = map(waveform[i], -1, 1, 0, maxHeight)+ 0.1*(mouseY-yp);
    let x = random(-3,3)+0.1*(mouseX-xp)
    stroke(0, 0, 100, 50);
    let s = map(waveform[i], -1, 1, 0, 10, 50);
    let h = map(waveform[i], -1, 1, 0, 360, 100);
    noStroke();
    fill(h, 60, 100);
    circle(x, y, s);
    pop();
  }
}

function togglePlay() {
  if (sound.isPlaying() ){
    sound.pause();
    amplitude.setInput(mic)
    fft.setInput(mic);
  } else {
    sound.loop();
		amplitude = new p5.Amplitude();
		amplitude.setInput(sound);
        fft.setInput(sound);
  }
}
