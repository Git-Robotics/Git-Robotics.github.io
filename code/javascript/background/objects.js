class Particle {
  constructor(n) {
    this.name = n
    this.size = random(5, 15);
    this.pos = createVector(random(0 + this.size, windowWidth - this.size), random(0 + this.size, windowHeight - this.size));
    this.speed = createVector(random(-this.size, this.size) / 75, random(-this.size, this.size) / 75);
  }
  
  body() {
    let objFill;
    let distSqr = pow(this.pos.x - mouseX, 2) + pow(this.pos.y - mouseY, 2);
    if(distSqr >= pow(200, 2)) {
      objFill = color(10, 10, 10);
    } else {
      objFill = color(map(distSqr, 0, pow(100, 2), 255, 0), map(distSqr, 0, pow(100, 2), 0, 10), map(distSqr, 0, pow(100, 2), 0, 10));
    }
    objFill.setAlpha(255);
    fill(objFill);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  move() {
    if(this.speed.mag() > 5) {
      this.speed.setMag(5); // Is this even doing anything?
    }
    this.pos.add(this.speed);
  }
  
  connect(oth) {
    let distanceSqr = pow((oth.pos.x - this.pos.x), 2) + pow((oth.pos.y - this.pos.y), 2);
    let mDistSqr = pow((mouseX - this.pos.x), 2) + pow((mouseY - this.pos.y), 2);
    
    let lineFill;
    
    if(mDistSqr >= pow(150, 2)) {
      lineFill = color(50, 50, 50);
    } else {
      lineFill = color(map(mDistSqr, 0, pow(100, 2), 255, 0), map(mDistSqr, 0, pow(150, 2), 0, 50), map(mDistSqr, 0, pow(150, 2), 0, 50));
    }
    
    lineFill.setAlpha(map(distanceSqr, 0, pow(300, 2), 255, 0));
    stroke(lineFill);
    strokeWeight(1);
    if(distanceSqr <= pow(300, 2)) {
      line(this.pos.x, this.pos.y, oth.pos.x, oth.pos.y);
    }
  }
  
  repel() {
    let mPos = createVector(mouseX, mouseY);
    let distanceSqr = pow(this.pos.x - mPos.x, 2) + pow(this.pos.y - mPos.y, 2);
    let direction = p5.Vector.sub(this.pos, mPos);
    direction.setMag(this.size / (distanceSqr * 10));
    
    if(distanceSqr <= pow(200, 2)) {
      this.speed.add(direction);
    }
  }
  
  bounds() {
    if(this.pos.x < 0 + (this.size / 2) || this.pos.x > windowWidth - (this.size / 2)) {
      this.speed.x = -this.speed.x;
    }
    if(this.pos.y < 0 + (this.size / 2) || this.pos.y > windowHeight - (this.size / 2)) {
      this.speed.y = -this.speed.y;
    }
  }
}