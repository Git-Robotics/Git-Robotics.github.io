let objects = [];
let s = 1;
let flag = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0, 'fixed');
  canvas.style('z-index', '-1');

  if(windowWidth <= windowHeight) {
    flag = 1;
  } else {
    flag = 0;
  }

  if(!flag) {
    let amount = 30;
    for(let i = 0 ; i < amount ; i++) {
      objects[i] = new Particle(i);
    }
  }
}

function draw() {
  background(255);
  
  if(!flag) {
    for(let p of objects) {
      for(let o of objects) {
        if(p.name > o.name) {
          p.connect(o);
        }
      }
      p.body();
      p.repel();
      p.move();
      p.bounds();
    }
  }
}