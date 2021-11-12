const app = require('./app');

const dbo = require('./models/connection');

const PORT = 5000;

app.listen(PORT, () => {
  dbo.connectToServer((err) => {
    if (err) return console.log(err);
  });
  console.log(`Server is running on port ${PORT}`);
});
