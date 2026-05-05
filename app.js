const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<html><body><h1>app page - html</h1></body></html>');
});

app.get('/hello', (req, res) => {
  res.send('<html><body><h1>hello page - html</h1></body></html>');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
