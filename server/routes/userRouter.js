const Router = require('express');
const router = new Router();
const connectDB = require('../config/database.js');
const authMiddleware = require('../middleWare/authMiddleware.js');

const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', (req, res) => {
  const sqlSelect = `select * from users`;
  connectDB.query(sqlSelect, (err, result, fields) => {
  if (err) {
    return console.log(err);
  }
  return res.json(result);
})
})

router.get('/auth', authMiddleware, (req, res, next) => {
  const { id } = req.query
  if (!id) {
    return next(ApiError.badRequest('No ID'))
  }
  res.json(id);
})

router.post('/registration', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
  const role = 'user';
  const id = req.body.id;
  const list = JSON.parse(req.body.list);

  const token = jwt.sign(
    { id, email, role }, 
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
    );

  if (!email || !password) {
    return next(ApiError.badRequest('Not valid email or password'));
  }

  const isExcist = list.filter((item) => item.email === email).length > 0;
  
  if (isExcist) {
    return next(ApiError.badRequest('Email already excist'));
  }

  const sqlInser =
    "INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)";
  connectDB.query(sqlInser, [id, email, hashedPassword, role], (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json({ token });
  });
})

router.post('/login', async (req, res, next) => {
  const { email, password, user } = req.body;
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.badRequest('Wrong password'));
  }

  const token = jwt.sign(
    { email, password, role: user.role }, 
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
    );
    return res.json({ token });
})

module.exports = router;
