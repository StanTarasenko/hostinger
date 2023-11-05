const Router = require('express');
const router = new Router();
const connectDB = require('../config/database.js');

// Get all chapters
router.get('/', (req, res) => {
  const sqlSelect = `select * from foundationChapters`;
  connectDB.query(sqlSelect, (err, result, fields) => {
  if (err) {
    return console.log(err);
  }
  return res.json(result);
})
})

module.exports = router;
