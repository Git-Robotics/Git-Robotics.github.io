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

  // The below if statement is pulled from a thread on stack overflow.
  // I know how the code works. The /i modifier makes it case insensitive. The .test() matches the value of navigator.useragent to one of the strings.
  if( /webOS|Android|iPad|iPhone|iPod|IEMobile|BlackBerry|Opera Mini|Kindle|KFAPWI/i.test(navigator.userAgent) ) {
    flag = 1;
  } else {
    flag = 0;
  }

  if(!flag) {
    let amount = 20;
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
