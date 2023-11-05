const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const botdialogsRouter = require('./botdialogsRouter');
const foundationChaptersRouter = require('./foundationChaptersRouter');

router.use('/devices', deviceRouter);
router.use('/users', userRouter);
router.use('/botdialogs', botdialogsRouter);
router.use('/foundationChapters', foundationChaptersRouter);

module.exports = router;
