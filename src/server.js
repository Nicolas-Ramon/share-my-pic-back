const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 4000);

const inscriptions = require('./routes/inscriptions');

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/inscription', inscriptions);

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
