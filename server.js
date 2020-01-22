const express = require('express')
const cookieParser = require("cookie-parser");
const ngrok = require('ngrok');

const app = express()
app.use(cookieParser());

const port = 3000
const COOKIE_NAME = 'test-cookie';
app.get('/set-cookie', (req, res) => {
  const cookieValue = req.query.value;
  if (!cookieValue || cookieValue === '') throw new Error('Missing value query parameter');
  res.cookie(COOKIE_NAME, cookieValue);
  res.send(`cookie set ${COOKIE_NAME}=${cookieValue}`);
});

app.get('/get-cookie', (req, res) => {
  const value = req.cookies[COOKIE_NAME];
  res.json({ value });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, async () => {
  console.log(`Listening on https://localhost:${port}`);
  const url = await ngrok.connect({
    addr: port,
    // subdomain: 'electron-cross-origin-request-env'
  })
  console.log(`Listening on ${url}`);
});


process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
  process.exit(1);
});

// static file serving