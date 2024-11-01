const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;

  axios
    .post('http://localhost:4000/events', event)
    .catch((err) => console.error);

  axios
    .post('http://localhost:4001/events', event)
    .catch((err) => console.error);

  axios
    .post('http://localhost:4002/events', event)
    .catch((err) => console.error);

  axios
    .post('http://localhost:4003/events', event)
    .catch((err) => console.error);

  res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('listing on port 4005'));
