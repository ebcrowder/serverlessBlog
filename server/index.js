// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const BLOG_TABLE = process.env.BLOG_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Get post endpoint
app.get('/posts/:postId', function(req, res) {
  const params = {
    TableName: BLOG_TABLE,
    Key: {
      postId: req.params.postId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get post' });
    }
    if (result.Item) {
      const { postId, title, categories, content } = result.Item;
      res.json({ postId, title, categories, content });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  });
});

// Get ALL posts endpoint

app.get('/posts', function(req, res) {
  const params = {
    TableName: BLOG_TABLE
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get posts' });
    }
    if (result.Items) {
      res.json(result.Items);
    } else {
      res.status(404).json({ error: 'Posts not found' });
    }
  });
});

// Create post endpoint
app.post('/posts', function(req, res) {
  const { postId, title, categories, content } = req.body;
  if (typeof title !== 'string') {
    res.status(400).json({ error: '"title" must be a string' });
  } else if (typeof categories !== 'string') {
    res.status(400).json({ error: '"categories" must be a string' });
  } else if (typeof content !== 'string') {
    res.status(400).json({ error: '"content" must be a string' });
  }

  const params = {
    TableName: BLOG_TABLE,
    Item: {
      postId: uuid.v1(),
      title: title,
      categories: categories,
      content: content
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create post' });
    }
    res.json({ postId, title, categories, content });
  });
});

// Delete post endpoint
app.delete('/posts/:postId', function(req, res) {
  const params = {
    TableName: BLOG_TABLE,
    Key: {
      postId: req.params.postId
    }
  };

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete post' });
    } else {
      res.status(200).json({ message: 'Post deleted' });
    }
  });
});

module.exports.handler = serverless(app);
