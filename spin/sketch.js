var myVideo; //the video that will play - a variable
var myVideo2;

function setup() { //functions mean do things
  createCanvas(windowWidth, windowHeight); //space for things

  var rnd1 = round(random(1, 7));//random selection algorythm
  var rnd2 = round(random(1, 7)); //range should be from 1 to total number of files in the assests folder

  myVideo = createVideo('assets/' + rnd1 + '.mp4 '); //set our first video
  myVideo.position(0, 0); //video top left
  myVideo.size(width / 2, height); //video the size of the current screen
  myVideo.play(); //GO GO GO GO GO

  myVideo2 = createVideo('assets/' + rnd2 + '.mp4'); //set our first video
  myVideo2.position(width / 2, 0); //video top left
  myVideo2.size(width / 2, height); //video the size of the current screen
  myVideo2.play(); //GO GO GO GO GO

  background(0); //aids in the presentation of video/dealing with flicker
}

function draw() {
  myVideo.onended(getNewClip); //what to do when videos end [it's below!]
  myVideo2.onended(getNewClip2); //what to do when videos end [it's below!]

}

function getNewClip() { //pick something new?
  print("the clip ended"); //test
  myVideo.remove(); //empty the container

  //math time//
  //get new video selected and name it to myVideo
  var getRandom = round(random(1, 7)); //range should be from 1 to total number of files in the assests folder
  //should also be rounded
  print(getRandom); //test to see what random number is

  myVideo = createVideo('assets/' + getRandom + '.mp4'); //concating - joining some fixed text with variable text outputs file name/path

  myVideo.position(0, 0); //same old position
  myVideo.size(width / 2, height); //same size
  myVideo.play(); //GO GO GO GO GO
  print("staaaaart");
}


function getNewClip2() { //pick something new?
  print("the clip ended"); //test
  myVideo2.remove(); //empty the container

  //math time//
  //get new video selected and name it to myVideo
  var getRandom = round(random(1, 7)); //range should be from 1 to total number of files in the assests folder
  //should also be rounded
  print(getRandom); //test to see what random number is

  myVideo2 = createVideo('assets/' + getRandom + '.mp4'); //concating - joining some fixed text with variable text outputs file name/path

  myVideo2.position(width / 2, 0); //same old position
  myVideo2.size(width / 2, height); //same size
  myVideo2.play(); //GO GO GO GO GO
  print("staaaaart");
}