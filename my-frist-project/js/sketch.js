
  let x, y, sx, sy, h, s, brn, d, rCell, r, x5, y5;
  //x, y: virus position
  //sx, sy: virus speed
  //h, s, brn: color mode
  //d: virus diameter
  //m: background spots position
  //x4, y4: vertex
  //rCell: cell size
  //r: random track
  //x5, y5: cell position
  let n = []; //xposition of spots
  let m = [];
  let inc = 0;
  let cellState = false;
  
  function setup() {
    let canvas=createCanvas(1200, 700);
    canvas.parent("p5-canvas");
    colorMode(HSB);
    x = [];
    y = [];
    h = 0;
    s = 50;
    brn = 50;
    sx = [];
    sy = [];
    d = [];
    x4 = 100;
    y4 = 100;
    x5 = noise(frameCount * 0.002) * width;
    y5 = noise(10 + frameCount * 0.002) * height;
    for (let i = 0; i < 300; i++) {
      n[i] = random(0, width);
      m[i] = random(0, height);
    }
  }
  
  function draw() {
    h = map(sin(frameCount * 0.01), -1, 1, 0, 360);
  
    //background&spots
    background(0, 100);
    fill(h, s, brn);
    for (let j = 0; j < n.length; j++) {
      n[j] = n[j] + random(-1, 1);
      m[j] = m[j] + random(-1, 1);
      circle(n[j], m[j], 10);
    }
  
    //cell
    if (cellState == false) {
      drawCell();
    } else {
      drawCell2();
    }
  
    //virus
    for (let i = 0; i < x.length; i++) {
      noStroke();
      circle(x[i], y[i], d[i]);
      // drawCell();
      if (dist(x5, y5, x[i], y[i]) <= 120) {
        console.log(10);
        cellState = true;
      }
  
      let x2 = map(cos(frameCount * 0.1), -1, 1, x[i] - 70, x[i] + 70);
      let y2 = map(sin(frameCount * 0.1), -1, 1, y[i] - 70, y[i] + 70);
  
      if (keyIsPressed) {
        //day
        if (key === "ArrowLeft") {
          x[i] = x[i] + sx[i] + map(noise(frameCount * 0.1), 0, 1, sx[i], sx[i]);
          y[i] = y[i] + sy[i] + map(noise(frameCount * 0.1), 0, 1, sy[i], sy[i]);
          background(255, 10, 100, 0.5);
          drawVirus2(x[i], y[i], d[i]);
          if (x[i] > width - d[i] / 2 || x[i] <= d[i] / 2) {
            sx[i] = -sx[i];
          }
          if (y[i] > height - d[i] / 2 || y[i] <= d[i] / 2) {
            sy[i] = -sy[i];
          }
        }
  
        //turn on the light
        if (key === "ArrowRight") {
          fill(50, 40, 150);
          circle(x2, y2, 20);
          background(80, 10, 100, 0.5);
  
          x[i] = x[i] + sx[i] + map(noise(frameCount * 0.1), 0, 1, -sx[i], sx[i]);
          y[i] = y[i] + sy[i] + map(noise(frameCount * 0.1), 0, 1, -sy[i], sy[i]);
          drawVirus3(x[i], y[i], d[i]);
          if (x[i] > width - d[i] / 2 || x[i] <= d[i] / 2) {
            sx[i] = -sx[i];
          }
          if (y[i] > height - d[i] / 2 || y[i] <= d[i] / 2) {
            sy[i] = -sy[i];
          }
        }
      }
  
      //night
      else {
        brn = 50;
  
        x[i] = x[i] + sx[i] + map(noise(frameCount), 0, 1, -2 * sx[i], 2 * sx[i]);
        y[i] = y[i] + sy[i] - map(noise(frameCount), 0, 1, -2 * sy[i], 2 * sy[i]);
  
        for (let i = 0; i < x.length; i++) {
          if (
            x[i] >= -d[i] / 2 &&
            x[i] <= width + d[i] / 2 &&
            y[i] >= -d[i] / 2 &&
            y[i] <= height + d[i] / 2
          ) {
            drawVirus1(x[i], y[i], d[i]);
          }
        }
        if (
          r > frameCount % 100 ||
          x[i] >= width - d[i] / 2 ||
          x[i] <= d[i] / 2
        ) {
          sx[i] = -sx[i];
          r = random(100);
        }
        if (y[i] >= height - d[i] / 2 || y[i] <= d[i] / 2) {
          sy[i] = -sy[i];
        }
      }
  
      deleteSpots();
      deleteVirus();
  
      if (dist(mouseX, mouseY, x5, y5) <= 100 && cellState == true) {
        console.log("in");
        cellState = false;
      }
    }
    drawWhiteBlood();
    fill(h, s, brn);
    fill(h, s - 20, brn + 130);
    textSize(15);
    textAlign(CENTER);
    textFont("Georgia");
    text(
      "It's inside your body. You are a WHITE BLOOD CELL. Your job is to protect other cells.",
      width / 2,
      height - 120
    );
    text(
      "press V to see the threat to your body",
      width / 2,
      height - 90
    );
    text(
      "press LEFT and RIGHT arrows to change the status of the virus",
      width / 2,
      height - 60
    );
    text("EXPLORE WHAT YOU CAN DO!", width / 2, height - 30);
  }
  
  function drawVirus1(u, v, s) {
    brn = 50;
    fill(h, s, brn);
    push();
    translate(u, v);
    noStroke();
    for (let lap = 0; lap < 4; lap = lap + 1)
      for (let rad = 0; rad < PI * 2; rad = rad + PI / 10) {
        let radDist = random(20, 50) - 5 * lap;
        let x3 = cos(rad + frameCount * 0.01) * radDist;
        let y3 = sin(rad + frameCount * 0.01) * radDist;
        let sz = 10 - 3 * lap;
        circle(x3, y3, sz);
      }
    pop();
  }
  
  function drawVirus2(a, b, c) {
    brn = 130;
    fill(h, s, brn);
    push();
    translate(a, b);
    noStroke();
    for (let lap = 0; lap < 4; lap = lap + 1)
      for (let rad = 0; rad < PI * 2; rad = rad + PI / 6) {
        let radDist = 40 - 6 * lap;
        let x3 = cos(rad + frameCount * 0.01) * radDist;
        let y3 = sin(rad + frameCount * 0.01) * radDist;
        let sz = 10 - 2 * lap;
        circle(x3, y3, sz);
      }
    pop();
  }
  
  function drawVirus3(a, b, c) {
    brn = 130;
    fill(h, s, brn);
    push();
    translate(a, b);
    for (let i = 0; i < 4; i = i + 1)
      for (let rad = 0; rad < PI * 2; rad = rad + PI / 10) {
        let radDist = 40 - 5 * i;
        b = 30;
        let x3 = cos(rad + frameCount * 0.02) * radDist;
        let y3 = sin(rad + frameCount * 0.01) * radDist;
        sz = 10 - 3 * i;
        circle(x3, y3, sz);
      }
    pop();
  }
  
  function keyPressed() {
    if (key=="v"||key=="V") {
      x.push(random(width));
      y.push(random(height));
      sx.push(random(-5, 5));
      sy.push(random(-5, 5));
      d.push(random(30, 60));
    }
  }
  
  function drawCell() {
    push();
    //the cell
    x5 = noise(frameCount * 0.002) * width;
    y5 = noise(10 + frameCount * 0.002) * height;
    translate(x5, y5);
    stroke(25);
    strokeWeight(10);
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        70,
        200
      );
      let x4 = rCell * cos(i);
      let y4 = rCell * sin(i);
      vertex(x4, y4);
    }
    endShape(CLOSE);
  
    //the core
    noStroke();
    fill(h, s, 30);
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        20,
        40
      );
      let x4 = rCell * cos(i);
      let y4 = rCell * sin(i);
      vertex(x4, y4);
    }
    endShape(CLOSE);
  
    //rna
    fill(255);
    push();
  
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        10,
        20
      );
      let x4 = rCell * cos(5.9 * i);
      let y4 = rCell * sin(i);
      vertex(x4, y4);
    }
    endShape(CLOSE);
    pop();
  
    pop();
  }
  
  function drawCell2() {
    push();
    fill(h, 70, 30);
    x5 = noise(frameCount * 0.002) * width;
    y5 = noise(10 + frameCount * 0.002) * height;
    translate(x5, y5);
    stroke(25);
    strokeWeight(10);
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        70,
        200
      );
  
      let x4 = rCell * cos(i) * random(0.9, 1.1);
      let y4 = rCell * sin(i) * random(0.9, 1.1);
      vertex(x4, y4);
    }
    endShape(CLOSE);
    //core
    noStroke();
    fill(h, s, 30);
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        20,
        40
      );
  
      let x4 = rCell * cos(i);
      let y4 = rCell * sin(i);
      vertex(x4, y4);
    }
    endShape(CLOSE);
  
    //rna
    fill(255);
    push();
  
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        10,
        20
      );
      let x4 = rCell * cos(5.9 * i);
      let y4 = rCell * sin(i) * random(0.5, 2);
      vertex(x4, y4);
    }
    endShape(CLOSE);
    pop();
  
    pop();
  }
  
  function deleteSpots() {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < n.length; j++) {
        if (dist(x[i], y[i], n[j], m[j]) <= 50) {
          n.splice(j, 1);
          m.splice(j, 1);
        }
      }
    }
  }
  
  function deleteVirus() {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < n.length; j++) {
        if (dist(x[i], y[i], mouseX, mouseY) <= 50) {
          x.splice(i, 1);
          y.splice(i, 1);
        }
      }
    }
  }
  
  function drawWhiteBlood() {
    fill(255, 0.8);
    noStroke();
    push();
    translate(mouseX, mouseY);
    beginShape();
    for (let i = 0; i < 2 * PI; i += 0.2) {
      let xd = cos(i) + 0.1;
      let yd = sin(i) + 0.1;
      rCell = map(
        noise(xd + frameCount * 0.01, yd + frameCount * 0.01),
        0,
        1,
        20,
        40
      );
      let x4 = rCell * cos(i);
      let y4 = rCell * sin(i);
      vertex(x4, y4);
    }
    endShape(CLOSE);
    fill(h, s, brn - 10);
    circle(0, 0, 20);
    pop();
  }
  