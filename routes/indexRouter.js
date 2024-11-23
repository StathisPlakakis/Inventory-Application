const {Router} = require('express');
const indexRouter = Router();
const {indexControllerGet} = require('../controllers/indexController')

indexRouter.get('/', indexControllerGet);

module.exports = indexRouter;