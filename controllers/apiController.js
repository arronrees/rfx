const fs = require('fs');
const csvParser = require('csv-parser');
const ClockOscillator = require('../models/clockOscillator');
const { v4 } = require('uuid');

let quartzCrystals = [];
let clockOscillators = [];
let VCXO = [];
let TCXO = [];
let OCXO = [];

function parseCSV(filepath, dataArray, callback) {
  fs.createReadStream(filepath)
    .pipe(csvParser())
    .on('data', (data) => dataArray.push(data))
    .on('end', () => {
      console.log(filepath, '--- csv parse complete');
      callback();
    });
}

// run function once then every 12 hours
parseCSV(
  './upload_csv/clock-oscillators.csv',
  clockOscillators,
  saveClockOscillators
);

// setInterval(() => {
//   parseCSV('./upload_csv/clock-oscillators.csv', clockOscillators);
//   parseCSV('./upload_csv/clock-oscillators.csv', quartzCrystals);
// }, 1000 * 60 * 60 * 12);

// after csv parsed, save products to db
async function saveClockOscillators() {
  await ClockOscillator.destroy({ truncate: true });
  console.log('DB ClockOscillators cleared');

  await ClockOscillator.bulkCreate(clockOscillators);
}

module.exports.getQuartzCrystals = async (req, res) => {
  const clocks = await ClockOscillator.findAll({});

  res.json(clocks);
};

// clock oscillators
module.exports.getClockOscillators = async (req, res) => {
  const data = await ClockOscillator.findAll();

  const tableData = [];
  const feats = [];
  const volts = [];

  clockOscillators.forEach((item) => {
    let d = {
      ...item,
      features: item.features.split(';'),
      // voltage: item.voltage.split(';'),
      id: v4(),
      temp: {
        temp_range: `${item.temp_lower} - ${item.temp_upper}`,
        lower: item.temp_lower,
        upper: item.temp_upper,
      },
      frequency: {
        freq_range: `${item.freq_lower} - ${item.freq_upper}`,
        upper: item.freq_upper,
        lower: item.freq_lower,
      },
    };

    item.features.split(';').forEach((feat) => feats.push(feat));
    item.voltage.split(';').forEach((volt) => volts.push(volt));

    tableData.push(d);
  });

  res.json({ tableData, feats, volts });
};
