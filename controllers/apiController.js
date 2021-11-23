const fs = require('fs');
const csvParser = require('csv-parser');

let csvOutput = [];
fs.createReadStream('./upload-csv/rfx.csv')
  .pipe(csvParser())
  .on('data', (data) => csvOutput.push(data))
  .on('end', () => {
    console.log('csv parse complete');
  });

module.exports.getQuartzCrystals = async (req, res) => {
  const data = [];

  csvOutput.forEach((item, i) => {
    if (i < 50) {
      data.push(item);
    }
  });

  res.json(data);
};
