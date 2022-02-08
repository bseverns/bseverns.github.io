let img1, img2, img3, img4;
let txt1, txt2;

function preload(){
img1 = createImg('assets/1.png', 'webflow');//origin url and alt text
img2 = createImg('assets/win2.jpeg', 'window image');
img3 = createImg('assets/win8.jpeg', 'window image');
img4 = createImg('assets/win10.jpeg', 'window image');
txt1 = createP('things from the future are furry');
txt2 = createP('Some other inflamatory things');
}

function setup() {
  createCanvas(1920, 1080);
  img1.position(700, 300);
  img1.size(300, 500);

  img2.position(200, 200);
  img2.size(150, 150)

  img3.position(200, 400);
  img3.size(150, 150)

  img4.position(200, 600);
  img4.size(150, 150);

  txt1.style('font-size', '25px');
  txt1.style('color','grey');
  txt1.position(275, 575);

  txt2.position(575, 375);
  txt2.class('big');
}

function draw() {
  background(255, 0, 255);
}
