const fs = require('fs');
const csvParser = require('csv-parser');

let quartzCrystals = [];
let clockOscillators = [];
let VCXO = [];
let TCXO = [];
let OCXO = [];

function parseCSV(filepath, dataArray) {
  fs.createReadStream(filepath)
    .pipe(csvParser())
    .on('data', (data) => dataArray.push(data))
    .on('end', () => {
      console.log(filepath, '--- csv parse complete');
    });
}

parseCSV('./upload_csv/clock-oscillators.csv', clockOscillators);
parseCSV('./upload_csv/clock-oscillators.csv', quartzCrystals);

module.exports.getQuartzCrystals = async (req, res) => {
  const data = [];

  quartzCrystals.forEach((item, i) => {
    let t = {
      ...item,
      features: item.features.split(';'),
    };

    data.push(t);
  });

  res.json(data);
};

module.exports.getClockOscillators = async (req, res) => {
  const data = [];

  clockOscillators.forEach((item) => {
    let t = {
      ...item,
      features: item.features.split(';'),
    };

    data.push(t);
  });

  res.json(data);
};
