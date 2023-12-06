let mic, fft;
let bubbles = [];
let img;
let MAX_BUBBLES = 3000;
let ABS_MIN_BUBBLE_SIZE = 1;
let ABS_MAX_BUBBLE_SIZE = 400;
let sound;
let amplitude;

function preload() {
  img = loadImage('forest.jpg');
  sound = loadSound('rainM.mp3')
}

function setup() {
  let canvas = createCanvas(1800,980);
  canvas.parent("p5-canvas");
  canvas.mouseClicked(togglePlay);
  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude()
 

  mic.start();
  
  for (let i = 0; i < MAX_BUBBLES; i++) {
  
    let randX = random(0, width);
    let randY = random(0, height);
    let randMinSize = random(ABS_MIN_BUBBLE_SIZE, ABS_MIN_BUBBLE_SIZE + 10);
    let randMaxSize = random(randMinSize, ABS_MAX_BUBBLE_SIZE);
    let imgPixelColor = img.get(randX, randY);
    let fillColor = color(red(imgPixelColor), green(imgPixelColor), blue(imgPixelColor), 150);
    let bubble = new Bubble(randX, randY, randMinSize, randMaxSize, fillColor);
    bubbles.push(bubble);
  }
}

function draw() {
  background(50);
  background(img);

  let micLevel = amplitude.getLevel();
  console.log(micLevel)
 
  for(let bubble of bubbles){
    bubble.update(micLevel);
    bubble.draw();
  }

}

function togglePlay() {
  if (sound.isPlaying() ){
    sound.pause();
    amplitude.setInput(mic)
  } else {
    sound.loop();
		amplitude = new p5.Amplitude();
		amplitude.setInput(sound);
  }
}

class Bubble{
  constructor(x, y, minSize, maxSize, fillColor){
    this.x = x;
    this.y = y;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.fillColor = fillColor;
    this.micLevel = 0.5; // between 0 and 1
    this.grayscaleColor = color(255, 50); // in HSB mode
    this.drawGrayscale = false;
  }

  update(micLevel){
    this.micLevel = micLevel;
  }

  draw(){
    push();
    noStroke();
    if(this.drawGrayscale){
      fill(this.grayscaleColor);
    }else{
      fill(this.fillColor);
    }
    let diameter = map(this.micLevel, 0, 1, this.minSize, this.maxSize);
    circle(this.x, this.y, diameter);
    pop();
  }
}