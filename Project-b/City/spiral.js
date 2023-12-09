let mic;
let amp;
let volHistory = [];
let daytime;
let c1, c2, c3;
let vol;
let stars = [];
let NUM_OF_STARS = 200;
let sound;
let load;
let amplitude;

function preload(){
  sound = loadSound('cityM.mp3')
}

function setup() {
  let canvas = createCanvas(1200, 500);
  canvas.parent("p5-canvas");
  canvas.mouseClicked(togglePlay);
  angleMode(DEGREES); 
  mic = new p5.AudioIn();
  mic.start()
  amplitude = new p5.Amplitude()
  colorMode(HSB);
  daytime = true
  
   for (let i = 0; i < NUM_OF_STARS; i++) {
    stars[i] = new star();
  }
}

//switch between day & night by the mouse
function mousePressed() {
  if (daytime) {
    daytime = false;
  } else {
    daytime = true;
  }
}


function draw() {
  //get the volume data
  vol = amplitude.getLevel()
  console.log(vol);
  volHistory.push(vol);

  //draw the day time
  if (daytime) {
    background(50, 20, 100);
    push()
    translate(width / 2, height / 2);
    beginShape();
    for (let i = 0; i < 360; i++) {
      let h = map(vol, 0, 1, 360, 0);
      // fill(h, 40, 80);
      noFill()
      stroke(h, 40, 80);
      strokeWeight(5);
      let r = map(volHistory[i], 0, 1, 100, 300);
      let x = r * cos(i);
      let y = r * sin(i);
      vertex(x, y);
    }
    endShape();
    pop()
  } 
  //draw the night time
  else {
    background(0, 0.1);
    //generate stars
     for (let i = 0; i < stars.length; i++) {
      let p = stars[i]
    p.display();
  }
    push()
    translate(width / 2, height / 2);
    //draw the background circles
    noStroke();
    let hLight = map(vol, 0, 1, 360, 0);
    let size1 = map(vol, 0, 1, 400, 600);
    let size2 = map(vol, 0, 1, 600, 700);
    let size3 = map(vol, 0, 1, 900, 1000);
    fill(360-hLight, 50, 200, 0.06);
    circle(0, 0, size1);
    fill(hLight, 50, 200, 0.06);
    circle(0, 0, size2);
    fill(255, 0.06);
    circle(0, 0, size3);
    //draw the earth
    beginShape();
    for (let i = 0; i < 360; i++) {
      let h = map(vol, 0, 1, 360, 0);
      fill(h, 50, 100);
      stroke(h, 50, 100);
      strokeWeight(5);
      let r = map(volHistory[i], 0, 1, 100, 300);
      let x = r * cos(i);
      let y = r * sin(i);
      vertex(x, y);
    }
    endShape();
    circle(0, 0, 200);
    pop()
    
  }

  //splice volhistory
  if (volHistory.length > 360) {
    volHistory.splice(0, 1);
  }
  console.log(vol);
}


class star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.s = 2;
  }

  display() {
    push();
    translate(random(width), random(height));
    fill(100);
    noStroke()
    circle(0, 0, this.s);
    pop();
  }
}

//stop/play the music + switch music&microphone input
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
