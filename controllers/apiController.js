const fs = require('fs');
const csvParser = require('csv-parser');
const ClockOscillator = require('../models/clockOscillator');

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

module.exports.getClockOscillators = async (req, res) => {
  const data = await ClockOscillator.findAll();

  const tableData = [];

  data.forEach((item) => {
    let d = {
      ...item.dataValues,
      features: item.dataValues.features.split(';'),
    };

    tableData.push(d);
  });

  res.json(tableData);
};
