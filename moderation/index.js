const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios
      .post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => console.error);
  }
  // need this, if not the req-res cycle will never finished
  res.send({});
});

app.listen(4003, () => {
  console.log('Lisenting on port 4003');
});
