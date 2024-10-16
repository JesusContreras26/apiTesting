const express = require('express');
const mongodb = require('./db/connect');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Route hit: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log('The database connection failed');
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
