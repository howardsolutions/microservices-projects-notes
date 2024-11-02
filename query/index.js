const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on port 4002');

  try {
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
      console.log('Processing event: ' + event.type);
    }
  } catch (err) {
    console.error(err);
  }
});

function eventHandler(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { postId, content, id, status } = data;

    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { postId, content, id, status } = data;

    const comments = posts[postId].comments;

    const comment = comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
}
