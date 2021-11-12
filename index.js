require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const { db } = require('./models/db');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

const { pageTemplate } = require('./utils/pageTemplate');
const { updateLoginStatus } = require('./middleware/authMiddleware');

const app = express();

const csvParser = require('csv-parser');
// parse csv to array of objects, csv needs to have no spaces
let csvOutput = [];
fs.createReadStream('./upload-csv/rfx.csv')
  .pipe(csvParser())
  .on('data', (data) => csvOutput.push(data))
  .on('end', () => {
    console.log('csv parse complete');
  });

app.get('/csv-data', (req, res) => {
  res.json(csvOutput);
});

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// db connection
db.authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log('DB Connection error - ', err);
  });

// routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pagesRoutes = require('./routes/pagesRoutes');

app.get('*', updateLoginStatus);
app.get('*', catchAsync(pageTemplate));

// use routes
app.use(pagesRoutes);
app.use(authRoutes);
app.use(userRoutes);

// generic 404 for unused routes
app.use((req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (!err.message) err.message = 'Something went wrong...';

  res.status(statusCode).render('error', { err });
});
