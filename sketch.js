const audioFilename = './recordings/cough 2.m4a';
let audioFile;

let fft;
let frequencyRange;

let selectedFrequencyRange = [500, 2500]; // depends on sampling rate, but typically bound within the range [0, 22500]

let energyHistoryLengthMillis = 5000;
let energyHistory = [];

const activationThreshold = 100; // range [0, 255]


function preload() {
  soundFormats('m4a'); // add more formats as comma-separated arguments as needed
  audioFile = loadSound(audioFilename);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  frequencyRange = [0, audioFile.sampleRate() / 2]
  audioFile.play();

  fft = new p5.FFT();
  fft.setInput(audioFile);
}

function draw() {
  background(255);

  text(`Filename: ${audioFilename}`, 50, 25)
  text(`Frequency range: ${frequencyRange[0]} - ${frequencyRange[1]} hz`, 50, 50)
  text(`Selected range: ${selectedFrequencyRange[0]} - ${selectedFrequencyRange[1]} hz`, 50, 75)

  const amplitudes = fft.analyze();
  drawFrequencyVisualizer(100, 100, 0.8*windowWidth, 500, amplitudes);

  const selectedEnergy = fft.getEnergy(selectedFrequencyRange[0], selectedFrequencyRange[1]);
  const t = millis();
  energyHistory.push({t: t, energy: selectedEnergy});
  while (energyHistory[0].t < t-energyHistoryLengthMillis) {
    energyHistory.shift();
  }

  drawTimeSeriesVisualizer(100, 700, 0.8*windowWidth, 500, energyHistory);
}


function drawFrequencyVisualizer(x, y, width, height, amplitudes) {
  const barWidth = width / amplitudes.length;
  const frequencies = _.range(amplitudes.length).map(i => map(i, 0, amplitudes.length-1, frequencyRange[0], frequencyRange[1]));

  push();

  // draw a border
  stroke(0);
  noFill();
  rect(x, y, width, height);

  translate(x, y + height);

  // shade selected region
  const start = map(selectedFrequencyRange[0], frequencyRange[0], frequencyRange[1], 0, width);
  const end = map(selectedFrequencyRange[1], frequencyRange[0], frequencyRange[1], 0, width);
  noStroke();
  fill(color(0, 255, 0, 25));
  rect(start, 0, end-start, -height);

  // draw each bar
  noStroke();
  _.zip(frequencies, amplitudes).forEach(([frequency, amplitude], index) => {
    const barX = index*barWidth;
    const barHeight = map(amplitude, 0, 255, 0, height);
    fill(frequency >= selectedFrequencyRange[0] && frequency <= selectedFrequencyRange[1] ? color(0, 255, 0) : color(128, 128, 128));
    rect(barX, 0, barWidth, -barHeight);
  });

  pop();
}

function drawTimeSeriesVisualizer(x, y, width, height, samples) {
  push();

  // draw a border
  stroke(0);
  noFill();
  rect(x, y, width, height);

  translate(x, y + height);

  // draw activation threshold
  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  const lineY = map(activationThreshold, 0, 255, 0, -height);
  line(0, lineY, width, lineY);

  // draw a scatter plot
  noFill();
  strokeWeight(4);
  const currentT = millis();
  samples.forEach(({t, energy}) => {
    stroke(energy >= activationThreshold ? color(255, 0, 0) : color(0, 255, 0));
    const pointX = map(t, currentT-energyHistoryLengthMillis, currentT, 0, width);
    const pointY = map(energy, 0, 255, 0, -height);
    point(pointX, pointY);
  });

  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
