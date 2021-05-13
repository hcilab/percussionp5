const audioFilename = './recordings/cough.m4a';
let audioFile;

let fft;

function preload() {
  soundFormats('m4a'); // add more formats as comma-separated arguments as needed
  audioFile = loadSound(audioFilename);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  audioFile.play();

  fft = new p5.FFT();
  fft.setInput(audioFile);
}

function draw() {
  background(255);

  const amplitudes = fft.analyze();
  drawFrequencyVisualizer(100, 100, 0.8*windowWidth, 500, amplitudes);
}


function drawFrequencyVisualizer(x, y, width, height, amplitudes) {
  const barWidth = width / amplitudes.length;

  push();

  // draw a border
  stroke(0);
  noFill();
  rect(x, y, width, height);

  // draw each bar
  translate(x, y + height);
  noStroke();
  fill(128);
  amplitudes.forEach((amplitude, index) => {
    const barX = index*barWidth;
    const barHeight = map(amplitude, 0, 255, 0, height);
    rect(barX, 0, barWidth, -barHeight);
  });

  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
