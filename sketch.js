const audioFilename = './recordings/cough.m4a';
let audioFile;

function preload() {
  soundFormats('m4a'); // add more formats as comma-separated arguments as needed
  audioFile = loadSound(audioFilename);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  audioFile.play();
}

function draw() {
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
