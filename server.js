require('dotenv').config()


// index.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json())
const posts = [
  {
    username: 'Dheeraj',
    title: 'Post 1'
  },
  {
    username: 'Niharika',
    title: 'Post 2'
  }
]

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
})


// Authenticate token middelware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'process.env.ACCESS_TOKEN_SECRET', (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






// require('dotenv').config()

// const express = require('express')
// const app = express()
// const jwt = require('jsonwebtoken')

// app.use(express.json())

// const posts = [
//   {
//     username: 'Kyle',
//     title: 'Post 1'
//   },
//   {
//     username: 'Jim',
//     title: 'Post 2'
//   }
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
// })

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err)
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

// app.listen(3000)