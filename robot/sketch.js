function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

function draw() {
  background(127, 55, 14);
  //neck
  stroke(102);
  line(266, 257, 266, 162);
  line(276, 257, 276, 162);
  line(286, 257, 286, 162);
  line(296, 257, 256, 162);
  //antennae
  line(276, 155, 246,112);
  line(276, 155, 306, 56);
  line(276, 157, 342, 170);
  //body
  noStroke();
  fill(102);
  ellipse(267,377, 33, 33);//antigravity orb
  fill(0);
  rect(219, 257, 90, 120); //body
  fill(102);
  rect(219, 274, 90, 6);//stripe
  //head
  fill(0);//black
  ellipse(276,155, 45, 45);
  fill(255);//white
  ellipse(288, 150, 34, 14);//big eye
  fill(0);
  ellipse(288,150, 3, 3);//pupil
  fill(153);
  ellipse(263, 148, 5, 5);
  ellipse(296, 130, 4, 4);
  ellipse(305, 162, 3, 3);
}