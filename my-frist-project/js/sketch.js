let x, y, sx, sy, h, s, brn, c, d;
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas");
  colorMode(HSB);
  x = [];
  y = [];
  brn = 255;
  sx = [];
  sy = [];
  s = 50;
  d = [];
  h = 0;
  r=random(100)
}

function draw() {
  background(0, 100);
  fill(h, s, brn);

  for (let i = 0; i < x.length; i++) {
    noStroke();
    circle(x[i], y[i], d[i]);
    h = map(sin(frameCount * 0.01), -1, 1, 0, 360);
    let x2 = map(cos(frameCount * 0.1), -1, 1, x[i] - 70, x[i] + 70);
    let y2 = map(sin(frameCount * 0.1), -1, 1, y[i] - 70, y[i] + 70);

    if (keyIsPressed) {
      if (key === "ArrowLeft") {
        brn = 130;
        x[i] = x[i] + sx[i] + map(noise(frameCount * 0.1), 0, 1, sx[i], sx[i]);
        y[i] = y[i] + sy[i] + map(noise(frameCount * 0.1), 0, 1, sy[i], sy[i]);
        background(255, 10, 100, 0.3);
        drawVirus2(x[i], y[i], d[i]);
      }
    } else {
      if (key === "ArrowRight") {
        brn = 130;
        fill(50, 40, 150);
        circle(x2, y2, 30);

        x[i] = x[i] + sx[i] + map(noise(frameCount * 0.1), 0, 1, -sx[i], sx[i]);
        y[i] = y[i] + sy[i] + map(noise(frameCount * 0.1), 0, 1, -sy[i], sy[i]);
        drawVirus2(x[i], y[i], d[i]);
      } else {
        brn = 100;
        x[i] =
          x[i] + sx[i] + map(noise(frameCount), 0, 1, -2 * sx[i], 2 * sx[i]);
        y[i] =
          y[i] + sy[i] - map(noise(frameCount), 0, 1, -2 * sy[i], 2 * sy[i]);
        for (let i = 0; i < x.length; i++) {
          drawVirus1(x[i], y[i], d[i]);
        }
      }
    }

    if (r > frameCount%100||x[i] > width - d[i] / 2 || x[i] <= d[i] / 2) {
      sx[i] = -sx[i];
      r = random(100)
      
    }
    if (y[i] > height - d / 2 || y[i] <= d[i] / 2) {
      sy[i] = -sy[i];
    }
  }
}

function drawVirus1(u, v, s) {
  fill(h, s, brn);
  push();
  translate(u, v);
  noStroke();
  for (let lap = 0; lap < 4; lap = lap + 1)
    for (let rad = 0; rad < PI * 2; rad = rad + PI / 10) {
      let radDist = random(20, 50) - 5 * lap;
      brn = 30;
      let x3 = cos(rad + frameCount * 0.01) * radDist;
      let y3 = sin(rad + frameCount * 0.01) * radDist;
      let sz = 10 - 3 * lap;
      circle(x3, y3, sz);
    }
  pop();
}

function drawVirus2(a, b, c) {
  fill(h, s, brn);
  push();
  translate(a, b);
  noStroke();
  for (let lap = 0; lap < 4; lap = lap + 1)
    for (let rad = 0; rad < PI * 2; rad = rad + PI / 6) {
      let radDist = 40 - 6 * lap;
      brn = 30;
      let x3 = cos(rad + frameCount * 0.01) * radDist;
      let y3 = sin(rad + frameCount * 0.01) * radDist;
      let sz = 10 - 2 * lap;
      circle(x3, y3, sz);
    }
  pop();
}

function mousePressed() {
  x.push(mouseX);
  y.push(mouseY);
  sx.push(random(-5, 5));
  sy.push(random(-5, 5));
  d.push(random(30, 60));
}
