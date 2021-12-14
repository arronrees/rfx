const fs = require('fs');
const csvParser = require('csv-parser');
const { v4 } = require('uuid');
const ClockOscillator = require('../models/clockOscillator');
const CrystalModel = require('../models/crystalModel');
const CrystalModelFeature = require('../models/crystalModelFeatures');
const CrystalModelHeight = require('../models/crystalModelHeight');
const CrystalPart = require('../models/crystalPart');

let quartzCrystalModels = [];
let quartzCrystalParts = [];
let clockOscillators = [];

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

parseCSV(
  './upload_csv/quartz-crystals.csv',
  quartzCrystalModels,
  saveCrystalModels
);

parseCSV(
  './upload_csv/crystals-parts.csv',
  quartzCrystalParts,
  saveCrystalParts
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
async function saveCrystalModels() {
  await CrystalModel.destroy({ truncate: true });
  await CrystalModelFeature.destroy({ truncate: true });
  await CrystalModelHeight.destroy({ truncate: true });
  console.log('DB CrystalModels cleared');

  let features = [];
  let heights = [];

  let qcs = [];

  quartzCrystalModels.forEach((model, i) => {
    let f = model.features.split(';');

    f.forEach((feat) => {
      features.push(feat);
    });

    let h = model.height.split(';');

    h.forEach((hi) => {
      heights.push(hi);
    });

    let temp_range = `${model.temp_lower} to ${model.temp_upper}`;
    let lower_range = `${model.lower_lower_turn_point} to ${model.lower_upper_turn_point}`;
    let upper_range = `${model.upper_lower_turn_point} to ${model.upper_upper_turn_point}`;

    let qc = { ...model, temp_range, lower_range, upper_range };

    qcs.push(qc);
  });

  let fs = [...new Set(features)];

  let feats = [];

  fs.forEach((f) => {
    let s = {
      feature: f,
    };

    feats.push(s);
  });

  let hs = [...new Set(heights)];

  let hts = [];

  hs.forEach((h) => {
    let s = {
      height: h,
    };

    hts.push(s);
  });

  await CrystalModel.bulkCreate(qcs);
  await CrystalModelFeature.bulkCreate(feats);
  await CrystalModelHeight.bulkCreate(hts);
}
async function saveCrystalParts() {
  await CrystalPart.destroy({ truncate: true });
  console.log('DB CrystalModelParts cleared');

  let qcps = [];

  quartzCrystalParts.forEach((part, i) => {
    let temp_range = `${part.temp_lower} to ${part.temp_upper}`;
    let lower_range = `${part.lower_lower_turn_point} to ${part.lower_upper_turn_point}`;
    let upper_range = `${part.upper_lower_turn_point} to ${part.upper_upper_turn_point}`;

    let qcp = { ...part, temp_range, lower_range, upper_range };

    qcps.push(qcp);
  });

  await CrystalPart.bulkCreate(qcps);
}

// quartz crystals
module.exports.getQuartzCrystals = async (req, res) => {
  const crystals = await CrystalModel.findAll({});
  const features = await CrystalModelFeature.findAll({});
  const heights = await CrystalModelHeight.findAll({});
  const crystalParts = await CrystalPart.findAll({});

  let data = [];

  crystals.forEach((item) => {
    let c = {
      ...item.dataValues,
      features: item.dataValues.features.split(';'),
      height: item.dataValues.height.split(';'),
    };

    data.push(c);
  });

  let tableData = [];

  data.forEach((item) => {
    let m = {
      ...item,
      parts: [],
    };

    crystalParts.forEach((part) => {
      if (part.model === item.model) {
        m.parts.push(part);
      }
    });

    tableData.push(m);
  });

  res.json({ tableData, features, heights });
};

// clock oscillators
module.exports.getClockOscillators = async (req, res) => {
  // const data = await ClockOscillator.findAll();

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
