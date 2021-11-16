const express = require('express');
const app = require('./app');
const path = require('path');

const dbo = require('./models/connection');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
  });
}

app.listen(PORT, () => {
  dbo.connectToServer((err) => {
    if (err) return console.log(err);
  });
  console.log(`Server is running on port ${PORT}`);
});
