const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

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

  res.send({});
});

app.listen(4002, () => console.log('Listening on port 4002'));
