const Router = require('express');
const router = new Router();
const connectDB = require('../config/database.js');
const checkRole = require('../middleWare/checkRoleMiddleware.js');

// Get all
router.get('/', (req, res) => {
  const sqlSelect = `select * from devices ORDER BY createdAt DESC`;
  connectDB.query(sqlSelect, (err, result, fields) => {
  if (err) {
    return console.log(err);
  }
  return res.json(result);
})
})

// Get one by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = `select * from devices where id = ` + id;
  connectDB.query(sqlSelect, id, (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
})

// Create
router.post('/insert', checkRole('admin'), (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const id = req.body.id;
  const img = req.body.img;
  const createdAt = new Date();

  const sqlInser =
    "INSERT INTO devices (id, name, description, img, createdAt) VALUES (?, ?, ?, ?, ?)";
  connectDB.query(sqlInser, [id, name, description, img, createdAt], (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
})

// Update
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

  const sqlUpdate = "UPDATE devices SET description = ? WHERE id = ?";

  connectDB.query(sqlUpdate, [description, id], (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
})

// Remove
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM devices WHERE id = ?";
  connectDB.query(sqlDelete, id, (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
})

module.exports = router;
