const Router = require('express');
const router = new Router();
const connectDB = require('../config/database.js');

// Get one by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sqlSelect = `select * from botdialogs where id = ` + id;
  connectDB.query(sqlSelect, id, (err, result) => {
    if (err) {
      return console.log(err);
    }
    return res.json(result);
  });
})

module.exports = router;
